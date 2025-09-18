(function () {
  const config = {
    test_id: "ID30_variation",
    test_name: "ID30_Winkelwagen_prijzen_overzicht_duidelijker",
    selector: "main .cart",
  };

  console.log("== Test is getting bucketed ===", config.test_name);

  function waitForElement(predicate, callback, timer = 5000, frequency = 25) {
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
    () =>
      !!document.querySelector("main .cart") &&
      !!document.querySelector(config.selector),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(`.${config.test_id}`)) return;
          document.querySelector(config.selector).classList.add(config.test_id);

          this.mainJS();
          this.mainCSS();
          this.handleClarityTracking();
        },
        mainCSS: function () {
          if (document.getElementById(config.test_id + "-style")) {
            return;
          }
          var styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          styles.setAttribute("id", config.test_id + "-style");
          document.head.appendChild(styles).textContent = `
            .uom-propety,
            .price--vat,
            .cart__product-price .price:has(.price--sm),
            .d-flex:not(.align-items-center) > .cart__product-price,
            .cart__summary-total .col-auto > div:nth-child(3) {
              display: none;
            }

            .cart__product .d-flex > .d-flex:has(.cart__product-price) {
              justify-content: space-between;
            }

            .d-flex:has(.align-items-center) > .cart__product-price {
              padding-right: 0;
            }

            @media screen and (max-width: 575px) {
              .cart__product > div.col-auto {
                margin-top: 0.25rem !important;
                margin-left: 0.5rem !important;
              }

              .text-success-dark:before {
                content: "";
                margin-right: 0;
              }
            }
          `;
        },
        mainJS: function () {
          console.log("== main js is running ===");

          function testLogic() {
            document.querySelectorAll(".cart__product h3 > a").forEach((e) => {
              e.innerHTML = e.innerText
                .toLowerCase()
                .replace(/(^\w)|((?<=-\s*)\w)/g, (m) => m.toUpperCase());
            });

            if (window.innerWidth <= 575) {
              document
                .querySelectorAll(
                  ".cart__products div.col > div.d-flex > div.align-items-center:has(.uom-propety)"
                )
                .forEach((element) => {
                  const existingPriceEl = element.querySelector(
                    ".cart__product-price"
                  );

                  if (existingPriceEl) return;

                  const priceEl = element
                    .closest(".cart__product")
                    ?.querySelector(".cart__product-price");

                  if (priceEl) {
                    element.insertAdjacentElement("beforeend", priceEl);
                  }
                });
            }
          }

          testLogic();

          const targetNode = document.querySelector(".cart__products");
          new MutationObserver(() => {
            console.log("== change applied ==");
            testLogic();
          }).observe(targetNode, { childList: true });
        },

        handleClarityTracking: function () {
          // Clarity tracking
          function initMsClarityTracking() {
            waitForElement(
              () => !!window["clarity"],
              () => {
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

      if (document.body.classList.contains("ID30_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID30_variation_interval_flag");
      }, 25);
    }
  );
})();

// https://www.wovar.nl/cart?_conv_eforce=1004167064.1004394659&utm_campaign=id30
