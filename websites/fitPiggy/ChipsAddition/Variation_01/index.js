(function () {
  const config = {
    test_id: "ID78_variation",
    test_name: "ID78_Snelle_navigatie_bovenaan",
    selector: "#main > .breadcrumb-main",
  };

  console.log("=== Experiment bucketed ===", config.test_name, config.test_id);

  function waitForElement(predicate, callback, timer = 10000, frequency = 25) {
    try {
      if (timer <= 0) {
        throw new Error(`Timeout reached while waiting for condition: ${predicate.toString()}`);
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
            console.log("=== Variation is already loaded ===", config.test_name);
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
          document.head.appendChild(styles).textContent =
           `
           .breadcrumb-main {
              position: unset !important;
              display: block;
            }

            .container--vertical-space-small {
              margin-top: 10px;
            }

            .chips-container-style {
              width: fit-content;
              display: flex;
              gap: 13px;
              padding: 8px 12px;
            }

            .chip-style {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: fit-content;
              max-height: 40px;
              height: fit-content;
              padding: 12px;
              border: 1px solid #767676;
              border-radius: 30px;
            }

            .chip-link-style {
              color: black;
              font-family: 'Inter', sans-serif;
              font-weight: 400;
              font-size: 12px;
            }
           `
        },
        // remove it if not necessary
        delegate: (function () {
          if (!Element.prototype.matches) {
            Element.prototype.matches =
              Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
          }

          return function (el, evt, sel, handler) {
            el.addEventListener(evt, function (event) {
              var t = event.target;
              while (t && t !== this) {
                if (t.matches(sel)) {
                  handler.call(t, event);
                }
                t = t.parentNode;
              }
            });
          };
        })(),

        mainJS: function () {
          const chipsData = {
            piggyBars: { 
              text: 'Piggy Bars', 
              link: 'https://fitpiggy.nl/collections/biggy-bars', 
              className: 'ck-piggy-bars' 
            },
            regularBars: { 
              text: 'Regular Bars', 
              link: 'https://fitpiggy.nl/collections/regular-bars', 
              className: 'ck-regular-bars' 
            },
            boxen: { 
              text: 'Voordeelboxen', 
              link: 'https://fitpiggy.nl/collections/boxen', 
              className: 'ck-boxen' 
            },
            proteinerepen: { 
              text: 'Proteïnerepen', 
              link: 'https://fitpiggy.nl/collections/proteinerepen', 
              className: 'ck-proteinerepen' 
            }
          };

          const chipsOrder = {
            '/collections/biggy-bars':    ['regularBars', 'boxen', 'proteinerepen'],
            '/collections/regular-bars':  ['piggyBars', 'boxen', 'proteinerepen'],
            '/collections/proteinerepen': ['piggyBars', 'regularBars', 'boxen'],
            '/collections/boxen':         ['piggyBars', 'regularBars', 'proteinerepen']
          };

          function chipsCreation(chipsArray) {
            return `
              <div class="chips-container-style">
                ${chipsArray.map(chip => `
                  <span class="chip-style ${chip.className}">
                    <a class='chip-link-style' href='${chip.link}'>${chip.text}</a>
                  </span>
                `).join('')}
              </div>
            `;
          }

          console.log("=== Variation is loaded ===", config.test_name);

          const currentPath = window.location.pathname.replace(/\/$/, "");
          const targetDiv = document.querySelector('#main > .breadcrumb-main');

          if (window.innerWidth<=600 && chipsOrder[currentPath]) {
            console.log("== variation will run. ==");
            const chips = chipsOrder[currentPath].map(key => chipsData[key]);
            targetDiv.insertAdjacentHTML('afterend', chipsCreation(chips));
          }
        },

        handleTracking: function () {
          // Clarity tracking
          function initMsClarityTracking() {
            waitForElement(
              () => !!window["clarity"],
              () => {
                console.log(`=== Clarity is loaded for ${config.test_name} ===`);
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
 

