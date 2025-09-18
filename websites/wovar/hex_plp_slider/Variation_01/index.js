(function () {
  const config = {
    test_id: "ID23_variation",
    test_name: "ID23-Top-5-klussen",
    selector: ".webshop-category-list .text-center.mb-3 h1",
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
      !!document.querySelector(".webshop-category-list .text-center.mb-3 h1"),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(".top-five-screws")) return;

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
          .wvheader__search-container.hide-ck {
            display: none;
          }
          .webshop-category-list .text-center.mb-3 h1 {
            margin-bottom: 0.5rem !important;
          }
          .top-five-screws {
            margin-bottom: 3rem; 
          }
          .subtitle {
            font-size: 18px;
            font-weight: 600;
            font-family: Lato;
            margin-top: 10px;
          }
          .top-five-container {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 20px auto;
          }
          .inner-container {
            display: flex;
            border: 1px solid #E0E0E0;
            border-radius: 3px;
            flex-direction: column;
            padding: 15px 10px 2px;
          }
          .img-sizing {
            max-width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .image-container {
            height: 139px;
            width: 158px;
          }
          .slider-text {
            font-size: 16px;
            font-weight: 700;
            font-family: Lato;
            padding: 15px 5px;
          }

          @media screen and (max-width: 1024px) {
            .image-container {
                height: 100px;
                width: 120px;
            }
            .inner-container {
              border-radius: 5px;
              padding: 12px 8px 2px;
            }
            .top-five-container {
              gap: 1em;
            }
          }
          @media screen and (max-width: 768px) {
            .top-five-screws {
              margin-bottom: 1rem; 
            }  
            .top-five-container {
              display: flex;
              justify-content: start;
              gap: 0.8em;
              overflow-x: auto;
              padding-bottom: 10px;
              margin: 15px auto;
            }
            .subtitle {
              font-size: 15px;
            }
            .slider-text {
              font-size: 14px;
              padding: 10px 5px;
            }
          }
          `;
        },
        mainJS: function () {
          console.log("== main js is running ===");

          function getCategoryHeading() {
            return document.querySelector(
              ".webshop-category-list .text-center.mb-3 h1"
            );
          }

          function checkEligibility() {
            const heading = getCategoryHeading();
            return (
              heading?.textContent.includes("Schroeven") &&
              !document.querySelector(".top-five-screws")
            );
          }

          function checkNonEligibility() {
            const heading = getCategoryHeading();
            return (
              heading &&
              !heading.textContent.includes("Schroeven") &&
              document.querySelector(".top-five-screws")
            );
          }

          const popularScrewTasksData = [
            {
              name: "Overkapping",
              imgUrl:
                "https://images.prismic.io/wovar-rb2-dev/aKLhW6Tt2nPbaZ2x_Overkapping-klus.png?auto=format%2Ccompress&h=186&dpr=1",
              link: "https://www.wovar.nl/overkapping-schroeven/",
              className: "ck-goal-overkapping",
            },
            {
              name: "Schuur",
              imgUrl:
                "https://images.prismic.io/wovar-rb2-dev/aKLhWKTt2nPbaZ2u_Schuur-klus.png?auto=format%2Ccompress&h=186&dpr=1",
              link: "https://www.wovar.nl/schuur-schroeven/",
              className: "ck-goal-schuur",
            },
            {
              name: "Tuindeur",
              imgUrl:
                "https://images.prismic.io/wovar-rb2-dev/aKLhWaTt2nPbaZ2v_Tuindeur-klus.png?auto=format%2Ccompress&h=186&dpr=1",
              link: "https://www.wovar.nl/tuindeur-schroeven/",
              className: "ck-goal-tuindeur",
            },
            {
              name: "Vlonder",
              imgUrl:
                "https://images.prismic.io/wovar-rb2-dev/aKLhV6Tt2nPbaZ2t_Vlonder-klus.png?auto=format%2Ccompress&h=186&dpr=1",
              link: "https://www.wovar.nl/welke-schroeven-vlonder/",
              className: "ck-goal-vlonder",
            },
            {
              name: "Schutting",
              imgUrl:
                "https://images.prismic.io/wovar-rb2-dev/aKLhWqTt2nPbaZ2w_Schutting-klus.png?auto=format%2Ccompress&h=186&dpr=1",
              link: "https://www.wovar.nl/schutting-schroeven/",
              className: "ck-goal-schutting",
            },
          ];

          function renderTopFiveScrews() {
            const heading = getCategoryHeading();
            if (!heading) return;

            const html = `
              <div class='top-five-screws'>
                <h2 class="subtitle">Schroeven voor top 5 populaire klussen</h2>
                <div class='top-five-container'>
                  ${popularScrewTasksData
                    .map(
                      (task) => `
                      <a class='inner-container ${task.className}' href="${task.link}">
                        <div class="image-container">
                          <img class='img-sizing' src="${task.imgUrl}" alt="${task.name}"/>
                        </div>
                        <span class="slider-text">${task.name}</span>
                      </a>`
                    )
                    .join("")}
                </div>
              </div>
            `;
            heading.insertAdjacentHTML("afterend", html);
          }

          function applyTransformation() {
            waitForElement(checkEligibility, () => {
              console.log("== should be added ==");
              renderTopFiveScrews();
            });

            waitForElement(
              checkNonEligibility,
              () => {
                console.log("== should be removed ==");
                document.querySelector(".top-five-screws")?.remove();
              },
              3000
            );
          }

          applyTransformation();

          let lastUrl = location.href;
          new MutationObserver(() => {
            if (location.href !== lastUrl) {
              console.log("== URL changed ===");
              lastUrl = location.href;
              applyTransformation();
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

      if (document.body.classList.contains("ID23_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID23_variation_interval_flag");
      }, 25);
    }
  );
})();
