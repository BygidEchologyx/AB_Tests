(function () {
  const config = {
    test_id: "ID84_variation",
    test_name: "ID84_Korting_toevoegen_bij_aantal_overzicht",
    selector: ".summary.entry-summary",
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
              .cb-product-suggested-alternatives,
              .id84-updated-second-section,
              .cb-product-desktop-add-to-cart,
              .hide-on-mobile:has(.cb-product-stock-mailbox) {
                background: #F6F5F2;
              }

              .cb-product-suggested-alternatives-text,
              .id84-updated-second-section-title {
                font-family: "Open Sans";
                font-weight: 700;
                font-size: 16px;
              }

              .choco-cta-btn-cb-product-suggested-alternatives-button {
                height: 125px;
              }

              .persuasion,
              .woocommerce-product-details__short-description p {
                display: none;
              }

              form.cart {
                margin-bottom: 0 !important;
              }

              .hide-on-desktop .cb-product-stock-mailbox {
                margin: unset;
              }

              .single-product .cb-product-stock-mailbox {
                margin: unset;
              }
              
           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          document.querySelector(
            ".cb-product-suggested-alternatives-text"
          ).textContent = "1. Kies aantal bonbons per doos:";

          const updatedProdDetails = `
            <div class="id84-updated-second-section">
              <span class="id84-updated-second-section-title">2. Kies aantal dozen van 10 bonbons:</span>
              <span>
                <span>Prijs</span>
                <span>14,95</span>
              </span>
            </div>
          `;
          document
            .querySelector(".woocommerce-product-details__short-description")
            .insertAdjacentHTML("beforeend", updatedProdDetails);
          // document.querySelectorAll(".choco-cta-btn-cb-product-suggested-alternatives-button").forEach(element => {

          // })

          const elementToMove = document.querySelector(
            ".woocommerce-product-details__short-description > p"
          );

          document
            .querySelector(".hide-on-mobile .cb-product-usps")
            .insertAdjacentElement("beforebegin", elementToMove);
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
