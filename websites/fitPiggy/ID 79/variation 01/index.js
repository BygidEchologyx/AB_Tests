(function () {
  const config = {
    test_id: "ID79_variation",
    test_name: "ID79_Waarde_propositie_bars",
    selector: ".main-collection-banner",
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
      !!document.querySelector(
        ".collection-header__description > p:last-child"
      ),
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
              .main-collection-banner {
                background: #FDEDDD;
                margin-bottom: 25px;
              }

              .main-collection-banner > .container--large {
                padding: 17px 17px 1px 17px;
              }

              .main-collection-banner h1 {
                font-size: 28px;
                font-weight: 800;
                margin-bottom: 10px;
              }

              .main-collection-banner .section-heading__text {
                padding-inline-end: unset;
              }

              .collection-header__description > p:first-child {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 10px;
              }

              .id79-hero-list {
                display: flex;
                flex-direction: column;
                margin-bottom: unset;
              }

              .id79-hero-list-item {
                display: flex;
                align-items:center;
                margin: 4px 0px;
              }

              .id79-hero-item-text:before {
                content: '✔';
                color: #3A3A3A;
                display: block;
                width: 1.5em;
                height: 1.5em;
                line-height: 1.5em;
                text-align: center;
                font-size: .7em;
                background-color: #EE4D94;
                position: absolute;
                top: .2em;
                left: 0;
                border-radius: 100px;
              }

              .id79-hero-item-text {
                font-weight: 400;
                font-size: 15px;
                color: #3A3A3A;

                padding-left: 1.7em;
                position: relative;
              }

              .id79-hero-item-text > strong {
                font-weight: 700;
              }

              .inert-inside > .container--large {
                display: none;
              }
            `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          const heroData = [
            "<strong>Megavullend:</strong> voorkomt snaaien",
            "<strong>Verslavend lekker:</strong> Chewy bite",
            "<strong>Eiwitrijk:</strong> Minimaal 12 gram",
          ];

          const targetElement = document.querySelector(
            ".collection-header__description > p"
          );

          console.log("== targets ==", targetElement);

          targetElement.innerHTML = "Jouw zoete traktatie tegen snaaien";

          const bulletPoints = `
            <p class="id79-hero-list">
              ${heroData
                .map(
                  (text) => `
                <span class="id79-hero-list-item">
                  <span class="id79-hero-item-text">${text}</span>
                </span>
              `
                )
                .join("")}
            </p>
          `;

          targetElement.insertAdjacentHTML("afterend", bulletPoints);
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
