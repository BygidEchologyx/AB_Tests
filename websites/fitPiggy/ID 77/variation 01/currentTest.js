(function () {
  const config = {
    test_id: "ID77_variation",
    test_name: "ID77_Lijstpagina_grid_meer_info_V2",
    selector: ".main-footer",
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
      !!document.querySelector(".product-item__title"),
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
              #CollectionProductGrid {
                margin-top: 1.5rem;
              }

              #main-collection-product-grid {
                --visible-cols: 1;
              }

              #main-collection-product-grid .product-item {
                flex-direction: row;
              }

              #main-collection-product-grid .product-item > a {
                margin-top: 25px;
                padding-top: unset !important;
                width: 128px;
                height: 96px;
              }

              #main-collection-product-grid .product-item > .product-item__badges {
                width: fit-content;
                top: 4px;
                left: 4px;
              }

              #main-collection-product-grid .product-item > a img {
                object-fit: contain;
              }

              .container--large:has(#FacetFiltersForm),
              .product-item__text > .product-item__icons {
                display: none;
              }

              .id77-alt-bullet-points {
                width: 100%;
                text-align: start;
                margin-bottom: 0;
              }

              .id77-alt-bullet-points li {
                position: relative;
                padding-left: 25px;
                background-image: url(https://cdn.shopify.com/s/files/1/0818/5708/5754/files/checkmark-new.svg?v=1733400302);
                background-position: left 3px;
                background-repeat: no-repeat;
                background-size: 14px 14px;
              }

              .id77-content-holder {
                display: flex;
                flex-direction: column;
                flex: 1;
                align-items: start;
              }

              .id77-content-holder .product-item__title {
                width: 100%;
                text-align: start;
              }

              .id77-content-holder .product-item__text:has(.product-item__quick-buy) {
                width:100%;
              }

              .id77-content-holder .product-item__title .text-animation--underline {
                font-family: "DM Sans";
                font-weight: 700;
                font-size: 18px;
              }

              #main-collection-product-grid .product-item .product-item__price {
                font-family: "DM Sans";
                width: 100%;
                text-align: start;
              }

              .id77-bullet-points {
                width: 100%;
                text-align: start;
                padding-left: 22px;
                margin-bottom: 0;
              }
              .id77-bullet-points > ul {
                list-style: disc;
              }
              .id77-bullet-points li {
                font-family: "DM Sans";
                font-size: 14px;
                font-weight: 400;
              }
              
              .id77-bullet-points strong {
                font-weight: 700;
              }

              .shopify-product-form .button > .button__text {
                display: flex !important;
                transform: unset !important;
                align-items: center;
                justify-content: center;
                gap: 8px;
              }

              .shopify-product-form .button > .button__text > .button__icon {
                transform: TranslateY(2px) !important;
              }

              .shopify-product-form .button > .button__text > .button__icon > svg {
                width: 16px;
                height: 16px;
              }

              .shopify-product-form .button > .button__text > .button-text-inside {
                font-family: "DM Sans";
                font-weight: 400;
                font-size: 16px;
              }

           `;
        },

        mainJS: function () {
          console.log("=== Main JS running ===", config.test_name);

          async function fetchProductData() {
            const parser = new DOMParser();

            /**
             * Fetch & parse HTML from a given URL
             */
            async function fetchDocument(url) {
              const res = await fetch(url);
              const text = await res.text();
              return parser.parseFromString(text, "text/html");
            }

            /**
             * Extract data for a single product element
             */
            async function extractProductData(el) {
              const titleKey = el
                .querySelector(".bundly__product_title a")
                ?.textContent?.trim();
              if (!titleKey) return null;

              const customDataEls = el.querySelectorAll(
                ".bundly__product_custom_data"
              );

              // Case 1: Rich text field available
              if (customDataEls[1]?.innerHTML) {
                const updatedValue = customDataEls[1].innerHTML.replace(
                  "metafield-rich_text_field",
                  "id77-bullet-points"
                );
                console.log("== dataset: ==", { [titleKey]: updatedValue });
                return { [titleKey]: updatedValue };
              }

              // Case 2: Fallback – fetch product page
              const productLink = document.querySelector(
                `.product-item__title[title="${titleKey}"]`
              )?.href;

              if (!productLink) return null;

              const productDoc = await fetchDocument(productLink);
              const subtitleEl = productDoc.querySelector(
                ".product-text .product__subtitle"
              );

              console.log("=== subtitle ===", subtitleEl);

              if (subtitleEl) {
                const updatedValue = `<div class="id77-alt-bullet-points">${subtitleEl.innerHTML.trim()}</div>`;
                return { [titleKey]: updatedValue };
              }

              return null;
            }

            try {
              const doc = await fetchDocument(
                "https://fitpiggy.nl/collections/regular-boxen/products/pick-mix-regulars-medium"
              );

              const productDetails = doc.querySelectorAll(
                ".bundly__product_details"
              );
              console.log("== roduct dtls ==", productDetails);
              const results = {};

              for (const el of productDetails) {
                const productData = await extractProductData(el);
                if (productData) Object.assign(results, productData);
              }

              console.log("== results ==", results);
              return results;
            } catch (error) {
              console.error("Fetch failed:", error.message);
              return {};
            }
          }

          // ordering elements
          function elementsOrdering(testData) {
            document.querySelectorAll(".product-item")?.forEach((item) => {
              const productText = item.querySelector(
                ".product-item__text:has(.product-item__icons)"
              );
              const productPrice = productText.querySelector(
                ".product-item__price"
              );
              const productButton = item.querySelector(
                ".product-item__text:has(.product-item__quick-buy)"
              );

              if (productText || productButton) {
                const textAndBtnHolder = document.createElement("div");
                textAndBtnHolder.classList.add("id77-content-holder");

                // retriving this test's data from testData object
                const itemKey = item.querySelector(
                  ".product-item__title span"
                )?.textContent;
                console.log("== data ==", testData[itemKey]);
                const productBulletPoints = testData[itemKey];

                textAndBtnHolder.appendChild(productText);

                productPrice.insertAdjacentHTML(
                  "beforebegin",
                  productBulletPoints
                );

                textAndBtnHolder?.appendChild(productButton);

                item.appendChild(textAndBtnHolder);
              }
            });
          }

          // Run the function
          fetchProductData().then((data) => {
            console.log("== Collected metafields: ==", data);
            console.log("== Data keys: ==", Object.keys(data));

            elementsOrdering(data);
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

// control: https://fitpiggy.nl/collections/regular-bars?_conv_eforce=1004167449.1004395540&utm_campaign=qa77
// variant: https://fitpiggy.nl/collections/regular-bars?_conv_eforce=1004167449.1004395541&utm_campaign=qa77
