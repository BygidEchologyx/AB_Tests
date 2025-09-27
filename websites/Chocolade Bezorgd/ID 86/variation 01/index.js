(function () {
  const config = {
    test_id: "ID86_variation",
    test_name: "ID86_Zelf_smaken_kiezen_tekst_weg",
    selector: ".woocommerce-product-details__short-description p:last-child",
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
      !!document.querySelector(".cart #start-configurator"),
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
              .woocommerce-product-details__short-description p:last-child {
                display: none;
              }

              .cb-product-desktop-add-to-cart.hide-on-mobile {
                padding-top: unset;
              }
           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          document
            .querySelectorAll(".cart #start-configurator")
            .forEach((element) => {
              element.addEventListener("click", () => {
                window._conv_q = window._conv_q || [];
                _conv_q.push(["triggerConversion", "100481147"]);
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
    }
  );
})();
