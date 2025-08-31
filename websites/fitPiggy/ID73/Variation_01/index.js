(function () {
  const config = {
    test_id: "ID73_variation",
    test_name: "ID73_Waarde_propositie_repen",
    selector: "#main > .breadcrumb-main",
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

          if (
            window.innerWidth > 600 ||
            window.location.pathname !== "/collections/proteinerepen"
          ) {
            console.log("=== Variation will not run ===", config.test_name);
            document
              .querySelector("#main > .breadcrumb-main")
              .setAttribute("style", "position: absolute !important;");
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
            .breadcrumb-main {
              position: unset !important;
              display: block;
            }
            .proteinerepen-hero-container {
              position: relative;
              width: 100%;
              height: 216px;
              background: #FFF3FA;
              margin-bottom: 1.5rem;
            }
            .proteinerepen-hero-parent {
              width: 100%;
              height: 100%;
              padding: 10px 15px;
            }
            .proteinerepen-hero-title {
              display: block;
              font-family: Rubik, sans-serif;
              font-weight: 700;
              font-size: 26px;
              }
            .proteinerepen-hero-subtitle {
              display: block;
              font-family: Rubik, sans-serif;
              font-weight: 400;
              font-size: 18px;
              margin-bottom: 10px;
            }
            .proteinerepen-hero-list-item {
              display: flex;
              align-items:center;
              margin: 4px 0px;
            }
            .proteinerepen-hero-item-tick {
              background: #FED2E7;
              padding: 2px;
              margin-right: 7px;
              width: 14px;
              height: 14px;
              border-radius:50%;
            }
            .proteinerepen-hero-item-text {
              font-family: DM Sans;
              font-weight: 500;
              font-size: 14px;
            }
            .proteinerepen-hero-bottom {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 15px 0px 10px 0px;
            }
            .proteinerepen-hero-bottom-svg {
              width: 20px;
              height: 21px;
            }
            .proteinerepen-hero-bottom-text {
              font-style: italic;
              font-family: DM Sans;
              font-weight: 400;
              font-size: 12px;
              margin-right: 4px;
            }
            .proteinerepen-hero-chocobars {
              position: absolute;
              width: 135px;
              height: 120px;
              bottom: 0;
              right: 0;
            }
            .proteinerepen-hero-protein-container {
              position: absolute;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: fit-content;
              height: fit-content;
              max-width:46px;
              padding: 2px 3px 1px 3px;
              border: 1px solid #FD1A86;
              border-radius: 5px;
              right: 5%;
              top: 35%;
            }
            .proteinerepen-hero-protein-value {
              font-family: DM Sans;
              font-weight: 900;
              font-size: 14px;
              line-height: 14px;
            }
            .proteinerepen-hero-protein-text {
              font-family: DM Sans;
              font-weight: 400;
              font-size: 10px;
            }
            
            @media (max-width: 390px) {
              .proteinerepen-hero-subtitle {
                transform: scale(0.95) !important;
                transform-origin: top left !important;
              }
              .proteinerepen-hero-item-text {
                margin-top: 3px;
                transform: scale(0.88) !important;
                transform-origin: top left !important;
              }
              .proteinerepen-hero-list-item {
                margin: 2px 0px;
              }
            }
           `;
        },

        mainJS: function () {
          console.log("=== Variation is loaded ===", config.test_name);

          const images = {
            bottomSVG:
              "https://cdn.shopify.com/s/files/1/0818/5708/5754/files/FitPiggy_bekend-van_Albert-Heijn.png?v=1755500043",
            tickIcon: `<svg class="proteinerepen-hero-item-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>`,
            chocoBars:
              "https://cdn.shopify.com/s/files/1/0818/5708/5754/files/Proteinerepen-fitpiggy.png?v=1755500044",
          };

          const heroData = [
            "De reep waar je wél naar uitkijkt",
            "Zacht & Smeuïg",
            "Smaakt als je favoriete candybar",
          ];

          const hideElement = (selector) => {
            const element = document.querySelector(selector);
            if (element) element.setAttribute("style", "display: none");
          };

          hideElement(".main-collection-banner");
          hideElement(".container--vertical-space > .container--large");

          // Create and insert new hero element
          const heroHTML = `
            <div class="proteinerepen-hero-container">
              <div class="proteinerepen-hero-parent">
                <span class="proteinerepen-hero-title">Proteïnerepen</span>
                <span class="proteinerepen-hero-subtitle">Jouw genietmoment. Altijd bij de hand</span>
                <div class="proteinerepen-hero-list">
                  ${heroData
                    .map(
                      (text) => `
                    <span class="proteinerepen-hero-list-item">
                      ${images.tickIcon}
                      <span class="proteinerepen-hero-item-text">${text}</span>
                    </span>
                  `
                    )
                    .join("")}
                </div>
                <div class="proteinerepen-hero-bottom">
                  <span class="proteinerepen-hero-bottom-text">Bekend van</span>
                  <img src="${images.bottomSVG}" alt="" class="proteinerepen-hero-bottom-svg"/>
                </div>
              </div>
              <div class="proteinerepen-hero-protein-container">
                <span class="proteinerepen-hero-protein-value">17g</span>
                <span class="proteinerepen-hero-protein-text">Proteïne</span>
              </div>
              <img src="${images.chocoBars}" alt="" class="proteinerepen-hero-chocobars"/>
            </div>
          `;

          document
            .querySelector("#main > .breadcrumb-main")
            ?.insertAdjacentHTML("afterend", heroHTML);
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
