(function () {
  const config = {
    test_id: "ID1_variation",
    test_name: "ID1_Home_afspraak_planner",
    selector: "#werkplaatstplanner-banner",
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
            html {
              position: relative;

              &::before {
                content: "AB test is running";
                position: fixed;
                top: 0;
                left: 0;
                z-index: 99999999999;
                background: #ff0000;
                color: #ffffff;
                padding: 10px;
                border: 7px solid #269b11;
              }
            }
           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);
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
