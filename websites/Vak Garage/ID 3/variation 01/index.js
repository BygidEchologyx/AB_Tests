(function () {
  const config = {
    test_id: "ID3_variation",
    test_name: "ID3_Afspraak_bovenaan_landingspagina's",
    selector: ".hero__overlay .container",
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
            .id3-test-container {
              display: flex;
              position: relative;
              max-width: 370px;
              height: 219px;
              padding-left: 30px;
              padding-right: 10px;
              border-radius: 8px;
              background-color: #FFFFFF;
              
              box-shadow: 0 -5px 0 #E5362C;
            }

            .id3-test-content-section {
              display: flex;
              flex-direction: column;
              align-items: start;
            }

            .id3-test-title {
              color: #1A171B;
              font-family: "Ocean Wide";
              font-size: 24px;
              font-weight: 700;
              letter-spacing: 0.3px;
              margin-top: 10px;
            }

            .test-top-btn {
              display: flex;
              width: 250px;
              gap: 15px;
              padding: 15px 18px;
              margin: 10px 0 15px;
            }
            
            .test-top-btn-text {
              font-family: "Ocean Wide";
              font-weight: 700;
              font-size: 15px;
              line-height: 16px;
            }

            .test-top-btn-icon {
              display: flex;
              background-color: #fff;
              border-radius: 50%;
              width: 16px;
              height: 16px;
              justify-content: center;
              align-items: center;
              margin-top: 2px;
            }

            .test-top-btn-icon svg {
              color: #E42313; 
            }

            .id3-test-bulletpoints {
              display: flex;
              flex-direction: column;
            }

            .id3-test-bulletpoints-item {
              color: #000000;
              display: flex;
              gap: 10px;
              margin-bottom: 2px;
            }

            .id3-test-bulletpoints-item > svg {
              margin: 1px 0;
            }

            .id3-test-bulletpoints-item > span {
              font-size: 12px;
            }

            @media screen and (max-width: 430px) {
              .hero__overlay .container  {
                padding: 0 15px;              
              }

              .id3-test-container {
                padding-left: 22px;
              }
            }

            @media screen and (max-width: 374px) {
              .hero__overlay .container  {
                padding: 0 7px;              
              }

              .id3-test-container {
                padding-left: 15px;
              }
            }
           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          const bannerTestContent = `
            <div class="id3-test-container">
              <div class="id3-test-content-section">
                <span class="id3-test-title"><b>Maak direct een afspraak</b></span>

                <a class="btn-sm btn btn-primary test-top-btn" href="https://www.vakgarage.nl/werkplaatsplanner" target="_self" title="Plan werkplaats afspraak">
                  <span class="test-top-btn-text">Plan werkplaats afspraak</span>
                  <div class="test-top-btn-icon">
                    <svg class="icon icon--chevron icon--24">
                        <use xlink:href="/build/app/img/symbols.dde7e44a.svg#chevron"></use>
                    </svg>
                  </div>
                </a>

                <div class="id3-test-bulletpoints">
                  <span class="id3-test-bulletpoints-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 16" fill="none">
                      <path d="M-4.88281e-05 5.89375C-4.88281e-05 2.6375 2.68745 0 5.99995 0C9.31245 0 12 2.6375 12 5.89375C12 9.62188 8.2437 14.0906 6.67495 15.7937C6.3062 16.1938 5.69058 16.1938 5.32183 15.7937C3.75308 14.0906 -0.00317383 9.62188 -0.00317383 5.89375H-4.88281e-05ZM5.99995 8C6.53038 8 7.03909 7.78929 7.41417 7.41421C7.78924 7.03914 7.99995 6.53043 7.99995 6C7.99995 5.46957 7.78924 4.96086 7.41417 4.58579C7.03909 4.21071 6.53038 4 5.99995 4C5.46952 4 4.96081 4.21071 4.58574 4.58579C4.21066 4.96086 3.99995 5.46957 3.99995 6C3.99995 6.53043 4.21066 7.03914 4.58574 7.41421C4.96081 7.78929 5.46952 8 5.99995 8Z" fill="#1A171B"/>
                    </svg>
                    <span>Met <b>350+ vestigingen</b> altijd dichtbij</span>
                  </span>
                  <span class="id3-test-bulletpoints-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 17" fill="none">
                      <path d="M14.9353 3.18975C15.1692 2.9559 15.56 3.01436 15.6769 3.32207C15.8862 3.86671 16 4.46058 16 5.07908C16 7.79921 13.7968 10.0024 11.0767 10.0024C10.5382 10.0024 10.0182 9.91623 9.532 9.75622L3.78095 15.5073C2.91629 16.3719 1.51315 16.3719 0.648493 15.5073C-0.216164 14.6426 -0.216164 13.2395 0.648493 12.3748L6.39954 6.62376C6.23953 6.13759 6.15337 5.62064 6.15337 5.07908C6.15337 2.35894 8.35656 0.155762 11.0767 0.155762C11.6952 0.155762 12.2891 0.269613 12.8337 0.478854C13.1414 0.595783 13.1968 0.986571 12.966 1.22043L10.2366 3.94979C10.1443 4.0421 10.092 4.16826 10.092 4.2975V5.57141C10.092 5.84219 10.3136 6.06374 10.5844 6.06374H11.8583C11.9875 6.06374 12.1137 6.01143 12.206 5.91912L14.9353 3.18975Z" fill="#1A171B"/>
                    </svg>
                    <span>Onderhoud met een <b>vaste prijs</b></span>
                  </span>
                  <span class="id3-test-bulletpoints-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M9.67183 1.40938C9.54371 1.15938 9.28433 1 9.00308 1C8.72183 1 8.46246 1.15938 8.33433 1.40938L6.03433 5.91563L1.03746 6.70937C0.759333 6.75312 0.528083 6.95 0.440583 7.21875C0.353083 7.4875 0.424958 7.78125 0.621833 7.98125L4.19683 11.5594L3.40933 16.5562C3.36558 16.8344 3.48121 17.1156 3.70933 17.2812C3.93746 17.4469 4.23746 17.4719 4.49058 17.3438L9.00308 15.05L13.5125 17.3438C13.7625 17.4719 14.0656 17.4469 14.2937 17.2812C14.5218 17.1156 14.6375 16.8375 14.5937 16.5562L13.8031 11.5594L17.3781 7.98125C17.5781 7.78125 17.6468 7.4875 17.5593 7.21875C17.4718 6.95 17.2437 6.75312 16.9625 6.70937L11.9687 5.91563L9.67183 1.40938Z" fill="#1A171B"/>
                    </svg>
                    <span>Wij krijgen een <b>9.1</b> in <b>170.000+ reviews</b></span>
                  </span>
                </div>
              </div>
            </div>
          `;

          document.querySelector(config.selector).innerHTML = bannerTestContent;
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
