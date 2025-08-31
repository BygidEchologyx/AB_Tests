(function () {
  const config = {
    test_id: "ID80_variation",
    test_name: "ID80_Luxe_verpakking_bonbons_niet_kapot",
    selector: ".cb-product-stock-mailbox__mailbox__text",
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
            .cb-product-stock-mailbox__stock:has(.in-stock) {
              display: none;
            }
            .cb-product-stock-mailbox:has(.out-of-stock) {
              max-width: unset;
              gap: 12px;
            }
            .cb-product-stock-mailbox__stock:has(.out-of-stock) {
              flex: none;
            }
            .letter-style {
              font-size: 16px;
            }
            .cb-product-stock-mailbox__mailbox__icon > i {
              margin-top: 5px;
            }

            @media screen and (max-width: 1024px) {  
              .cb-product-stock-mailbox:has(.out-of-stock) {
                flex-direction: column;
                max-width: unset;
                gap: 5px;
              }
            }
            @media screen and (max-width: 468px) {  
              .letter-style {
                font-size: 15px;
              }
            }
            @media screen and (max-width: 390px) {  
              .cb-product-stock-mailbox__mailbox {
                gap: 7px !important;
              } 
              .letter-style {
                font-size: 14px;
                white-space: nowrap;
              }
            }
           `;
        },

        mainJS: function () {
          console.log("=== Variation is wil run ===", config.test_name);

          waitForElement(
            () => !!document.querySelector(".summary #start-configurator"),
            () => {
              console.log("element found");
              document
                .querySelectorAll(".summary #start-configurator")
                .forEach((element) => {
                  console.log(element);
                  element.addEventListener("click", () => {
                    console.log("firing conversion clicks");
                  });
                });
            }
          );

          document
            .querySelectorAll(".cb-product-stock-mailbox__mailbox__text")
            .forEach((element) => {
              element.classList.add("letter-style");
              element.innerHTML = `
              Past door de <b>brievenbus</b>, onbreekbaar verpakt
            `;
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
