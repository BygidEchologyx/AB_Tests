(function () {
  const config = {
    test_id: "ID21_variation",
    test_name: "ID21-Aantal-kiezen-categoriepagina",
    selector: ".productblock",
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

  function isPLP() {
    return !!document.querySelector(
      ".productlist__items, .popular-products-container"
    );
  }

  waitForElement(
    () =>
      isPLP() &&
      !!document.querySelector(config.selector) &&
      !document
        .querySelector(config.selector)
        .classList.contains(config.test_id),
    () => {
      let echoVariation = {
        init: function () {
          this.mainCSS();
          if (
            document
              .querySelector(config.selector)
              .classList.contains(config.test_id)
          ) {
            return;
          }
          document.querySelector(config.selector).classList.add(config.test_id);

          this.mainJS();
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
.product-block-modified .quantity-selector {
    background: #F8F7F5;
    border: 1px solid #A7A7A7;
    border-radius: 4px;
    display: flex;
    height: 39px;
}
.product-block-modified button.quantity-btn.increase-btn {
    width: 43px;
    border-left: 1px solid #A7A7A7;
		cursor: pointer;
		display: flex;
    align-items: center;
    justify-content: center;
}
.product-block-modified button.quantity-btn.decrease-btn {
    width: 43px;
    border-right: 1px solid #A7A7A7;
		cursor: pointer;
		display: flex;
    align-items: center;
    justify-content: center;
}
.product-block-modified input.quantity-input::-webkit-inner-spin-button {
    display: none;
}
.product-block-modified input.quantity-input {
    border: none;
    width: 42px;
    font-family: Helvetica;
    font-weight: 400;
    font-size: 17px;
    line-height: 19px;
    text-align: center;
		-moz-appearance: textfield;
}
.product-block-modified .disabled-input {
		opacity: 0.5;
}
.disabled-input button, .disabled-input input {
	cursor: not-allowed !important;
}
.product-block-modified .productblock__addtocart button [data-text="Added"] {
	display: none;
}
.product-block-modified .productblock__addtocart-icon {
    padding: 10px 8px;
    height: unset;
    gap: 3px;
}
.product-block-modified .productblock__addtocart-icon:before {
    font-weight: 400 !important;
    font-size: 18px;
}
.product-block-modified .productblock__addtocart button {
    padding-left: 15px !important;
}
.product-block-modified .col-auto.pt-2.productblock__addtocart {
    padding-top: 0 !important;
}
.product-block-modified .productblock__addtocart-icon[data-icon-before]:before, .productblock__addtocart-icon [data-icon]:after {
    line-height: unset !important;
}
@media screen and (max-width: 767px) {
	.product-block-modified input.quantity-input {
    width: 44px;
	}
	.product-block-modified .quantity-selector {
    height: 41px;
	}
	.product-block-modified button.quantity-btn.increase-btn {
    width: 45px;
	}
	.product-block-modified button.quantity-btn.decrease-btn {
		width: 45px;
	}
}
@media screen and (max-width: 350px) {
	.product-block-modified input.quantity-input {
    width: 40px;
	}
	.product-block-modified button.quantity-btn.increase-btn {
    width: 41px;
	}
	.product-block-modified button.quantity-btn.decrease-btn {
		width: 41px;
	}
	.product-block-modified .productblock__addtocart button {
    padding-left: 12px !important;
	}
}
`;
        },
        mainJS: function () {
          let itemQuantity = 0;
          let itemTitle = "";
          let itemPrice = "";
          let itemOldPrice = "";

          let originalFetch = window.fetch;

          if (!window.fetchExecuted) {
            window.fetchExecuted = true;

            window.fetch = function () {
              const url = arguments[0] || "";
              if (url.includes("cart?_data")) {
                const options = arguments[1] || {};
                const payload = options.body;
                const headers = options.headers || {};
                if (headers["X-Internal-Request"] !== "true") {
                  const params = new URLSearchParams(payload);
                  const lineItems = params.get("lineItems");

                  if (lineItems) {
                    try {
                      const decodedLineItems = JSON.parse(
                        decodeURIComponent(lineItems)
                      );
                      const sku = decodedLineItems[0]?.sku;

                      waitForElement(
                        () => !!document.querySelector(".active-productblock"),
                        () => {
                          document
                            .querySelector(".active-productblock")
                            .setAttribute("data-sku", sku);
                          document
                            .querySelector(".active-productblock")
                            .classList.remove("active-productblock");
                        },
                        200
                      );
                    } catch (error) {
                      console.error("Failed to parse lineItems:", error);
                    }
                  }
                }
              }
              return originalFetch.apply(this, arguments).then((response) => {
                const headers = arguments[1]?.headers || {};

                if (headers["X-Internal-Request"] === "true") {
                  return response;
                }

                if (
                  response.url.includes("cart?_data=routes%2Fcart") &&
                  response.status === 200
                ) {
                  response
                    .clone()
                    .text()
                    .then((body) => {
                      if (isPLP())
                        checkResponse(response.url, response.status, body);
                    });
                }
                return response;
              });
            };
          }

          function checkResponse(url, status, response) {
            if (url.includes("cart?_data=routes%2Fcart") && status == 200) {
              try {
                const parsedData = JSON.parse(response);
                let sku;

                if (parsedData) {
                  if (parsedData.errors && parsedData.errors.length > 0) {
                    console.log("Errors:", parsedData.errors);
                  }

                  if (parsedData.value?.lineItems) {
                    try {
                      const lineItemsStr = parsedData.value.lineItems;
                      const lineItems = JSON.parse(lineItemsStr);

                      lineItems.forEach((item) => {
                        sku = item.sku;
                      });
                    } catch (lineItemError) {
                      console.error(
                        "Failed to parse lineItems JSON string:",
                        lineItemError
                      );
                    }
                  }

                  if (window.location.href.includes("/cart")) return;

                  const atcQuantity = document
                    .querySelector(`[data-sku="${sku}"]`)
                    ?.getAttribute("data-quantity");
                  const quantity = atcQuantity ? parseInt(atcQuantity) : 0;

                  addToCart({ sku: sku, quantity: quantity });
                }
              } catch (error) {
                console.error("Failed to parse cart response as JSON:", error);
              }
            }
          }

          function fixTotalPrice() {
            let totalPrice = 0;
            document
              .querySelectorAll(".cart-product-current-price")
              .forEach((item) => {
                const price = item.textContent;
                const priceValue = parseFloat(
                  price.replace("€", "").replace(",", ".").trim()
                );
                totalPrice += priceValue;
              });

            document.querySelector(".cart-total-amount strong").textContent =
              `€ ${totalPrice.toFixed(2).replace(".", ",")}`;
          }

          function handleCartPopUp() {
            function helperFunction(quantity) {
              waitForElement(
                () =>
                  document
                    .querySelector(".cart-products-section")
                    ?.textContent.includes(itemTitle),
                () => {
                  document
                    .querySelectorAll(".cart-product-details")
                    .forEach((item) => {
                      if (item.textContent.includes(itemTitle)) {
                        const parent = item.closest(".cart-product-item");
                        const quantityElement = parent.querySelector(
                          ".cart-product-quantity"
                        );
                        const priceCurrentElement = parent.querySelector(
                          ".cart-product-current-price"
                        );
                        const priceOldElement = parent.querySelector(
                          ".cart-product-original-price"
                        );
                        quantityElement.firstChild.nodeValue =
                          quantityElement.firstChild.nodeValue.replace(
                            /^\d+/,
                            itemQuantity + 1 + quantity
                          );
                        priceCurrentElement.textContent =
                          "€ " +
                          (itemPrice * (itemQuantity + 1 + quantity))
                            .toFixed(2)
                            .replace(".", ",");

                        if (itemOldPrice) {
                          priceOldElement.textContent =
                            "€ " +
                            (itemOldPrice * (itemQuantity + 1 + quantity))
                              .toFixed(2)
                              .replace(".", ",");
                        }

                        fixTotalPrice();
                      }
                    });
                }
              );
            }

            if (
              document
                .querySelector(".cart-products-section")
                ?.textContent.includes(itemTitle)
            ) {
              document
                .querySelectorAll(".cart-product-details")
                .forEach((item) => {
                  if (item.textContent.includes(itemTitle)) {
                    const parent = item.closest(".cart-product-item");
                    const quantityElement = parent.querySelector(
                      ".cart-product-quantity"
                    );
                    const quantity = parseFloat(
                      quantityElement.textContent.split("x")[0]
                    );
                    waitForElement(
                      () =>
                        document
                          .querySelector(".cart-products-section")
                          .textContent.includes("undefined"),
                      () => {
                        helperFunction(quantity);
                      }
                    );
                  }
                });
            } else {
              helperFunction(0);
            }
          }

          function addToCart({ sku, quantity }) {
            const url = "https://www.wovar.nl/cart?_data=routes%2Fcart";

            const lineItems = [
              {
                sku: sku,
                quantity: quantity,
                uomProperty: "",
              },
            ];

            const body = new URLSearchParams();
            body.append("_disabledReload", "NO");
            body.append("_action", "ADD");
            body.append("lineItems", JSON.stringify(lineItems));

            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Internal-Request": "true",
              },
              body: body.toString(),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
              })
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }

          function addQuantitySelector() {
            waitForElement(
              () =>
                document.querySelector(
                  ".productblock:not(.product-block-modified)"
                ),
              () => {
                if (!isPLP()) {
                  return;
                }
                document
                  .querySelectorAll(
                    ".productblock:not(.product-block-modified)"
                  )
                  .forEach((element) => {
                    element.classList.add("product-block-modified");

                    element.addEventListener("click", (e) => {
                      if (e.target.closest(".custom-quantity-selector")) {
                        e.preventDefault();
                        e.stopPropagation();
                        window._conv_q = window._conv_q || [];
                        _conv_q.push(["triggerConversion", "1004101976"]);
                      }
                    });

                    const atcElement = element.querySelector(
                      ".productblock__addtocart"
                    );

                    if (!atcElement) return;

                    // Initialize quantity state
                    let quantityChange = 1;

                    atcElement.addEventListener("click", (e) => {
                      if (
                        e.target
                          .closest(".productblock__addtocart")
                          ?.classList.contains("disabled-input")
                      ) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }

                      const productBlock = e.target.closest(".productblock");
                      const quantitySelector =
                        productBlock.querySelector(".quantity-selector");
                      const quantityInput =
                        quantitySelector.querySelector(".quantity-input");
                      const quantity = parseInt(quantityInput.value, 10);

                      productBlock.classList.add("active-productblock");

                      const productPrice = productBlock
                        .querySelector(".price")
                        .getAttribute("data-price")
                        .trim();

                      const productPriceOld = productBlock
                        .querySelector(".price-old")
                        ?.getAttribute("data-price")
                        .trim();

                      itemQuantity = quantity - 1;
                      productBlock.setAttribute("data-quantity", quantity - 1);
                      itemTitle = productBlock
                        .querySelector(".productblock__title")
                        .textContent.trim();
                      itemPrice = parseFloat(productPrice);
                      itemOldPrice = parseFloat(productPriceOld);

                      document
                        .querySelectorAll(
                          ".quantity-selector, .productblock__addtocart"
                        )
                        .forEach((item) => {
                          setTimeout(() => {
                            item.classList.add("disabled-input");
                          }, 100);
                        });

                      handleCartPopUp();

                      setTimeout(() => {
                        waitForElement(
                          () =>
                            !document
                              .querySelector(".cart-products-section")
                              .textContent.includes("undefined"),
                          () => {
                            document
                              .querySelectorAll(
                                ".quantity-selector, .productblock__addtocart"
                              )
                              .forEach((item) => {
                                item.classList.remove("disabled-input");
                              });
                            quantityInput.value = 1;
                            quantityChange = 1;
                          }
                        );
                      }, 500);
                    });

                    // Insert the quantity selector HTML
                    atcElement.insertAdjacentHTML(
                      "beforebegin",
                      `<div class="custom-quantity-selector">
													<div class="quantity-selector">
															<button type="button" class="quantity-btn decrease-btn">
																	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="3" viewBox="0 0 12 3" fill="none">
																			<path d="M0.281816 0.161206H11.931V2.37527H0.281816V0.161206Z" fill="#242223"/>
																	</svg>
															</button>
															<input 
																	name="quantity"
																	type="number" 
																	class="quantity-input" 
																	value="1"
																	min="1"
																	max="999"
															>
															<button type="button" class="quantity-btn increase-btn">
																	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
																			<path d="M7.37521 6.90339V11.0878H4.70411V6.90339H0.540051V4.25261H4.70411V0.0885502H7.37521V4.25261H11.5393V6.90339H7.37521Z" fill="#242223"/>
																	</svg>
															</button>
													</div>
											</div>`
                    );

                    // Get the newly created elements (scoped to this product block)
                    const quantitySelector =
                      element.querySelector(".quantity-selector");
                    const decreaseBtn =
                      quantitySelector.querySelector(".decrease-btn");
                    const increaseBtn =
                      quantitySelector.querySelector(".increase-btn");
                    const quantityInput =
                      quantitySelector.querySelector(".quantity-input");

                    // Utility functions
                    const updateDisplay = () => {
                      quantityInput.value = quantityChange;
                    };

                    const validateAndUpdateQuantity = () => {
                      const inputValue = parseInt(quantityInput.value, 10);

                      // Handle empty input or invalid values
                      if (isNaN(inputValue) || inputValue < 1) {
                        quantityChange = 1;
                      } else if (inputValue > 999) {
                        quantityChange = 999;
                      } else {
                        quantityChange = inputValue;
                      }

                      updateDisplay();
                    };

                    const decreaseQuantity = () => {
                      if (quantityChange > 1) {
                        quantityChange--;
                        updateDisplay();
                      }
                    };

                    const increaseQuantity = () => {
                      if (quantityChange < 999) {
                        quantityChange++;
                        updateDisplay();
                      }
                    };

                    // Event listeners
                    decreaseBtn.addEventListener("click", (e) => {
                      if (
                        e.target
                          .closest(".quantity-selector")
                          ?.classList.contains("disabled-input")
                      ) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      decreaseQuantity();
                    });
                    increaseBtn.addEventListener("click", (e) => {
                      if (
                        e.target
                          .closest(".quantity-selector")
                          ?.classList.contains("disabled-input")
                      ) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      increaseQuantity();
                    });
                    quantityInput.addEventListener("blur", (e) => {
                      if (
                        e.target
                          .closest(".quantity-selector")
                          ?.classList.contains("disabled-input")
                      ) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      validateAndUpdateQuantity();
                    });

                    // Handle keyboard navigation
                    quantityInput.addEventListener("keydown", (e) => {
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        increaseQuantity();
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        decreaseQuantity();
                      }
                    });
                  });
              }
            );
          }

          function applyTransformation() {
            addQuantitySelector();
            if (
              document.querySelector(
                "main:not(.product-block-modified-mutation-observer)"
              )
            ) {
              document
                .querySelector("main")
                .classList.add("product-block-modified-mutation-observer");
              new MutationObserver(() => {
                if (!isPLP()) return;
                addQuantitySelector();
              }).observe(document.querySelector("main"), {
                attributes: true,
                childList: true,
                subtree: true,
              });
            }
          }
          applyTransformation();
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

      if (document.body.classList.contains("ID21_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 5000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID21_variation_interval_flag");
      }, 25);
    }
  );
})();
