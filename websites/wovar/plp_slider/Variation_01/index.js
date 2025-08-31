(function () {
  const config = {
    test_id: "ID23_variation",
    test_name: "ID23 | Top 5 klussen",
    selector: "body",
  };

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
          if (
            document
              .querySelector(config.selector)
              .classList.contains(config.test_id)
          )
            return;
          document.querySelector(config.selector).classList.add(config.test_id);

          if(window.location.href.includes('/schroeven')) {
            this.mainJS();
            this.mainCSS();
            this.handleClarityTracking();
          } else {
            return;
          }
        },
        mainCSS: function () {
          if (document.getElementById(config.test_id + "-style")) {
            return;
          }
          var styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          styles.setAttribute("id", config.test_id + "-style");
          document.head.appendChild(styles).textContent = `
          .webshop-category-list .component-categoryblock > .row {
            flex-direction: column;
            align-items: center;
            height: 100%;
          }
          .webshop-category-list .component-categoryblock.small-hexagon {
            border: 1px solid #D6D6D6;
            border-radius: 5px;
            background: white;
            max-width: unset;
            margin: 0 !important;
          }
          .webshop-category-list .component-categoryblock > .row .text--underline:after {
            display: none;
          }
          .webshop-category-list .component-categoryblock.small-hexagon .hexagon:before {
            display: none;
          }
          .webshop-category-list .component-categoryblock.small-hexagon .hexagon {
            transition: unset;
            clip-path: unset !important;
            width: 100% !important;
            height: 117px !important;
            background: white !important;
          }
          .webshop-category-list .component-categoryblock.small-hexagon .hexagon img {
            max-height: unset !important;
            margin: 0;
            padding: 0;
            border-radius: unset !important;
          }
          .webshop-category-list .component-categoryblock > .row .col a {
            justify-content: center;
            padding: 5px 5px 10px !important;
          }
          .webshop-category-list > .container > .text-center > .row {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
            gap: 13px;
            grid-auto-rows: 1fr;
            background: #F2F3F2;
            padding: 15px;
            margin-bottom: 30px !important;
        }
        .webshop-category-list .component-categoryblock.small-hexagon .heading {
            text-align: center !important;
            font-family: Lato;
            font-weight: 700;
            font-size: 16px;
            line-height: 18px;
            vertical-align: middle;
            text-decoration: underline;
            text-underline-offset: 4px;
            color: #353535;
            text-decoration-thickness: 1px;
        }
        .webshop-category-list .component-categoryblock > .row > .col-auto {
            width: 100%;
        }
        .webshop-category-list .component-categoryblock.small-hexagon h3 {
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .webshop-category-list h1 {
            margin-bottom: 10px !important;
          }
          .webshop-category-list .component-categoryblock.small-hexagon .hexagon:hover {
            background: unset !important;
          }
          @media screen and (max-width: 767px) {
            .webshop-category-list .component-categoryblock.small-hexagon .heading {
              font-size: 15px;
            }
            .webshop-category-list > .container > .text-center > .row{
              gap: 10px;
              grid-template-columns: repeat(3, 1fr);
              padding: 10px;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .hexagon {
              height: 90px !important;
              margin: 10px 0 0 !important;
            }
            .webshop-category-list .component-categoryblock > .row .col a {
              padding: 1px 5px 10px !important;
            }
            .wvheader__search-container.hide-ck {
              display: none;
            }
            .webshop-category-list h1 {
              margin-bottom: 0 !important;
              margin-top: 5px !important;
            }
            .webshop-category-list > .container > .text-center > .row {
              grid-auto-rows: unset;
            }
            .mobile-breadcrumbs {
              margin-bottom: 0 !important;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .hexagon img {
              max-height: 100% !important;
            }
          }
          @media screen and (max-width: 440px) {
            .webshop-category-list > .container > .text-center > .row {
              width: 107%;
              margin-left: -14px;
            }
            .webshop-category-list > .container {
              overflow-x: hidden;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .hexagon img {
              padding: 0 5px 5px;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .heading {
              font-size: 14px;
            }
          }
          @media screen and (max-width: 420px) {
            .webshop-category-list > .container > .text-center > .row {
              width: 108%;
              margin-left: -15px;
              gap: 7px;
              padding: 7px;
            }
            .wvheader-usps {
              padding-top: 0.2rem !important;
              padding-bottom: 0.2rem !important;
            }
            .wvheader {
              padding-top: 0.8rem !important;
              padding-bottom: 0.5rem !important;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .heading {
              line-height: 17px;
            }
          }
          @media screen and (max-width: 380px) {
            .webshop-category-list > .container > .text-center > .row {
              width: 109%;
              margin-left: -16px;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .heading {
              font-size: 14px;
            }
            .webshop-category-list .component-categoryblock.small-hexagon .hexagon {
              height: 85px !important;
            }
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
            gap: 1.3em;
            margin: 20px auto;
          }
          .inner-container {
            display: flex;
            border: 1px solid #E0E0E0;
            border-radius: 5px;
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
              padding: 12px 8px 2px;
            }
            .top-five-container {
              gap: 1em;
            }
          }
          @media screen and (max-width: 768px) {
            .top-five-container {
              display: flex;
              justify-content: start;
              gap: 0.8em;
              overflow-x: auto;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .slider-text {
              padding: 10px 5px;
            }
          }
          `;
        },
        mainJS: function () {
          const popularScrewTasksData = [
            {
              name: "Overkapping",
              imgUrl:
                "https://assets2.wovar.io/cdn-cgi/image/width=1000,quality=100/public-assets/WV006171/schaduwdoek_driehoek_gebroken_wit_4.jpg",
              link: "wovar.nl/schroeven-voor-overkappingen",
              className: 'ck-goal-overkapping'
            },
            {
              name: "Schuur",
              imgUrl:
                "https://assets2.wovar.io/cdn-cgi/image/width=1000,quality=100/public-assets/WV006171/schaduwdoek_driehoek_gebroken_wit_4.jpg",
              link: "wovar.nl/schroeven-voor-schuren",
              className: 'ck-goal-schuur'
            },
            {
              name: "Tuindeur",
              imgUrl:
                "https://assets2.wovar.io/cdn-cgi/image/width=1000,quality=100/public-assets/WV006171/schaduwdoek_driehoek_gebroken_wit_4.jpg",
              link: "wovar.nl/schroeven-voor-tuindeur",
              className: 'ck-goal-tuindeur'
            },
            {
              name: "Vlonder",
              imgUrl:
                "https://assets2.wovar.io/cdn-cgi/image/width=1000,quality=100/public-assets/WV006171/schaduwdoek_driehoek_gebroken_wit_4.jpg",
              link: "wovar.nl/schroeven-voor-vlonder",
              className: 'ck-goal-vlonder'
            },
            {
              name: "Schutting",
              imgUrl:
                "https://assets2.wovar.io/cdn-cgi/image/width=1000,quality=100/public-assets/WV006171/schaduwdoek_driehoek_gebroken_wit_4.jpg",
              link: "wovar.nl/schroeven-voor-schutting",
              className: 'ck-goal-schutting'
            },
          ];

          if (window.innerWidth < 768) {
            waitForElement(
              () => document.querySelector(".wvheader__search-container"),
              () => {
                document
                  .querySelector(".wvheader__search-container")
                  .classList.add("hide-ck");

                const interval = setInterval(() => {
                  if (
                    !document
                      .querySelector(".wvheader__search-container")
                      .classList.contains("active")
                  )
                    return;
                  document
                    .querySelector(".wvheader__search-container")
                    .classList.remove("active");
                  document.querySelector("a.wvheader__search").click();
                }, 100);

                setTimeout(() => {
                  clearInterval(interval);
                }, 1500);

                //attach listener
                document
                  .querySelector("a.wvheader__search")
                  .addEventListener("click", () => {
                    clearInterval(interval);
                    document
                      .querySelector(".wvheader__search-container")
                      .classList.remove("hide-ck");
                  });
              }
            );
          }

          waitForElement(
            () =>
              document.querySelector(
                ".webshop-category-list .text-center.mb-3 h1"
              ),
            () => {
              const targetElement = document.querySelector(
                ".webshop-category-list  .text-center.mb-3 h1"
              );
              const popularScrewTaskElement = `
              <div class='top-five-screws'>
                <h2 class="subtitle">Schroeven voor top 5 populaire klussen</h2>
                <div class = 'top-five-container'>
                  ${popularScrewTasksData
                    .map(
                      (task) => `
                  <a class='inner-container ${task.className}' href=${task.link}>
                    <div class="image-container"><img class='img-sizing' src=${task.imgUrl} alt=${task.name}/></div>
                    <span class="slider-text">${task.name}</span>
                  </a>`
                    )
                    .join("")}
                </div>
              </div>
              `;
              targetElement.insertAdjacentHTML(
                "afterend",
                popularScrewTaskElement
              );
            }
          );
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
