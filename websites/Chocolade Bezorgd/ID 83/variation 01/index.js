(function () {
  const config = {
    test_id: "ID83_variation",
    test_name: "ID83_Bonbons_bars_home",
    selector: ".site-inner",
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
              .site-inner {
                padding-top: 0;
              }
              
              .header-message {
                display: none;
              }

              .id83-test-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #F8F7F5;
              }

              .id83-test-title {
                font-size: 24px;
                color: #E84F36;
                font-weight: 600;
                font-family: "Juana regular";
                margin: 25px 0;
              }

              .id83-test-blocks {
                display: flex;
                gap: 45px;
                margin-bottom: 35px;
              }

              .id83-test-block {
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: end;
                width: 400px;
                height: 125px;
                background: white;
                border-radius: 5px;
                box-shadow: 0px 2px 6px 0px rgba(200, 165, 95, 0.4)
              }

              .id83-test-block img {
                width: 125px;
                height: 125px;
                border-radius: 5px 0 0 5px;
              }

              .id83-test-link {
                align-self: center;
                font-family: 'Juana Regular';
                font-weight: 400;
                text-decoration: underline;
                font-size: 24px;
                color: #242223;
              }

              .id83-test-link:hover {
                text-decoration: underline;
              }

              .id83-test-btn {
                margin: 0 8px 8px 0;
              }

              @media screen and (max-width: 910px) {
                .id83-test-block {
                  width: 350px;
                }
              }

              @media screen and (max-width: 880px) {
                .choco-hero {
                  margin: 25px -20px !important;
                }
              }

              @media screen and (max-width: 830px) {
                .id83-test-title {
                  margin: 20px 0;
                }

                .id83-test-blocks {
                  gap: 35px;
                }

                .id83-test-block {
                  width: 320px;
                  justify-content: start;
                }

                .id83-test-btn {
                  display: none;
                }

                .id83-test-link {
                  width: 100%;
                  text-align: center;
                  font-size: 20px;
                }
              }

              @media screen and (max-width: 710px) {
                .id83-test-blocks {
                  gap: 14px;
                }

                .id83-test-block {
                  flex-direction: column;
                  width: 170px;
                  height: 185px;
                  padding: 17px 20px 6px;
                  align-items: center;
                  justify-content: space-between;
                }

                img.id83-test-img {
                  border-radius: 5px;
                  width: 130px;
                  height: 130px;
                }

                a.id83-test-link {
                  font-size: 16px;
                }
              }

              @media screen and (max-width: 389px) {
                .id83-test-blocks {
                  scale: 0.9;
                }
              }
            `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          const testData = [
            {
              title: "Bonbons",
              imageLink:
                "https://www.chocoladebezorgd.nl/wp-content/uploads/2023/03/bonbons-cat-home.jpg",
              pageLink: "https://www.chocoladebezorgd.nl/bonbons-bestellen/",
            },
            {
              title: "Chocoladebars",
              imageLink:
                "https://www.chocoladebezorgd.nl/wp-content/uploads/2024/05/pistache-knafeh-bar.jpg",
              pageLink: "https://www.chocoladebezorgd.nl/chocoladerepen/",
            },
          ];

          const testElement = `
            <div class="id83-test-container">
              <h2 class="id83-test-title">Wat wil je laten bezorgen?</h2>
              <div class="id83-test-blocks">
                ${testData
                  .map(
                    (item) => `
                  <div class="id83-test-block" data-link="${item.pageLink}">
                    <img src="${item.imageLink}" alt="${item.title}" class="id83-test-img"/>
                    <a href="${item.pageLink}" class="id83-test-link">${item.title}</a>
                    <svg class="id83-test-btn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.41406 14.7266C9.04688 15.0938 8.45312 15.0938 8.08984 14.7266C7.72656 14.3594 7.72266 13.7656 8.08984 13.4023L11.4883 10.0039L8.08984 6.60547C7.72266 6.23828 7.72266 5.64453 8.08984 5.28125C8.45703 4.91797 9.05078 4.91406 9.41406 5.28125L13.4766 9.33594C13.8438 9.70312 13.8438 10.2969 13.4766 10.6602L9.41406 14.7266Z" fill="#E84F36"/>
                    </svg>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `;

          document
            .querySelector(config.selector)
            .insertAdjacentHTML("beforebegin", testElement);

          document.querySelectorAll(".id83-test-block").forEach((block) => {
            block.addEventListener("click", (e) => {
              if (block.dataset.link.includes("chocoladerepen")) {
                console.log("== chocoladebars ==");
                // window._conv_q = window._conv_q || [];
                // _conv_q.push(["triggerConversion", "1004106529"]);
              }

              if (block.dataset.link.includes("bonbons-bestellen")) {
                console.log("== bonbons ==");
                // window._conv_q = window._conv_q || [];
                // _conv_q.push(["triggerConversion", "1004106528"]);
              }

              // Prevent double navigation if user directly clicks the <a>
              if (e.target.tagName.toLowerCase() !== "a") {
                const link = block.dataset.link;
                window.location.href = link;
              }
            });
          });
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
