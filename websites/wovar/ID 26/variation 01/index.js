(function () {
  const config = {
    test_id: "ID26_variation",
    test_name: "ID26-PDP-winkelwagen-blok-rustiger",
    selector: ".product-details-wrapper",
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
    () =>
      !!document.querySelector(".pdp__order-addtocart h3") &&
      !document.querySelector(`.${config.test_id}`),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(".id26-updated-content")) {
            console.log("== returning ==");
            return;
          }
          document.querySelector(config.selector).classList.add(config.test_id);

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
            .ID26_variation .pdp__order-staffel .pdp__order-staffel,
            .ID26_variation .pdp__order-staffel div:has(.price-disclaimer),
            .ID26_variation .product-details-wrapper__payment-details--alt div.row.ml-lg-n2,
            .ID26_variation .product-details-wrapper__payment-details .pdp__order-inner div.row.ml-lg-n2 {
              display: none;
            }

            .ID26_variation .product-details-wrapper__payment-details .pdp__order-inner,
            .ID26_variation .product-details-wrapper__payment-details--alt .pdp__order-inner {
              padding-bottom: 0 !important;
            }

            .ID26_variation .in-stock::before {
              content: "";
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #38803a;
              transform: translateY(1px);
            }

            .ID26_variation .truck[data-icon-after]::before {
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

            .ID26_variation .truck[data-icon-after]::after {
              content: none !important;
            }

            .id26-updated-text {
              font-size: 14px;
              font-family: Lato;
              font-weight: 700;
            }

            .id26-updated-btn {
              cursor: pointer;
            }

            .id26-updated-btn-text {
              font-size: 14px;
              font-family: Lato;
              font-weight: 400;
              border-bottom: 1px solid currentColor;
              margin-right: 5px;
            }

            .id26-updated-btn-icon {
              display: inline-block;
              transform: rotate(0deg);
              transition: transform 0.3s ease;
            }

            .ID26_variation .pdp__order-addtocart .pdp__order-staffel > div:nth-child(2),
            .ID26_variation .pdp__order-addtocart .pdp__order-staffel > div:has(.d-flex) {
              display: none;
            }

            .rotate-180 {
              transform: rotate(180deg);
            }

            .test-in-stock {
              margin-left: 20px;
              color: #38803a;
            }

            @media screen and (min-width: 1440px) {
              div.product-details-wrapper.ID26_variation div.product-details-wrapper__payment-details--alt .pdp__order-addtocart .pdp__order-delivery-stock > div > div:nth-child(2) {
                margin: 0 auto;
            }
            }
            
            @media screen and (max-width: 991px) {
              .ID26_variation .in-stock:not(.test-in-stock) {
                display: none;
              }
            }

            @media screen and  (max-width: 389px) {
              .test-in-stock {
                margin-left: 10px;
              }
            }
          `;
        },
        mainJS: function () {
          console.log("== main js running ==");

          function applyChanges() {
            document
              .querySelectorAll(".pdp__order-addtocart .pdp__order-staffel h3")
              .forEach((element) => {
                const updatedText = `
                <span class="id26-updated-content">
                  <b class="id26-updated-text">Grote hoeveelheid?</b>
                  <button class="id26-updated-btn">
                    <span class="id26-updated-btn-text">Bekijk staffelkorting</span>
                    <svg class="id26-updated-btn-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                      <path d="M6.29365 7.70627C6.68428 8.0969 7.31865 8.0969 7.70928 7.70627L13.7093 1.70627C14.0999 1.31565 14.0999 0.681274 13.7093 0.290649C13.3187 -0.0999756 12.6843 -0.0999756 12.2937 0.290649L6.9999 5.5844L1.70615 0.293774C1.31553 -0.0968509 0.681152 -0.0968509 0.290527 0.293774C-0.100098 0.684399 -0.100098 1.31877 0.290527 1.7094L6.29053 7.7094L6.29365 7.70627Z" fill="#353535"/>
                    </svg>
                  </button>
                </span>
              `;

                element.innerHTML = updatedText;
              });

            // initial remove
            document
              .querySelectorAll(
                ".pdp__order-addtocart .pdp__order-staffel > div:nth-child(2)"
              )
              ?.forEach((el) => {
                el.classList.remove("d-flex");
              });
            document
              .querySelectorAll(
                ".pdp__order-addtocart .pdp__order-staffel > div:has(.d-flex)"
              )
              ?.forEach((el) => {
                el.classList.remove("d-flex");
              });

            document.querySelectorAll(".id26-updated-btn").forEach((button) => {
              button.addEventListener("click", function () {
                document
                  .querySelectorAll(".id26-updated-btn-icon")
                  .forEach((icon) => {
                    icon.classList.toggle("rotate-180");
                  });

                document
                  .querySelectorAll(
                    ".pdp__order-addtocart .pdp__order-staffel > div:nth-child(2)"
                  )
                  ?.forEach((el) => {
                    el.classList.toggle("d-flex");
                  });

                document
                  .querySelectorAll(
                    ".pdp__order-addtocart .pdp__order-staffel > div:has(.d-flex)"
                  )
                  ?.forEach((el) => el.classList.toggle("d-flex"));
              });
            });

            // update stock text

            const testInStock = `
              <span class="in-stock test-in-stock" data-icon-before="">${document.querySelector(".in-stock").textContent}</span>
            `;
            document
              .querySelector(
                ".product-details-wrapper__payment-details .pdp__order-addtocart.pdp__order-staffel  .pdp__order-label"
              )
              .insertAdjacentHTML("beforeend", testInStock);
          }

          applyChanges();
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
