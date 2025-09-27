(function () {
  const config = {
    test_id: "ID78_variation",
    test_name: "ID78_PDP_reviews_naar_boven_voedingswaarden_minder_opvallend",
    selector: ".shopify-section:has(#etrusted-review_carousel_service)",
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
      !!document.querySelector("main > div[id*=testimonial]") &&
      !!document.querySelector("main > div[id*=rich_text]"),
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
            .shopify-section:has(#etrusted-review_carousel_service) {
              margin: 40px 0;
            }
            
            .shopify-section:has(.testimonial-button) > div {
              margin-top: unset !important;
            }
            
            .shopify-section:has(.testimonial-button) h3 {
              display: none;
            }

            .product-icons-list {
              margin: 0 15px 25px 15px;
            }

            .product-icons-list .text-with-icon__label {
              font-weight: 600;
            }

            .toggle--table {
              border: none !important;
            }

            .toggle:first-of-type {
              border-top: 1px solid #AEAEAE !important;
            }

            .toggle {
              width: auto !important;
              margin: 0 15px;
              border-left: none !important;
              border-right: none !important;
              border-bottom: 1px solid #AEAEAE !important;
              border-radius: unset !important;
            }

            .toggle > span {
              background: unset !important;
              border: none !important;
            }
            `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          const target = document.querySelector(config.selector);
          if (!target) {
            console.warn("== Target element not found: ==", config.selector);
            return;
          }

          const upperFragment = document.createDocumentFragment();
          const lowerFragment = document.createDocumentFragment();

          // --- Upper section work ---
          const ratingCommentElements = document.querySelectorAll(
            "main > div[id*=testimonial]"
          );

          const testimonialSection = document.querySelector(
            ".shopify-section:has(.testimonial-button)"
          );

          if (testimonialSection) upperFragment.appendChild(testimonialSection);

          ratingCommentElements.forEach((el) => {
            upperFragment.appendChild(el);
          });
          target.parentNode.insertBefore(upperFragment, target);

          // --- Lower section work ---
          const ingredientIcons = document.querySelector(".product-icons-list");
          const dropdowns = document.querySelectorAll(".toggle");

          if (ingredientIcons) lowerFragment.appendChild(ingredientIcons);

          dropdowns.forEach((el) => {
            el.classList.remove("element--has-border");
            el.classList.add(
              `id78-${el.querySelector(".toggle__icon-title")?.textContent.trim()}-dropdown`
            );
            lowerFragment.appendChild(el);
          });
          target.parentNode.insertBefore(lowerFragment, target.nextSibling);
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

      if (document.body.classList.contains("ID78_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID78_variation_interval_flag");
      }, 25);
    }
  );
})();
