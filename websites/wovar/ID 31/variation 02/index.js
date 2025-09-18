(function () {
  const config = {
    test_id: "ID31_variation_02",
    test_name: "ID31_Sticky_CTA_winkelwagen_pagina",
    selector: ".cart__sticky .cart__summary > div > div:has(button.btn)",
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
      !!document.querySelector("main .cart") &&
      !document.querySelector(`.${config.test_id}`) &&
      !!document.querySelector(config.selector) &&
      !!document.querySelector(".cart__summary .cart__summary-total"),
    () => {
      let echoVariation = {
        init: function () {
          const isCartPage = window.location.pathname === "/cart";

          // Cleanup on non-cart pages
          if (!isCartPage) {
            document.querySelector(".sticky-checkout-section")?.remove();
            return;
          }

          if (document.querySelector(`.${config.test_id}`)) return;
          document.querySelector(config.selector).classList.add(config.test_id);

          this.mainJS();
          this.mainCSS();
          this.handleClarityTracking();
        },
        mainCSS: function () {
          if (document.getElementById(config.test_id + "-style")) {
            return;
          }
          var styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          styles.setAttribute("id", config.test_id + "-style");
          document.head.appendChild(styles).textContent = `
            .sticky-checkout-section {
              width: 100%;
              background: #F5F5F5;
              padding: 14px 23px;
              position: fixed;
              bottom: 0;
              left: 0;
              margin: 0 !important;
            }

            .sticky-checkout-section button {
              background: #38803a !important;
              border-radius: 4px;
            }

            .id31-content-section {
              display: flex;
              justify-content: space-between;
              padding: 0 15px;
            }

            .id31-updated-text,
            .id31-updated-price {
              color: #353535;
              font-family: 'Lato';
              font-size: 14px;
              font-weight: 700;
            }

            .ID31_variation_02 {
              margin-top: 8px !important;
            }
          `;
        },

        mainJS: function () {
          console.log("== main js is running ===");

          const targetNode = document.querySelector(
            ".cart__summary .cart__summary-total"
          );
          const button = document.querySelector(
            ".cart__sticky .cart__summary > div > div:has(button.btn)"
          );
          const originalParent = button.parentNode;
          const originalNextSibling = button.nextSibling;
          let wrapper,
            buttonBottom = null;

          function recalcButtonPosition() {
            const rect = document
              .querySelector(".cart__summary")
              .getBoundingClientRect();
            buttonBottom = rect.bottom + window.scrollY;
            console.log("== button position recalculated ==", buttonBottom);
          }

          function updatedContent() {
            const onlyPrice =
              document.querySelector(
                ".cart__summary .cart__summary-total .price"
              )?.innerHTML || "";

            const validationInput = document.querySelector(
              `input[name="shippingOptionName"]`
            );
            const validationText = validationInput?.value || "";

            let onlyText = "";
            if (validationText.includes("Free")) {
              onlyText = "Totaalprijs incl gratis bezorging";
            } else if (validationText.includes("Nederland")) {
              onlyText = "Totaalprijs incl bezorging";
            } else if (validationText.includes("Groningen")) {
              onlyText = "Totaalprijs incl afhalen";
            }

            return { onlyPrice, onlyText };
          }

          function renderWrapper(data) {
            if (!wrapper) {
              wrapper = document.createElement("div");
              wrapper.className = "sticky-checkout-section";
              wrapper.setAttribute("style", "display: none");
              document.body.appendChild(wrapper);
            }

            wrapper.innerHTML = `
              <div class="id31-content-section">
                <span class="id31-updated-text">${data.onlyText}</span>
                <span class="id31-updated-price">${data.onlyPrice}</span>
              </div>
            `;

            if (!wrapper.contains(button)) {
              wrapper.appendChild(button);
            }
          }

          function toggleSticky() {
            if (buttonBottom == null) recalcButtonPosition();
            const viewportBottom = window.scrollY + window.innerHeight;

            if (viewportBottom < buttonBottom) {
              if (!wrapper.contains(button)) {
                wrapper.appendChild(button);
              }
              wrapper.setAttribute("style", "display: block");
            } else {
              if (wrapper.contains(button)) {
                originalParent.insertBefore(button, originalNextSibling);
              }
              wrapper.setAttribute("style", "display: none");
            }
          }

          button.addEventListener("click", () => {
            if (wrapper.contains(button)) {
              console.log("== sticky CTA ==");
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "1004105531"]);
            } else {
              console.log("== original CTA ==");
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "1004105532"]);
            }
          });

          // Initial render
          renderWrapper(updatedContent());
          toggleSticky();

          // Watch for text and price changes
          new MutationObserver(() => {
            console.log("== running mutation ==");
            renderWrapper(updatedContent());
          }).observe(targetNode, {
            subtree: true,
            childList: true,
            characterData: true,
          });

          window.addEventListener("scroll", toggleSticky);

          function removeStickyCartSection() {
            waitForElement(
              () =>
                !window.location.href.includes("/cart") &&
                !document.querySelector("main .cart"),
              () => {
                console.log("Not a cart page.");
                document.querySelector(".sticky-checkout-section").remove();
              }
            );
            if (window.location.href.includes("/cart")) {
            }
          }

          const cartNode = document.querySelector(".cart__products");
          if (cartNode) {
            new MutationObserver(() => {
              console.log("== cart changed, recalculating button position ==");
              recalcButtonPosition();
            }).observe(cartNode, {
              subtree: true,
              childList: true,
              attributes: true,
            });
          }

          let lastUrl = location.href;
          new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
              lastUrl = currentUrl;
              console.log("=== URL is changed. ===");
              removeStickyCartSection();
            }
          }).observe(document, { subtree: true, childList: true });
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

      if (document.body.classList.contains("ID31_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID31_variation_interval_flag");
      }, 25);
    }
  );
})();

// v1 : https://www.wovar.nl/cart?_conv_eforce=1004167739.1004396145&utm_campaign=id31
// v2 : https://www.wovar.nl/cart?_conv_eforce=1004167739.1004396148&utm_campaign=id31
