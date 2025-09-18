(function () {
  const config = {
    test_id: "ID74_variation",
    test_name: "ID74-Lijstpagina-grid-meer-info",
    selector: ".product-item__title",
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
    () =>
      document.querySelector(config.selector) &&
      document.querySelector(".product-item__text:not(.card__text)") &&
      document.querySelector(".card__text") &&
      document.querySelector(".product-item__icons") &&
      document.querySelector(".card__image"),
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

          this.mainCSS();
          this.mainJS();
          this.handleClarityTracking();
        },
        mainCSS: function () {
          var styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          document.head.appendChild(styles).textContent = `
                        .grid--layout {
                            grid-template-columns: repeat(1, 100%);
                        }
                        .main-content--align-product-items .product-item {
                            flex-direction: row !important;
                            padding: 16px;
                        }
                        .image-icons-wrapper {
                            width: 40%;
                            padding-top: 5px;
                        }
                        .text-wrapper {
                            width: 60%;
                            display: flex;
                            flex-direction: column;
                        }
                        .text-with-icon--tooltip {
                            margin-inline-end: 0;
                        }
                        .product-item__icons {
                            justify-content: center;
                            margin-top: 10px;
                        }
                        .main-content--align-product-items .product-item__text.card__text {
                            text-align: left !important;
                            padding-right: 0;
                            padding-top: 0 !important;
                            padding-bottom: 15px !important;
                        }
                        .main-content--align-product-items .product-item__text:not(.card__text) {
                            padding-bottom: 0;
                            padding-right: 0;
                        }
                        .product-item__title span {
                            color: #121212;
                            font-weight: 700;
                            font-size: 18px;
                            line-height: 18.7px;
                            padding-bottom: 10px;
                            display: inline-block;
                        }
                        .product-description p {
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 125%;
                            color: #000000;
                            margin: 0;
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .product-item__title .remove-line-height-space--small {
                            margin-bottom: 0 !important;
                        }
                        a.product-item__title {
                            margin-bottom: 0;
                        }
                        .shopify-product-form .button__icon {
                            padding-right: 8px !important;
                            line-height: 0;
                            transform: unset !important;
                        }
                        .shopify-product-form span.button__text {
                            display: flex !important;
                            align-items: center;
                            justify-content: center;
                            transform: unset !important;
                        }
                        .shopify-product-form span.button__text .button-text-inside {
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 18px;
                        }
                        .product-description li {
                            position: relative;
                            padding-left: 21px;
                            background-image: url('https://cdn.shopify.com/s/files/1/0818/5708/5754/files/checkmark-new.svg?v=1733400302');
                            background-position: left 3px;
                            background-repeat: no-repeat;
                            background-size: 14px 14px;
                            font-weight: 400;
                            font-size: 14px;
                            color: #000000;
                            padding-bottom: 2px;
                        }
                        .product-item__badge {
                            float: left !important;
                        }
                        .product-item.card .shopify-product-form button {
                            padding-top: .6rem !important;
                            padding-bottom: .6rem !important;
                        }
                        .image-icons-wrapper .lazy-image.lazy-image--fit img {
                            padding: 0 !important;
                        }
                        #main-collection-product-grid {
                            opacity: 0;
                        }
                        #main-collection-product-grid.show-grid {
                            opacity: 1 !important;
                        }
                        @media screen and (max-width: 375px) {
                        
						}
                    `;
        },
        mainJS: function () {
          /**
           * Fetches product data from corresponding PDP URL JSON endpoint and returns
           * formatted product information. Strips HTML from descriptions and
           * provides a fallback if no description exists.
           */
          async function fetchProductDescription(productUrl) {
            try {
              const jsUrl = productUrl + ".js";

              const response = await fetch(jsUrl);

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const productData = await response.json();

              const description = productData.description;
              const cleanDescription = !!description
                ? `<p>${description.replace(/<[^>]*>/g, "")}</p>`
                : `<div class="product__subtitle text-size--regular">
										<ul>
												<li>Mega vullend</li>
												<li>Extreem lekker</li>
												<li>Vezelrijk &amp; eiwitrijk</li>
										</ul>
								</div>`;

              return {
                title: productData.title,
                url: productUrl,
                description: cleanDescription,
              };
            } catch (error) {
              console.error(
                `Error fetching product data for ${productUrl}:`,
                error
              );
              return null;
            }
          }

          /**
           * Processes a batch of product items by fetching their descriptions and
           * injecting them into the corresponding DOM elements. Takes each item's URL,
           * fetches product data, then appends description HTML to the product card.
           */
          async function processBatch(batch, batchNumber) {
            const promises = batch.map((item) =>
              fetchProductDescription(item.url)
            );
            const results = await Promise.all(promises);

            results.forEach((result, index) => {
              if (result) {
                const productCard =
                  batch[index].element.closest(".product-item.card");
                const cardElement = productCard?.querySelector(
                  ".card__text .product-item__title"
                );

                if (!cardElement) {
                  console.warn("Could not find title element for product");
                  return null;
                }

                const descriptionDiv = document.createElement("div");
                descriptionDiv.className = "product-description";
                descriptionDiv.innerHTML = result.description;

                if (!cardElement.querySelector(".product-description"))
                  cardElement.appendChild(descriptionDiv);
              }
            });

            return results.filter((result) => result !== null);
          }

          /**
           * Main orchestrator: finds all product cards, extracts URLs, and processes them
           * in batches of 5 to fetch and append descriptions. Stops if entire batch fails.
           */
          async function fetchAndAppendDescriptions() {
            const cardImages = document.querySelectorAll(".card__image");

            const cardData = Array.from(cardImages)
              .map((element) => {
                const href = element.getAttribute("href");
                if (href) {
                  const fullUrl = href.startsWith("http")
                    ? href
                    : window.location.origin + href;
                  return { element, url: fullUrl };
                }
                return null;
              })
              .filter((item) => item !== null);

            if (cardData.length === 0) {
              return;
            }

            const batchSize = 5;
            const batches = [];
            for (let i = 0; i < cardData.length; i += batchSize) {
              batches.push(cardData.slice(i, i + batchSize));
            }

            let allResults = [];
            for (let i = 0; i < batches.length; i++) {
              const batchResults = await processBatch(batches[i], i + 1);

              // Check if the batch was successful (at least one product processed)
              if (batchResults.length > 0) {
                allResults = allResults.concat(batchResults);
              } else {
                break;
              }
            }

            return allResults;
          }

          /**
           * Restructures product card DOM by wrapping image/icon elements in one container
           * and text elements in another.
           */
          function wrapProductCardElements() {
            const productCards =
              document.querySelectorAll(".product-item.card");

            productCards.forEach((card) => {
              const cardImage = card.querySelector(".card__image");
              const productIcons = card.querySelector(".product-item__icons");
              const cardText = card.querySelector(".card__text");
              const productText = card.querySelector(
                ".product-item__text:not(.card__text)"
              );

              if (cardImage || productIcons) {
                const imageWrapper = document.createElement("div");
                imageWrapper.className = "image-icons-wrapper";

                let firstElement = cardImage || productIcons;

                card.insertBefore(imageWrapper, firstElement);

                if (cardImage) {
                  imageWrapper.appendChild(cardImage);
                }
                if (productIcons) {
                  imageWrapper.appendChild(productIcons);
                }
              }

              if (cardText || productText) {
                const textWrapper = document.createElement("div");
                textWrapper.className = "text-wrapper";

                let firstElement = cardText || productText;

                card.insertBefore(textWrapper, firstElement);

                if (cardText) {
                  textWrapper.appendChild(cardText);
                }
                if (productText) {
                  textWrapper.appendChild(productText);
                }
              }
            });
          }

          // Entry point
          function init() {
            waitForElement(
              () => document.querySelector("#CollectionProductCount"),
              () => {
                const collectionProductCount = parseInt(
                  document
                    .querySelector("#CollectionProductCount")
                    .innerText.replace(/\D/g, "")
                );
                const waitForSelector = window.location.href.includes(
                  "/biggy-bars?page=2"
                )
                  ? `.product-item.card:nth-child(${collectionProductCount - 20}) .card__image`
                  : `.product-item.card:nth-child(${collectionProductCount}) .card__image`;

                waitForElement(
                  () => document.querySelector(waitForSelector),
                  () => {
                    fetchAndAppendDescriptions();
                    wrapProductCardElements();
                    document
                      .querySelector("#main-collection-product-grid")
                      .classList.add("show-grid");
                  }
                );
              }
            );
          }
          init();

          // Watch for URL changes for handling sorting
          var lastUrl = location.href;
          new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
              lastUrl = url;
              waitForElement(
                () => !document.querySelector(".ID74_variation"),
                () => {
                  init();
                }
              );
            } else {
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
    }
  );
})();
