(function () {
  const config = {
    test_id: "ID31_variation_01",
    test_name: "ID31_Sticky_CTA_winkelwagen_pagina",
    selector: ".checkout__sticky",
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
    () => !!document.querySelector(config.selector),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(`.${config.test_id}`)) return;
          document.querySelector(config.selector).classList.add(config.test_id);

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
            .sticky-checkout-btn {
              background: #F5F5F5;
              padding: 14px 38px;
              position: fixed;
              bottom: 0;
              left: 0;
              margin: 0 !important;
            }
          `;
        },
        // mainJS: function () {
        //   console.log("== main js is running ==");

        //   const targetUrlPart = "/checkout?_data=routes%2Fcheckout"; // match the request you want to intercept
        //   const myArray = [{ id: "my-a", foo: "bar" }]; // the array you want to inject

        //   const origFetch = window.fetch; // keep original fetch around

        //   window.fetch = async function (input, init) {
        //     // call original fetch and get the response
        //     const response = await origFetch(input, init);

        //     try {
        //       // determine the URL string (input can be Request object or string)
        //       const url =
        //         typeof input === "string" ? input : (input && input.url) || "";

        //       // only target the specific request
        //       if (!url.includes(targetUrlPart)) return response;

        //       // ensure we can read the body as JSON
        //       const contentType = response.headers.get("content-type") || "";
        //       if (!contentType.includes("application/json")) return response;

        //       // clone the response so we can read its body without "consuming" the original
        //       const data = await response.clone().json();

        //       // === MUTATE THE JSON ===
        //       // Decide how the server returns data and insert your array where the page expects it.
        //       // Here are 3 common shapes and handling:
        //       if (Array.isArray(data)) {
        //         // case: top-level array [arr1, arr2, arr3] -> push your array as the 4th element
        //         data.push(myArray);
        //       } else if (data && Array.isArray(data.arrays)) {
        //         // case: { arrays: [arr1, arr2, arr3], ... } -> push into that named field
        //         data.arrays.push(myArray);
        //       } else {
        //         // fallback: attach a named field so you can find it in the page for debugging
        //         data.__injectedArray = myArray;
        //       }

        //       // create a new Response with the modified body so downstream code receives changed JSON
        //       const body = JSON.stringify(data);
        //       const headers = new Headers(response.headers);
        //       headers.set(
        //         "content-length",
        //         String(new TextEncoder().encode(body).length)
        //       );

        //       return new Response(body, {
        //         status: response.status,
        //         statusText: response.statusText,
        //         headers,
        //       });
        //     } catch (err) {
        //       console.error("Intercept error:", err);
        //       return response;
        //     }
        //   };
        // },

        mainJS: function () {
          fetch("https://www.wovar.nl/cart?_data=root", {
            method: "GET",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  "Network response was not ok: " + response.status
                );
              }
              return response.json();
            })
            .then((data) => {
              console.log(
                "== Returned JSON: ==",
                data.checkoutSimple.lineItems
              );
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        },

        handleClarityTracking: function () {
          function initMsClarityTracking() {
            waitForElement(
              () => !!window["clarity"],
              () => {
                window.clarity("set", "Exp_Name", config.test_name);
                window.clarity("set", "Var_Name", config.test_id);
              }
            );
          }
          initMsClarityTracking();
        },
      };

      echoVariation.init();

      if (document.body.classList.contains("ID31_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID31_variation_interval_flag");
      }, 25);
    }
  );
})();
