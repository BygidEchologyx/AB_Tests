(function () {
  const config = {
    test_id: "ID31_variation_01",
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
      !!document.querySelector(config.selector) &&
      !!document.querySelector(".cart__summary .cart__summary-total"),
    () => {
      let echoVariation = {
        init: function () {
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
            .sticky-checkout-btn {
              background: #F5F5F5;
              padding: 14px 38px;
              position: fixed;
              bottom: 0;
              left: 0;
              margin: 0 !important;
            }
          `;
        },
        mainJS: function () {
          console.log("== main js is running ==");

          let naturalBottom = null;
          let button = null;

          function testLogic() {
            console.log("== test logic runs ==");

            button = document.querySelector(config.selector);
            if (!button) return;

            // prevent running multiple times on the same button
            if (button.dataset.stickyBound === "true") {
              console.log("== already bound, skipping ==");
              return;
            }
            button.dataset.stickyBound = "true";
            console.log("== btn found ==");

            function recalcButtonPosition() {
              const rect = document
                .querySelector(".cart__summary")
                .getBoundingClientRect();
              naturalBottom = rect.bottom + window.scrollY;
              console.log("== button position recalculated ==", naturalBottom);
            }

            function updateStickyState() {
              if (naturalBottom == null) recalcButtonPosition();
              const scrollTop = window.scrollY;

              if (scrollTop < naturalBottom - window.innerHeight) {
                button.classList.add("sticky-checkout-btn");
              } else {
                button.classList.remove("sticky-checkout-btn");
              }
            }

            // calculate once
            recalcButtonPosition();
            updateStickyState();

            // scroll listener (only updates class)
            window.addEventListener("scroll", updateStickyState, {
              passive: true,
            });

            // click listener (only once)
            button.addEventListener("click", () => {
              if (button.classList.contains("sticky-checkout-btn")) {
                console.log("== sticky CTA ==");
                window._conv_q = window._conv_q || [];
                _conv_q.push(["triggerConversion", "1004105531"]);
              } else {
                console.log("== original CTA ==");
                window._conv_q = window._conv_q || [];
                _conv_q.push(["triggerConversion", "1004105532"]);
              }
            });

            // cart changes → only recalc position (does NOT toggle sticky state)
            const targetNode = document.querySelector(".cart__products");
            if (targetNode) {
              new MutationObserver(() => {
                console.log(
                  "== cart changed, recalculating button position =="
                );
                recalcButtonPosition();
              }).observe(targetNode, {
                subtree: true,
                childList: true,
                attributes: true,
              });
            }
          }

          testLogic();

          // SPA url change watcher
          let lastUrl = location.href;
          new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
              lastUrl = currentUrl;
              console.log("== url changed ==", currentUrl);
              waitForElement(
                () =>
                  !!document.querySelector("main .cart") &&
                  !!document.querySelector(config.selector),
                () => {
                  testLogic();
                }
              );
            }
          }).observe(document, { subtree: true, childList: true });
        },

        handleClarityTracking: function () {
          function initMsClarityTracking() {
            waitForElement(
              () => !!window["clarity"],
              () => {
                window.clarity("set", "Exp_Name", config.test_name);
                window.clarity("set", "Var_Name", config.test_id);
              }
            );
          }
          initMsClarityTracking();
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

// https://www.wovar.nl/cart?_conv_eforce=1004167739.1004396145&utm_campaign=id31
