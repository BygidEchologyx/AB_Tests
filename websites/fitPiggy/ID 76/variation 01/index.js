(function () {
  const config = {
    test_id: "ID76_variation",
    test_name: "ID76_Pick_&_Mix_afbeelding_tekst_weg",
    selector: ".product-custom-liquid",
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
    () =>
      !!document.querySelector(config.selector) &&
      !!document.querySelector(".bundly__add_to_cart_button"),
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
            .product__badges,
            .product-gallery-item,
            .product-item__badges,
            .product-custom-liquid,
            .product__description.rte {
              display: none !important;
            }

            .breadcrumb-main {
              top: -1.5rem !important;
            }

            .main-product {
              margin-top: 25px;
            }

            .product__description.rte {

            }
            .shopify-block:has(#etrusted-trusted_stars_service) {
              margin-bottom: 0 !important;
            }

            .container .text-size--xlarge {
              margin-bottom: 0 !important;
            }
            .bundly__dynamic .bundly__details_content {
              gap: 0 !important;
              padding-bottom: 0 !important;
            }

            .bundly__details_content .bundly__buy_buttons {
              position: sticky;
              bottom: 0;
              padding: 10px 0 !important;
              background: #f2f2f2;
              z-index: 9;
            }

            .bundly__dynamic .bundly__details {
              overflow-y: hidden !important;
            }

           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          if (window.scrollY >= 200) {
            document
              .querySelector("#bundly__details")
              .setAttribute("style", "display: block");
          } else {
            document
              .querySelector("#bundly__details")
              .setAttribute("style", "display: none");
          }

          document.addEventListener("scroll", () => {
            if (window.scrollY >= 200) {
              document
                .querySelector("#bundly__details")
                .setAttribute("style", "display: block");
            } else {
              document
                .querySelector("#bundly__details")
                .setAttribute("style", "display: none");
            }
          });

          document.addEventListener("click", (event) => {
            if (event.target.closest(".bundly__add_to_cart_button")) {
              console.log("== Goal fired ==");
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "100486311"]);
            }
          });
        },

        // mainJS: function () {
        //   console.log("=== Main JS running ===", config.test_name);

        //   const details = document.querySelector("#bundly__details");
        //   const slotImage = document.querySelector(".bundly__slot_image");

        //   function updateVisibility() {
        //     const hasProduct = slotImage && slotImage.hasChildNodes();

        //     if (hasProduct) {
        //       details.style.display = "block";
        //     } else {
        //       if (window.scrollY >= 200) {
        //         details.style.display = "block";
        //       } else {
        //         details.style.display = "none";
        //       }
        //     }
        //   }

        //   document.addEventListener("scroll", updateVisibility);

        //   document.addEventListener("click", (event) => {
        //     if (event.target.closest(".bundly__add_to_cart_button")) {
        //       console.log("== Goal fired ==");
        //       window._conv_q = window._conv_q || [];
        //       _conv_q.push(["triggerConversion", "100486311"]);
        //     }
        //     updateVisibility();
        //   });

        //   updateVisibility();
        // },

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
    }
  );
})();

// https://fitpiggy.nl/collections/regular-boxen/products/pick-mix-regulars-medium?_conv_eforce=1004167008.1004394536&utm_campaign=qa76

// (function () {
//   const config = {
//     test_id: "ID76_variation",
//     test_name: "ID76_Pick_&_Mix_afbeelding_tekst_weg",
//     selector: ".product-custom-liquid",
//   };

//   function waitForElement(predicate, callback, timer = 10000, frequency = 25) {
//     try {
//       if (timer <= 0) {
//         throw new Error(
//           `Timeout reached while waiting for condition: ${predicate.toString()}`
//         );
//       } else if (predicate && predicate()) {
//         callback();
//       } else {
//         setTimeout(() => {
//           waitForElement(predicate, callback, timer - frequency, frequency);
//         }, frequency);
//       }
//     } catch (error) {
//       return;
//     }
//   }

//   waitForElement(
//     () =>
//       !!document.querySelector(config.selector) &&
//       !!document.querySelector(".bundly__add_to_cart_button"),
//     () => {
//       let echoVariation = {
//         init: function () {
//           if (document.querySelector(`.${config.test_id}`)) {
//             return;
//           }

//           document.querySelector(config.selector).classList.add(config.test_id);

//           this.mainJS();
//           this.mainCSS();
//           this.handleTracking();
//         },
//         mainCSS: function () {
//           if (document.getElementById(config.test_id + "-style")) {
//             return;
//           }
//           var styles = document.createElement("style");
//           styles.setAttribute("type", "text/css");
//           styles.setAttribute("id", config.test_id + "-style");
//           document.head.appendChild(styles).textContent = `
//             .product__badges,
//             .product-gallery-item,
//             .product-item__badges,
//             .product-custom-liquid,
//             .product__description.rte {
//               display: none !important;
//             }

//             .breadcrumb-main {
//               top: -1.5rem !important;
//             }

//             .main-product {
//               margin-top: 25px;
//             }

//             .product__description.rte {

//             }
//             .shopify-block:has(#etrusted-trusted_stars_service) {
//               margin-bottom: 0 !important;
//             }

//             .container .text-size--xlarge {
//               margin-bottom: 0 !important;
//             }

//            `;
//         },

//         mainJS: function () {
//           if (window.scrollY >= 200) {
//             document
//               .querySelector("#bundly__details")
//               .setAttribute("style", "display: block");
//           } else {
//             document
//               .querySelector("#bundly__details")
//               .setAttribute("style", "display: none");
//           }

//           document.addEventListener("scroll", () => {
//             if (window.scrollY >= 200) {
//               document
//                 .querySelector("#bundly__details")
//                 .setAttribute("style", "display: block");
//             } else {
//               document
//                 .querySelector("#bundly__details")
//                 .setAttribute("style", "display: none");
//             }
//           });

//           document.addEventListener("click", (event) => {
//             if (event.target.closest(".bundly__add_to_cart_button")) {
//               window._conv_q = window._conv_q || [];
//               _conv_q.push(["triggerConversion", "100486311"]);
//             }
//           });
//         },

//         handleTracking: function () {
//           // Clarity tracking
//           function initMsClarityTracking() {
//             waitForElement(
//               () => !!window["clarity"],
//               () => {
//                 window.clarity("set", "Exp_Name", config.test_name);
//                 window.clarity("set", "Var_Name", config.test_id);
//               }
//             );
//           }

//           // Start tracking
//           (function initiateTracking() {
//             initMsClarityTracking();
//           })();
//         },
//       };

//       echoVariation.init();
//     }
//   );
// })();
