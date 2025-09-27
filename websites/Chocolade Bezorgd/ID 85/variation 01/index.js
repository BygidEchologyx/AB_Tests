(function () {
  const config = {
    test_id: "ID85_variation",
    test_name: "ID85_Waarde_propositie_V2",
    selector: ".woocommerce-product-details__short-description",
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
      !!document.querySelector(".cb-product-usps"),
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
              .woocommerce-product-details__short-description {
                margin-top: 12px;
                margin-left: 5px;
              }

              .cb-product-usp-icon {
                height: 16px !important;
                margin-left: 0;
                width: 16px !important;
              }

              .id85-product-bullet {
                display: flex;
                align-items: center;
                gap: 8px;
              }

              .id85-product-bullet-icon {
                width: 5px;
                height: 5px;
                background: black;
                border-radius: 50%;
              }

              .id85-bullet-text-content,
              .id85-usp-text-content {
                font-family: "Open Sans";
                font-size: 15px;
                font-weight: 400 !important;
                color: #242223 !important;
              }

              .id85-bullet-text-content > strong {
                font-family: "Open Sans";
                font-size: 15px;
                color: #242223 !important;
                font-weight: 700;
              }

              .id85-usp-text-content > strong {
                font-family: "Open Sans";
                font-size: 15px;
                color: #457B53 !important;
                font-weight: 700;
              }

              @media only screen and (max-width: 880px) {
                .single-product .woocommerce-product-details__short-description p {
                    padding: 20px 0;
                }
              }
           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          const bulletNumber = document
            .querySelector(".button-alignment-wrapper.align-left a.active")
            .textContent.slice(0, 2);

          const firstBulletText = document
            .querySelector(".product_title.entry-title")
            .textContent.includes("zelf samenstellen")
            ? `<strong>Selecteer</strong> zelf je ${bulletNumber} favoriete bonbons`
            : `<strong>${bulletNumber} bestseller</strong> bonbons (alcoholvrij)`;

          const updatedUspTexts = `
            <div class="cb-product-usp">
              <div class="cb-product-usp-icon"></div>
              <div class="cb-product-usp-text">
                <span class="id85-usp-text-content"><strong>Gratis</strong> verzending vanaf € 35</span>
              </div>
            </div>
            <div class="cb-product-usp">
              <div class="cb-product-usp-icon"></div>
              <div class="cb-product-usp-text">
                <span class="id85-usp-text-content">Kies zelf de gewenste <strong>verzenddatum</strong></span>
              </div>
            </div>
            <div class="cb-product-usp">
              <div class="cb-product-usp-icon"></div>
              <div class="cb-product-usp-text">
                <span class="id85-usp-text-content">Voor 17:00 uur besteld, <strong>vandaag</strong> verzonden</span>
              </div>
            </div>
          `;

          const updatedBulletPoints = `
            <div class="id85-product-bullet">
              <div class="id85-product-bullet-icon"></div>
              <div class="id85-product-bullet-text">
                <span class="id85-bullet-text-content">${firstBulletText}</span>
              </div>
            </div>
            <div class="id85-product-bullet">
              <div class="id85-product-bullet-icon"></div>
              <div class="id85-product-bullet-text">
                <span class="id85-bullet-text-content"><strong>Vers & handgemaakt</strong> door onze chocolatiers</span>
              </div>
            </div>
            <div class="id85-product-bullet">
              <div class="id85-product-bullet-icon"></div>
              <div class="id85-product-bullet-text">
                <span class="id85-bullet-text-content">Met persoonlijke <strong>cadeauwikkel</strong> en <strong>kaartje</strong></span>
              </div>
            </div>
            <div class="id85-product-bullet">
              <div class="id85-product-bullet-icon"></div>
              <div class="id85-product-bullet-text">
                <span class="id85-bullet-text-content">Elke bonbon een <strong>unieke smaakbeleving</strong></span>
              </div>
            </div>
          `;

          document.querySelector(
            `${config.selector} > p:first-of-type`
          ).innerHTML = updatedBulletPoints;

          document.querySelectorAll(".cb-product-usps").forEach((element) => {
            element.innerHTML = updatedUspTexts;
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

// v1: https://www.chocoladebezorgd.nl/bonbons-bestellen/box-of-happiness-24-stuks/?_conv_eforce=1004168695.1004398359&utm_campaign=qa85
