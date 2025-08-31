(function () {
  const config = {
    test_id: "ID9_variation",
    test_name: "ID9_Wovar_ATC_Checker",
    selector: ".productblock .productblock__addtocart",
  };

  console.log("=== Experiment bucketed ===", config.test_name, config.test_id);

  function waitForElement(predicate, callback, timer = 10000, frequency = 25) {
    try {
      if (timer <= 0) {
        throw new Error(
          `Timeout reached while waiting for condition: ${predicate.toString()}`
        );
      } else if (predicate && predicate()) {
        callback();
      } else {
        setTimeout(() => {
          waitForElement(predicate, callback, timer - frequency, frequency);
        }, frequency);
      }
    } catch (error) {
      return;
    }
  }

  waitForElement(
    () => !!document.querySelector(config.selector),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(`.${config.test_id}`)) {
            console.log(
              "=== Variation is already loaded ===",
              config.test_name
            );
            return;
          }
          document.querySelector(config.selector).classList.add(config.test_id);

          this.mainJS();
          this.mainCSS();
          this.handleTracking();
        },
        mainCSS: function () {
          if (document.getElementById(config.test_id + "-style")) {
            return;
          }
          var styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          styles.setAttribute("id", config.test_id + "-style");
          document.head.appendChild(styles).textContent = `
            .cart-value-container {
              width: fit-content;
              height: fit-content;
              min-height: 40px;
              display: flex;
              align-items: center;
              justify-items: center;
              margin-right: 10px;
            }
            .cart-value-add {
              cursor: pointer;
              background: #F8F7F5;
              width: 40px;
              height: 40px;
              font-size: 20px;
              border: 1px solid #A7A7A7;
              border-radius: 0px 4px 4px 0px;
              border-left:none;
            }
            .cart-value-sub {
              cursor: pointer;
              background: #F8F7F5;
              width: 40px;
              height: 40px;
              font-size: 20px;
              border: 1px solid #A7A7A7;
              border-radius: 4px 0px 0px 4px;
              border-right:none;
            }
            .cart-value{
              width: 40px;
              height: 40px;
              font-size: 20px;
              text-align:center;
              border: 1px solid #a7a7a7;
              padding: 0 4px;
            }

            /* Chrome, Safari, Edge, Opera */
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* Firefox */
            input[type=number] {
              -moz-appearance: textfield;
            }
            `;
        },
        // remove it if not necessary
        delegate: (function () {
          if (!Element.prototype.matches) {
            Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector;
          }

          return function (el, evt, sel, handler) {
            el.addEventListener(evt, function (event) {
              var t = event.target;
              while (t && t !== this) {
                if (t.matches(sel)) {
                  handler.call(t, event);
                }
                t = t.parentNode;
              }
            });
          };
        })(),

        mainJS: function () {
          console.log("=== main js is running ===", config.test_name);

          async function addToCart(payload) {
            fetch("https://www.wovar.nl/cart?_data=routes%2Fcart", {
              headers: {
                accept: "*/*",
                "content-type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
              referrer: "https://www.wovar.nl/",
              body: `_disabledReload=YES&_action=ADD&lineItems=${encodeURIComponent(JSON.stringify(payload))}`,
              method: "POST",
              mode: "cors",
              credentials: "include",
            });
          }

          document
            .querySelectorAll(".productblock__addtocart")
            .forEach((element, idx) => {
              console.log("== inside inner test ==");
              element
                .querySelector("button span.ml-2")
                .setAttribute("style", "display: none");

              const cartValueManipulator = `
                <div class='col-auto pt-2 cart-value-container'>
                  <button class='cart-value-sub' type="button">-</button>
                  <input name="cart-item-count" type='number' value=1 class='cart-value' />
                  <button class='cart-value-add' type="button">+</button>
                </div>
              `;

              element.insertAdjacentHTML("beforebegin", cartValueManipulator);

              // Get the container that was just inserted
              const container = element.previousElementSibling;
              const input = container.querySelector(".cart-value");
              const subButton = container.querySelector(".cart-value-sub");
              const addButton = container.querySelector(".cart-value-add");
              const addToCartButton = element.querySelector("button");

              // Add event listener to the input
              input.addEventListener("input", (event) => {
                event.stopPropagation();
                console.log(
                  "== input value changed ==",
                  idx,
                  event.target.value
                );
              });

              // Add event listener to subtract button
              subButton.addEventListener("click", (event) => {
                event.stopPropagation();
                event.preventDefault();
                input.value = Math.max(0, parseInt(input.value || 0, 10) - 1);
                console.log("== subtract button ==", idx, input.value);
              });

              // Add event listener to add button
              addButton.addEventListener("click", (event) => {
                event.stopPropagation();
                event.preventDefault();
                input.value = parseInt(input.value || 0, 10) + 1;
                console.log("== addition button ==", idx, input.value);
              });

              // Add to cart event listener
              addToCartButton.addEventListener("click", async (event) => {
                event.preventDefault();
                event.stopPropagation();

                // Get current quantity from input
                const currentQuantity = parseInt(input.value || 1, 10);

                try {
                  // Fixed: use event.target instead of undefined 'button'
                  const productLink = event.target.closest("a").href;

                  const res = await fetch(productLink);
                  const html = await res.text();

                  const doc = new DOMParser().parseFromString(
                    html,
                    "text/html"
                  );
                  const sku = doc.querySelector(
                    'meta[itemprop="sku"], meta[name="sku"]'
                  );

                  if (sku && currentQuantity > 0) {
                    // Send request for cart
                    const payload = [
                      {
                        sku: sku.getAttribute("content"),
                        quantity: currentQuantity,
                      },
                    ];
                    await addToCart(payload);
                    console.log("== Added to cart ==", payload);
                  }
                } catch (error) {
                  console.error("Error adding to cart:", error);
                }
              });
            });
        },

        handleTracking: function () {
          // Clarity tracking
          function initMsClarityTracking() {
            waitForElement(
              () => !!window["clarity"],
              () => {
                console.log(
                  `=== Clarity is loaded for ${config.test_name} ===`
                );
                window.clarity("set", "Exp_Name", config.test_name);
                window.clarity("set", "Var_Name", config.test_id);
              }
            );
          }

          // Start tracking
          (function initiateTracking() {
            initMsClarityTracking();
          })();
        },
      };

      echoVariation.init();

      if (document.body.classList.contains("ID9_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID9_variation_interval_flag");
      }, 25);
    }
  );
})();
