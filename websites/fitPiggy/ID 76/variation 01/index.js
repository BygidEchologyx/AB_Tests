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
              .product__description.rte,
              #etrusted-trusted_stars_service {
                display: none !important;
              }

              .breadcrumb-main {
                top: -1.5rem !important;
              }

              .main-product {
                margin-top: 25px;
              }

           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);
          document.addEventListener("click", (event) => {
            if (event.target.closest(".bundly__add_to_cart_button")) {
              console.log("== Goal fired ==");
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "100486311"]);
            }
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

// https://fitpiggy.nl/collections/regular-boxen/products/pick-mix-regulars-medium?_conv_eforce=1004167008.1004394536&utm_campaign=qa76
