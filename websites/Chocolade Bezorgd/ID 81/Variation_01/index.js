(function () {
  const config = {
    test_id: "ID81_variation",
    test_name: "ID81_Verbeterde_waardepropositie",
    selector: ".cb-product-usp",
  };

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
            return;
          }

          document.querySelector(config.selector).classList.add(config.test_id);

          this.mainCSS();
          this.mainJS();
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
            .cb-product-usp {
              gap: 5px !important;
              font-size: 15px !important;
            }
            .cb-product-usp-icon {
              width: 18px !important;
              height: 18px !important;
            }
            
            @media screen and (max-width: 575px) {
              .cb-product-usp {
                gap: 3px !important;
                font-size: 14px !important;
              }
              .cb-product-usp-icon {
                width: 16px !important;
                height: 16px !important;
              }
            }
            @media screen and (max-width: 390px) {
              .cb-product-usp {
                gap: 1px !important;
                font-size: 13px !important;
              }
              .cb-product-usp-icon {
                width: 16px !important;
                height: 16px !important;
              }
            }
          `;
        },

        mainJS: function () {
          console.log("== Main JS running ==");
          waitForElement(
            () => !!document.querySelector(".summary #start-configurator"),
            () => {
              document
                .querySelectorAll(".summary #start-configurator")
                .forEach((element) => {
                  element.addEventListener("click", () => {
                    console.log("== firing conversion clicks ==");
                  });
                });
            }
          );

          waitForElement(
            () => !!document.querySelector(".cb-product-usp-text"),
            () => {
              document
                .querySelectorAll(".cb-product-usp-text > a")
                .forEach((element) => {
                  if (element.textContent.includes("Onweerstaanbaar")) {
                    element.innerHTML = `Dagelijks <b>handgemaakt</b> door onze <b>chocolatiers</b>`;
                  } else if (element.textContent.includes("Een")) {
                    element.innerHTML = `Met persoonlijke <b>cadeauwikkel</b> en <b>kaartje</b>`;
                  } else if (element.textContent.includes("Voor")) {
                    element.innerHTML = `Elke bonbon een <b>unieke smaakbeleving</b>`;
                  }
                });
            }
          );
        },

        handleTracking: function () {
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
    }
  );
})();
