(function () {
  const config = {
    test_id: "ID29_variation",
    test_name: "ID29-Direct-afrekenen-winkelwagen-pop-up",
    selector: ".cart-popup-panel",
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
    () => !!document.querySelector(config.selector),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(".direct-checkout-link")) return;

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
            .cart-actions .cart-back-btn {
              display: none;
            }
            .cart-checkout-btn {
              width: 100%;
              background-color: #F4C430;
              font-family: Arial;
              font-size: 15px;
              font-weight: 700;
              color: #353535;
            }
            .cart-checkout-btn:hover {
              background-color: #E3B41F !important;
            }
            .cart-actions {
              display: flex;
              flex-direction: column;
              gap: 19px;
              align-items: center;
              padding: 16px 10px;
              border-top: 1px solid #eee;
            }
            .direct-checkout-link {
              cursor: pointer;
              font-family: Lato;
              font-weight: 400;
              font-size: 15px;
              color: #121212;
              border-bottom: 1px solid #121212;
            }
            .direct-checkout-link-parent {
              padding: 5px 8px;
              border-radius: 5px;
            }
            .direct-checkout-link-parent:hover {
              background-color: #FDFDFD;
            }
          `;
        },
        mainJS: function () {
          console.log("== main js is running ===");
          const cartPopupPanel = document.querySelector(".cart-popup-panel");

          async function getShippingId() {
            try {
              const response = await fetch(
                "https://www.wovar.nl/cart?_data=routes%2Fcart",
                {
                  credentials: "include",
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              // Add validation to ensure the shipping option exists
              if (!data.shippingOptions || !data.shippingOptions[1]) {
                throw new Error(
                  "Shipping options not available or index out of range"
                );
              }

              console.log("Shipping ID retrieved:", data.shippingOptions[1].id);
              return {
                name: data.shippingOptions[1].name,
                id: data.shippingOptions[1].id,
              };
            } catch (error) {
              console.error("Error fetching shipping ID:", error.message);
              throw error; // Re-throw to allow caller to handle
            }
          }

          // function detectAtcFetch() {
          //   if (typeof window.fetchListenerAttached === "undefined") {
          //     window.fetch = new Proxy(window.fetch, {
          //       apply(fetch, that, args) {
          //         const result = fetch.apply(that, args);

          //         // Only process cart-related requests
          //         if (
          //           args[0] &&
          //           typeof args[0] === "string" &&
          //           args[0].includes(".nl/cart?_data")
          //         ) {
          //           result
          //             .then((response) => {
          //               if (response.status === 200) {
          //                 return response
          //                   .clone()
          //                   .json()
          //                   .then((data) => {
          //                     if (
          //                       (data && data.action === "ADD") ||
          //                       data.action === "UPDATE" ||
          //                       data.action === "DELETE"
          //                     ) {
          //                       setShippingId();
          //                     }
          //                   })
          //                   .catch((err) => {
          //                     console.log("JSON parsing error:", err.message);
          //                   });
          //               }
          //             })
          //             .catch((err) => {
          //               console.log("Network error:", err.message);
          //             });
          //         }
          //         return result;
          //       },
          //     });

          //     // Set the flag to indicate that the listener has been attached - to stop attaching it again as it's an SPA site
          //     window.fetchListenerAttached = true;
          //   }
          // }

          async function checkoutNetworkCall() {
            try {
              console.log("== net call ==");
              let shippingId = await getShippingId();

              const encodedShippingName = encodeURIComponent(shippingId.name);

              console.log("== shipping name got: ==", shippingId.name);
              console.log("== shipping id got: ==", shippingId.id);
              fetch("https://www.wovar.nl/checkout?_data=routes%2Fcheckout", {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: `_action=SET_DELIVERY_OPTION&shippingOptionId=${shippingId.id}&shippingOptionName=${encodedShippingName}&shippingOptionCountryCode=NL`,
                credentials: "include",
              })
                .then(() => {
                  console.log("== request successfull");
                  window.location.href = "/checkout";
                })
                .catch((err) => {
                  console.error("Checkout fetch failed:", err);
                });
            } catch (error) {
              console.log(error);
            }
          }

          function cartDesignChanges() {
            const cartButtonsContainer =
              document.querySelector(".cart-actions");

            const cartCheckoutButton =
              document.querySelector(".cart-checkout-btn");
            if (!document.querySelector(".right-arrow-svg")) {
              const rightArrow = `
              <span class="right-arrow-svg">
                  <svg width="18" height="18" viewBox="5 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
              </span>
              `;

              cartCheckoutButton.insertAdjacentHTML("beforeend", rightArrow);
            }

            if (!document.querySelector(".direct-checkout-link")) {
              console.log("== element adding ==");
              const checkoutBtn = `
              <span class="direct-checkout-link-parent">
                <button class="d-flex justify-content-between direct-checkout-link">
                  Direct afrekenen
                </button>
              </span>
              `;

              cartButtonsContainer?.insertAdjacentHTML(
                "beforeend",
                checkoutBtn
              );
              document
                .querySelector(".direct-checkout-link")
                ?.addEventListener("click", checkoutNetworkCall);
            }
          }

          // detectAtcFetch();
          cartDesignChanges();

          new MutationObserver(() => {
            console.log("== mutation triggered ==");
            if (!cartPopupPanel.classList.contains("empty")) {
              console.log("== mutation changes ==");
              cartDesignChanges();
            }
          }).observe(cartPopupPanel, {
            childList: true,
            subtree: true,
            attributes: true,
          });
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

      if (document.body.classList.contains("ID29_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID29_variation_interval_flag");
      }, 25);
    }
  );
})();
