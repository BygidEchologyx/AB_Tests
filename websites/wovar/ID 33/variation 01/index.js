(function () {
  const config = {
    test_id: "ID33_variation_01",
    test_name: "ID33_Grotere_afbeeldingen_PLP_cards",
    selector: ".productblock__image img",
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
      !!document.querySelector(config.selector) &&
      !!document.querySelector(".first.category") &&
      !document.querySelector(".product-details-wrapper__payment-details") &&
      !document.querySelector(".id33-test-img"),
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
            .id33-test-img {
              width: 100% !important;
            }
          `;
        },

        mainJS: function () {
          console.log("== main js is running ===");

          function testLogic() {
            if (document.querySelector(".id33-test-img")) {
              return;
            }
            let targetLink = document
              .querySelector(".first.category")
              ?.textContent.toLowerCase()
              .trim();
            let targetImages = document.querySelectorAll(config.selector);

            if (targetLink === "bevestigingsmaterialen") {
              console.log("== adding class ==");
              targetImages?.forEach((element) => {
                element.classList.add("id33-test-img");
              });

              // goal set
              document.querySelectorAll(".productblock").forEach((element) => {
                element.addEventListener("click", () => {
                  console.log("== id33 plp to pdp conv==");
                  // window._conv_q = window._conv_q || [];
                  // _conv_q.push(["triggerConversion", "1004101279"]);
                });
              });
            } else {
              console.log("== removing class ==");
              targetImages?.forEach((element) => {
                element.classList.remove("id33-test-img");
              });
            }
          }

          testLogic();

          let lastUrl = location.href;
          new MutationObserver(() => {
            let currentUrl = location.href;
            if (currentUrl !== lastUrl) {
              lastUrl = currentUrl;
              waitForElement(
                () =>
                  !!document.querySelector(config.selector) &&
                  !!document.querySelector(".first.category") &&
                  !document.querySelector(
                    ".product-details-wrapper__payment-details"
                  ) &&
                  !document.querySelector(".id33-test-img"),
                () => {
                  testLogic();
                }
              );
            }
          }).observe(document, { subtree: true, childList: true });
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

      if (document.body.classList.contains("ID33_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID33_variation_interval_flag");
      }, 25);
    }
  );
})();
