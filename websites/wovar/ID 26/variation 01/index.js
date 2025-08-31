(function () {
  const config = {
    test_id: "ID26_variation",
    test_name: "ID26-PDP-winkelwagen-blok-rustiger",
    selector: ".pdp__order-addtocart",
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
    () => !!document.querySelector(".pdp__order-addtocart h3"),
    () => {
      let echoVariation = {
        init: function () {
          // need some returning logic here

          this.mainJS();
          this.mainCSS();
          this.handleClarityTracking();
        },
        mainCSS: function () {
          if (document.getElementById(config.test_id + "-style")) {
            return;
          }
          let styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          styles.setAttribute("id", config.test_id + "-style");
          document.head.appendChild(styles).textContent = `
            .pdp__order-staffel .pdp__order-staffel,
            .pdp__order-staffel div:has(.price-disclaimer),
            .product-details-wrapper__payment-details--alt div.row.ml-lg-n2 {
              display: none;
            }

            .in-stock::before {
              content: "";
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #38803a;
              transform: translateY(1px);
            }

            .truck[data-icon-after]::before {
              font-family: material-design;
              display: inline-block;
              font-weight: 400;
              line-height: 1;
              text-rendering: auto;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              content: attr(data-icon-after);
              margin-right: .5rem;
              vertical-align: 0;
              transform: translateY(1px);
            }

            .truck[data-icon-after]::after {
              content: none !important;
            }

          `;
        },
        mainJS: function () {
          console.log("== main js running ==");
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

      if (document.body.classList.contains("ID26_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID26_variation_interval_flag");
      }, 25);
    }
  );
})();
