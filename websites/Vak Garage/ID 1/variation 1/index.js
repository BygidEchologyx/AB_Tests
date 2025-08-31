(function () {
  const config = {
    test_id: "ID1_variation",
    test_name: "ID1_Home_afspraak_planner",
    selector: "#werkplaatstplanner-banner",
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
            #werkplaatstplanner-banner {
              padding-top: 50px !important;
              padding-bottom: 50px !important;
            }

            #werkplaatstplanner-banner .container {
              display: none;
            }

            .test-parent-container {
              display: flex;
              width: 100%;
              height: 692px;
              flex-direction: column;
            }

            .test-top-section {
              background-color: #F5F5F5;
            }

            .test-top-inner {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              padding: 0 27px;
              position: relative;
              top: 61px;
              width: 70%;
              max-width: 815px;
              height: 491px;
              margin: 0 auto;
              border-radius: 8px;
              background-color: #FFFFFF;
              
              box-shadow: 
                0 -5px 0 #E5362C,
                0  4px 4px #EBEBEB;
            }

            .test-inner-top-section {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-bottom: 1px solid #D5D5D5;
            }

            .test-title {
              font-family: "Ocean Wide";
              font-size: 28px;
              font-weight: 300;
              line-height: 36px;
              letter-spacing: 0.3px;
              margin-bottom: 25px;
            }

            .test-inner-top-section > span > b {
              font-weight: 700;
            }

            .test-top-btn {
              display: flex;
              gap: 30px;
              margin-bottom: 31px;
              padding: 15px 33px;
            }
            
            .test-top-btn-text {
              font-family: "Ocean Wide";
              font-weight: 700;
              font-size: 18px;
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
            
            .test-inner-mid-section {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            .test-mid-section {
              width: 100%;
              height: 200px;
              background-color: #FFFFFF;
            }
            
            .test-inner-mid-title  {
              font-weight: 300;
              font-size: 22px;
              line-height: 16px;
            }

            .test-turbo-img {
              width: 307px;
              height: 213px;
              position: absolute;
              top: 218px;
              left: -244px;
            }

            .test-inner-mid-form {
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-top: 22px;
            }
              
            .test-mid-form-label {
              color: #616161;
              font-size: 14px;
              line-height: 16px;
              margin-left: 2px;
            }

            .test-mid-form-field {
              display: flex;
              align-items: center;
              gap: 30px;
            }

            .test-flag-svg {
              background-color: #2151ae;
              border-color: #2151ae;
              transition: border-color .3s, box-shadow .3s;
              background-image: url(/build/app/img/license-plate-country.edcd3601.svg);
              background-position: 50%;
              background-repeat: no-repeat;
              padding: 0 12px;
              background-size: 16px;
            }

            .test-form-btn-text {             
              font-family: "Ocean Wide";
              font-size: 15px;
              line-height: 16px;
              letter-spacing: 0.5px;
              font-weight: 700;
            }

            .input-group {
              width: unset;
              height: 60px;
            }
            
            .input-group--license-plate .form-control {
              text-align: start;
              border-color: #CC9A00;
              width: 190px;
              height: 100%;
            }

            .test-form-btn {
              height: 50px;
              padding: 8px 18px;
            }

            .test-inner-bottom-section {
              border: 1px solid #C3C3C3;
              border-radius: 5px;
              display: flex;
              margin-top: 34px;
              padding: 5px 0;
              justify-content: space-around;
              align-items: center;
              width: 70%;
            }

            .bottom-section-first-img {
              width: auto;
              height: 44px;
            }

            .bottom-section-second-img {
              width: auto;
              height: 68px;
            }

            .bottom-section-third-img {
              width: auto;
              height: 75px;
            }

            .test-bottom-section {
              background: #FFFFFF;
              display: flex;
              height: 200px;
              justify-content: center;
              align-items: center;
              gap: 45px;
            }

            .test-bottom-section-item {
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .test-bottom-section span b {
              font-weight: 700;
            }

            .test-required-message {
              display: none;
              color: #e42313;
              font-size: 12px;
              font-weight: 500;
              align-self: start;
            }

            @media screen and (max-width: 1330px) {
              .test-top-inner {
                margin: 0 18%;
              }  
              .test-turbo-img {
                width: 255px;
                height: 170px;
                position: absolute;
                top: 260px;
                left: -175px;
              }

              .test-inner-bottom-section {
                width: 80%;
              }
            }

            @media screen and (max-width: 1023px) {
              .test-turbo-img {
                display: none;
              }

              .test-top-section {
                padding-top: 30px;
              }

              .test-top-inner {
                margin: 0 auto;
                padding: 0px 22px;
                position: unset;
              }

              .test-bottom-section {
                background-color: #F5F5F5;
                flex-direction: column;
                justify-content: center;
                align-items: start;
                gap: 10px;
                margin-left: 15%;
              }
            }

            @media screen and (max-width: 767px) {
              .test-parent-container {
                height: auto;
              }

              .test-top-inner {
                width: auto;
                margin: 0px 25px;
                height: 443px;
              }
              .test-title {
                font-size: 23px;
                font-weight: 300;
                line-height: 27px;
                letter-spacing: 0.3px;
                margin-bottom: 25px;
              }

              .test-top-btn-text {
                font-size: 16px;
              }

              .test-inner-mid-title {
                font-size: 18px;
              }
              
              .test-inner-bottom-section {
                width: 100%;
              }

              .bottom-section-first-img {
                width: auto;
                height: 28px;
              }

              .bottom-section-second-img {
                width: auto;
                height: 55px;
              }

              .bottom-section-third-img {
                width: auto;
                height: 55px;
              }

              .test-bottom-section {
                height: 160px;
                margin-left: 5%;
              }
            }
            
            @media screen and (max-width: 480px) {
              .input-group {
                height: 56px;
              }

              .test-top-btn {
                padding: 15px 25px;
              }
                
              .test-form-btn {
                height: 44px;
                padding: 8px 15px;
                gap: 5px;
              }

              .test-form-btn-text {
                font-size: 12px;
              }

              .test-mid-form-field {
                gap: 20px;
              }

              .input-group--license-plate .form-control {
                width: 140px;
              }

              .test-inner-bottom-section {
                padding: 10px 0;
              }

              .test-bottom-section {
                height: 140px;
              }

              .test-bottom-section-item span {
                font-size: 14px;
              }
            }

            @media screen and (max-width: 389px) {
              .test-title {
                font-size: 20px;
                margin-bottom: 20px;
              }
              .test-top-btn {
                gap: 15px;
                margin-bottom: 25px;
              }

              .test-top-btn-text {
                font-size: 13px;
              }

              .test-inner-mid-form {
                margin-top: 20px;
              }

              .test-inner-mid-title {
                font-size: 17px;
              }

              .test-mid-form-field {
                gap: 20px;
              }

              .input-group--license-plate .form-control {
                width: 110px;
              }

              .test-inner-bottom-section {
                padding: 10px 0;
              }
            }
           `;
        },

        mainJS: function () {
          console.log("=== Variation is loaded ===", config.test_name);

          const testElement = `
            <div class="test-parent-container">
              <div class="test-top-section">
                <div class="test-top-inner">
                  <div class="test-inner-top-section">
                    <img class="test-turbo-img" src="/build/app/img/workplace-search-garage-turbo_hand_open.77c87de5.png" alt="Turbo">
                    <span class="test-title"><b>Maak direct een afspraak</b> of bereken uw kosten</span>

                    <a class="btn-sm btn btn-primary test-top-btn" href="https://www.vakgarage.nl/werkplaatsplanner" target="_self" title="Plan werkplaats afspraak">
                      <span class="test-top-btn-text">Plan werkplaats afspraak</span>
                      <div class="test-top-btn-icon">
                        <svg class="icon icon--chevron icon--24">
                            <use xlink:href="/build/app/img/symbols.dde7e44a.svg#chevron"></use>
                        </svg>
                      </div>
                    </a>
                  </div>

                  <div class="test-inner-mid-section">
                    <span class="test-inner-mid-title">Bereken uw onderhoudskosten</span>
                    <div class="test-inner-mid-form">
                      <span class="test-mid-form-label">Kenteken:</span>
                      <div class="test-mid-form-field">
                        <div class="input-group input-group--license-plate">
                          <div class="input-group-prepend">
                              <span class="input-group-text"></span>
                          </div>
                          <input class="form-control" name="licensePlate" placeholder="12-ABC-3" required="">
                        </div>
                        
                        <button class="btn-sm btn btn-tertiary test-form-btn">
                          <span class="test-form-btn-text">Bereken onderhoudskosten</span>
                          <div class="test-form-btn-icon">
                            <svg class="icon icon--chevron icon--24">
                                <use xlink:href="/build/app/img/symbols.dde7e44a.svg#chevron"></use>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div class="test-required-message">Dit veld is verplicht.</div>
                    </div>
                    <div class="test-inner-bottom-section">   
                      <img class="bottom-section-first-img" src="https://afhlcgnenq.cloudimg.io/v7/https://s3.eu-central-1.amazonaws.com/vakgarage-nl/10/bovag-2x.png?v=1-0&amp;height=60" srcset="https://afhlcgnenq.cloudimg.io/v7/https://s3.eu-central-1.amazonaws.com/vakgarage-nl/10/bovag-2x.png?v=1-0&amp;height=120 2x" alt="bovag@2x" loading="lazy" width="190.3125" height="70">

                      <img class="bottom-section-second-img" src="https://abtest-img-upload.s3.eu-west-2.amazonaws.com/Muurschild+RDW+Erkend+bedrijf+1.svg" srcset="https://abtest-img-upload.s3.eu-west-2.amazonaws.com/Muurschild+RDW+Erkend+bedrijf+1.svg" alt="bottom-section-img-2"/>
                      
                      <img class="bottom-section-third-img" src="https://abtest-img-upload.s3.eu-west-2.amazonaws.com/Scherm_afbeelding+2025-08-06+om+09.34.41+2.svg" srcset="https://abtest-img-upload.s3.eu-west-2.amazonaws.com/Scherm_afbeelding+2025-08-06+om+09.34.41+2.svg" alt="bottom-section-img-3"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="test-bottom-section">
                <span class="test-bottom-section-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 16" fill="none">
                    <path d="M-4.88281e-05 5.89375C-4.88281e-05 2.6375 2.68745 0 5.99995 0C9.31245 0 12 2.6375 12 5.89375C12 9.62188 8.2437 14.0906 6.67495 15.7937C6.3062 16.1938 5.69058 16.1938 5.32183 15.7937C3.75308 14.0906 -0.00317383 9.62188 -0.00317383 5.89375H-4.88281e-05ZM5.99995 8C6.53038 8 7.03909 7.78929 7.41417 7.41421C7.78924 7.03914 7.99995 6.53043 7.99995 6C7.99995 5.46957 7.78924 4.96086 7.41417 4.58579C7.03909 4.21071 6.53038 4 5.99995 4C5.46952 4 4.96081 4.21071 4.58574 4.58579C4.21066 4.96086 3.99995 5.46957 3.99995 6C3.99995 6.53043 4.21066 7.03914 4.58574 7.41421C4.96081 7.78929 5.46952 8 5.99995 8Z" fill="#1A171B"/>
                  </svg>
                  <span>Met <b>350+ vestigingen</b> altijd dichtbij</span>
                </span>
                <span class="test-bottom-section-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 17" fill="none">
                    <path d="M14.9353 3.18975C15.1692 2.9559 15.56 3.01436 15.6769 3.32207C15.8862 3.86671 16 4.46058 16 5.07908C16 7.79921 13.7968 10.0024 11.0767 10.0024C10.5382 10.0024 10.0182 9.91623 9.532 9.75622L3.78095 15.5073C2.91629 16.3719 1.51315 16.3719 0.648493 15.5073C-0.216164 14.6426 -0.216164 13.2395 0.648493 12.3748L6.39954 6.62376C6.23953 6.13759 6.15337 5.62064 6.15337 5.07908C6.15337 2.35894 8.35656 0.155762 11.0767 0.155762C11.6952 0.155762 12.2891 0.269613 12.8337 0.478854C13.1414 0.595783 13.1968 0.986571 12.966 1.22043L10.2366 3.94979C10.1443 4.0421 10.092 4.16826 10.092 4.2975V5.57141C10.092 5.84219 10.3136 6.06374 10.5844 6.06374H11.8583C11.9875 6.06374 12.1137 6.01143 12.206 5.91912L14.9353 3.18975Z" fill="#1A171B"/>
                  </svg>
                  <span>Onderhoud met een <b>vaste prijs</b></span>
                </span>
                <span class="test-bottom-section-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9.67183 1.40938C9.54371 1.15938 9.28433 1 9.00308 1C8.72183 1 8.46246 1.15938 8.33433 1.40938L6.03433 5.91563L1.03746 6.70937C0.759333 6.75312 0.528083 6.95 0.440583 7.21875C0.353083 7.4875 0.424958 7.78125 0.621833 7.98125L4.19683 11.5594L3.40933 16.5562C3.36558 16.8344 3.48121 17.1156 3.70933 17.2812C3.93746 17.4469 4.23746 17.4719 4.49058 17.3438L9.00308 15.05L13.5125 17.3438C13.7625 17.4719 14.0656 17.4469 14.2937 17.2812C14.5218 17.1156 14.6375 16.8375 14.5937 16.5562L13.8031 11.5594L17.3781 7.98125C17.5781 7.78125 17.6468 7.4875 17.5593 7.21875C17.4718 6.95 17.2437 6.75312 16.9625 6.70937L11.9687 5.91563L9.67183 1.40938Z" fill="#1A171B"/>
                  </svg>
                  <span>Wij krijgen een <b>9.1</b> o.b.v. <b>170.000+ reviews</b></span>
                </span>
              </div>
            </div>
          `;

          document
            .querySelector(".hero--second-block")
            .insertAdjacentHTML("beforebegin", testElement);

          if (window.innerWidth <= 820) {
            document.querySelector(".test-form-btn-text").innerHTML = "Bereken";
          }

          const inputValue = document.querySelectorAll(
            ".input-group--license-plate .form-control"
          );
          const berekenButton = document.querySelector(".license-plate button");

          document
            .querySelector(".test-form-btn")
            .addEventListener("click", (e) => {
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "1004104536"]);

              if (inputValue[0].value === "") {
                document
                  .querySelector(".test-required-message")
                  .setAttribute("style", "display: block");
              } else {
                document
                  .querySelector(".test-required-message")
                  .setAttribute("style", "display: none");
                inputValue[1].value = inputValue[0].value;
                berekenButton.click();
              }
            });

          // trigger goal
          waitForElement(
            () => !!document.querySelector(".main-header__cta a.btn-primary"),
            () => {
              document
                .querySelector(".main-header__cta a.btn-primary")
                .addEventListener("click", function () {
                  console.log("== CTA for maak ==");
                  window._conv_q = window._conv_q || [];
                  _conv_q.push(["triggerConversion", "1004104525"]);
                });
            }
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

menu__cta.btn - primary;
