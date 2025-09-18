(function () {
  const config = {
    test_id: "ID77_variation",
    test_name: "ID77_Uitleg_populaire_gelegenheden",
    selector: ".wp-block-kadence-rowlayout",
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
          if (document.querySelector(`.id77-hero-text-container`)) {
            console.log(
              "=== Variation is already loaded ===",
              config.test_name
            );
            return;
          }

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
            figure.wp-block-image.size-large.is-style-rounded {
              margin-bottom: 1.2em !important;
            }

            .entry-content .choco-block.choco-products:nth-of-type(2),
            .entry-content .choco-block.choco-products:nth-of-type(4) {
              margin-bottom: 20px;
              padding: 20px 15px;
              background-color: #F8F7F5;
            }

            .choco-products .entry .images,
            .woocommerce ul.products li.product a img {
              margin: unset;
            }

            .content-wrapper__text {
              padding-left: 5px !important;
              padding-right: 20px !important;
            }

            .choco-block.choco-products:nth-of-type(2) div.swiper,
            .choco-block.choco-products:nth-of-type(4) div.swiper {
              padding-top: 10px;
            }

            .choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title,
            .choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title {
              font-size: 18px !important;
              font-weight: 400 !important;
              padding: 0.5rem !important;
            }

            .choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title > b,
            .choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title > b {
              font-family: "Juana Regular" !important;
              font-weight: 700 !important;
            }

            .choco-block.choco-products:nth-of-type(2) .woocommerce-LoopProduct-link,
            .choco-block.choco-products:nth-of-type(4) .woocommerce-LoopProduct-link {
              background-color: #FFFFFF;
              box-shadow: 0px 2px 6px 0px rgba(200, 165, 95, 0.4);
            }

            .choco-block.choco-products:nth-of-type(2) .woocommerce-LoopProduct-link span.price,
            .choco-block.choco-products:nth-of-type(4) .woocommerce-LoopProduct-link span.price {
              padding: 15px 0;
            }

            .choco-block div.content-wrapper p {
              display: none;
            }

            .choco-block div.content-wrapper h3 {
              font-weight: 400;
            }

            .id77-hero-text-container {
              margin-top: 16px;
              text-align: start;
            }

            .id77-hero-text {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
            }

            .id77-hero-text svg {
              margin: 0 7px 0 13px;
            }

            .id77-hero-text span {
              font-family: "Open Sans";
              font-size: 16px;
              line-height: 20px;
            }

            .id77-gelengenheden-section {
              margin-bottom: 50px;
            }

            .id77-gelengenheden-section-title {
              font-family: "Juana Regular";
              text-align: center;
              margin: 30px 0;
            }

            .id77-gelengenheden-links-container {
              display: flex;
              flex-wrap: nowrap;
              gap: 25px;
              justify-content: center;
            }

            .id77-gelengenheden-section-link {
              display: flex;
              background: #D33218;
              color: white;
              width: 160px;
              height: 50px;
              border-radius: 5px;
              justify-content: center;
              align-items: center;
              font-family: "Juana regular";
              font-size: 18px;
            }

            .id77-gelengenheden-section-link:hover {
              color: #FFFFFF;
            }

            .choco-block .outer-wrap {
              margin: 20px 0;
            }

            /* Media Queries */

            @media only screen and (max-width: 880px) {
              .choco-block .outer-wrap {
                margin: unset;
              }

              .entry-content .choco-block.choco-products:nth-of-type(2),
              .entry-content .choco-block.choco-products:nth-of-type(4) {
                margin-left: -20px !important;
                margin-right: -20px !important;
                width: calc(100% + 40px) !important;
              }
            }
            @media screen and (min-width: 1024px) and (max-width: 1050px) {
              .choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title > b,
              .choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title > b {
                display: block;
              }
            }

            @media screen and (max-width: 1023px) {
              .id77-gelengenheden-links-container {
                gap: 10px;
              }
            }

            @media screen and (min-width: 768px) and (max-width: 1023px) {
              .entry-content .choco-block.choco-products .swiper li.entry {
                margin: 0 !important;
              }
            }
 
            @media screen and (max-width: 767px) {
              .choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title,
              .choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title {
                padding: 0.5rem !important;
              }

              .choco-block div.content-wrapper h3 {
                display: none;
              }

              .content-wrapper__text {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
              }

              .id77-gelengenheden-links-container {
                flex-wrap: wrap;
                gap: 15px;
              }

              .id77-gelengenheden-section-link {
                flex: 1 1 calc(33.33% - 10px);
                height: 44px;
              }

              .id77-hero-text svg {
                margin: 0 15px 0 13px;
                width: 20px;
                height: 20px;
              }
            }

            @media screen and (max-width: 480px) {
              .choco-block.choco-products:nth-of-type(2) .woocommerce-LoopProduct-link span.price,
              .choco-block.choco-products:nth-of-type(4) .woocommerce-LoopProduct-link span.price {
                padding: 0 0 15px 0;
              }
              .choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title,
              .choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title {
                font-size: 16px !important;
              }

              .choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title > b,
              .choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title > b {
                display: block;
              }

              .id77-gelengenheden-section-link {
                flex: 1 1 calc(50% - 10px);
              }
            }
          `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          const firstSectionMap = {
            "Box of happiness 35 stuks zelf samenstellen":
              "<b>35 stuks</b> zelf samenstellen",
            "Box of happiness 24 stuks zelf samenstellen":
              "<b>24 stuks</b> zelf samenstellen",
            "Bonbons 15 stuks zelf samenstellen":
              "<b>15 stuks</b> zelf samenstellen",
            "Bonbons 10 stuks zelf samenstellen":
              "<b>10 stuks</b> zelf samenstellen",
          };

          const secondSectionMap = {
            "Bonbons our favourites 35 stuks": "<b>35 stuks</b> our favourites",
            "Bonbons our favourites 24 stuks": "<b>24 stuks</b> our favourites",
            "Bonbons our favourites 15 stuks": "<b>15 stuks</b> our favourites",
            "Bonbons our favourites 10 stuks": "<b>10 stuks</b> our favourites",
          };

          const gelegenhedenData = [
            {
              text: "Verjaardag",
              link: "https://www.chocoladebezorgd.nl/chocolade-cadeau/verjaardag-chocolade/",
            },
            {
              text: "Gefeliciteerd",
              link: "https://www.chocoladebezorgd.nl/chocolade-cadeau/gefeliciteerd-chocolade/",
            },
            {
              text: "Beterschap",
              link: "https://www.chocoladebezorgd.nl/chocolade-cadeau/beterschap-chocolade/",
            },
            {
              text: "Bedankje",
              link: "https://www.chocoladebezorgd.nl/chocolade-cadeau/bedankt-chocolade/",
            },
            {
              text: "Liefde",
              link: "https://www.chocoladebezorgd.nl/chocolade-cadeau/liefde-chocolade/",
            },
            {
              text: "Sterkte",
              link: "https://www.chocoladebezorgd.nl/chocolade-cadeau/sterkte-chocolade/",
            },
          ];

          const heroContent = `
            <div class="id77-hero-text-container">
              <div class="id77-hero-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.5281 0.542678C16.0388 0.914117 16.1531 1.62842 15.7817 2.13915L6.63858 14.7109C6.44215 14.9824 6.13857 15.1502 5.80284 15.1788C5.46712 15.2074 5.14211 15.0824 4.90639 14.8467L0.334831 10.2751C-0.11161 9.82866 -0.11161 9.10363 0.334831 8.65719C0.781272 8.21075 1.50629 8.21075 1.95273 8.65719L5.57784 12.2823L13.9352 0.792685C14.3067 0.281956 15.021 0.167667 15.5317 0.539106L15.5281 0.542678Z" fill="#457B53"/>
                </svg>
                <span>Keuze uit <b>20 gratis cadeauwikkels</b> voor elke gelegenheid</span>
              </div>
              <div class="id77-hero-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.5281 0.542678C16.0388 0.914117 16.1531 1.62842 15.7817 2.13915L6.63858 14.7109C6.44215 14.9824 6.13857 15.1502 5.80284 15.1788C5.46712 15.2074 5.14211 15.0824 4.90639 14.8467L0.334831 10.2751C-0.11161 9.82866 -0.11161 9.10363 0.334831 8.65719C0.781272 8.21075 1.50629 8.21075 1.95273 8.65719L5.57784 12.2823L13.9352 0.792685C14.3067 0.281956 15.021 0.167667 15.5317 0.539106L15.5281 0.542678Z" fill="#457B53"/>
                </svg>
                <span>Voeg een <b>persoonlijk kaartje</b> toe met jouw boodschap</span>
              </div>
            </div>
          `;

          const gelegenhedenSection = `
            <div class="id77-gelengenheden-section">
              <h2 class="id77-gelengenheden-section-title">Populaire gelegenheden</h2>
              <div class="id77-gelengenheden-links-container">
                ${gelegenhedenData.map((item) => `<a class="id77-gelengenheden-section-link" href="${item.link}">${item.text}</a>`).join("")}
              </div>
            </div>
          `;

          const updateTitles = (selector, map) => {
            document.querySelectorAll(selector).forEach((el) => {
              if (map[el.textContent]) el.innerHTML = map[el.textContent];
            });
          };

          // Insert hero content
          const heroTarget = document.querySelector(
            ".choco-block div.content-wrapper h3"
          );
          if (heroTarget)
            heroTarget.insertAdjacentHTML("afterend", heroContent);

          // Update product titles
          updateTitles(
            ".choco-block.choco-products:nth-of-type(2) .woocommerce-loop-product__title",
            firstSectionMap
          );
          updateTitles(
            ".choco-block.choco-products:nth-of-type(4) .woocommerce-loop-product__title",
            secondSectionMap
          );

          // Insert gelegenheden section
          const afterFourth = document.querySelector(
            ".choco-block.choco-products:nth-of-type(4)"
          );
          if (afterFourth)
            afterFourth.insertAdjacentHTML("afterend", gelegenhedenSection);
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
