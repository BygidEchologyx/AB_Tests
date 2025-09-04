(function () {
  const config = {
    test_id: "ID77_variation",
    test_name: "ID77_feasibility_check",
    selector: ".main-footer",
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
           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          async function fetchProductData() {
            try {
              const returnedData = {};
              console.time("fetching Data...");
              const res = await fetch(
                "https://fitpiggy.nl/collections/regular-boxen/products/pick-mix-regulars-medium"
              );
              const text = await res.text();
              const parser = new DOMParser();
              const doc = parser.parseFromString(text, "text/html");

              doc
                .querySelectorAll("[data-metafield-index]")
                .forEach((el, idx) => {
                  const titleElement = el.previousElementSibling;
                  const titleKey =
                    titleElement
                      ?.querySelector(".bundly__product_title a")
                      ?.textContent.trim() || `metafield_${idx}`;

                  if (el.children.length > 0) {
                    returnedData[titleKey] = el.innerHTML.trim();
                  } else if (el.textContent.trim().length > 0) {
                    returnedData[titleKey] = el.textContent.trim();
                  } else {
                    returnedData[titleKey] = "currently no data";
                  }
                });

              return returnedData;
            } catch (error) {
              console.error(error.message);
            }
          }

          fetchProductData().then((data) =>
            console.log("Collected metafields:", data)
          );
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
