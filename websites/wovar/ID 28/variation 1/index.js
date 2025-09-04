(function () {
  const config = {
    test_id: "ID28_variation",
    test_name: "ID28_Korte_omschrijving_PDP",
    selector: ".pros-cons-wrapper h2",
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
      !!document.querySelector(config.selector) &&
      !document.querySelector(`.${config.test_id}`) &&
      !!document.querySelector(".product-details-wrapper") &&
      !!document.querySelector(".container > .breadcrumbs > a:nth-child(2)") &&
      !!document
        .querySelector(".container > .breadcrumbs > a:nth-child(2)")
        .textContent.toLowerCase()
        .includes("schroeven"),
    () => {
      let echoVariation = {
        init: function () {
          if (document.querySelector(".id28-test-content")) return;

          document.querySelector(config.selector).classList.add(config.test_id);

          this.mainJS();
          this.mainCSS();
          this.handleClarityTracking();
        },
        mainCSS: function () {
          if (document.getElementById(config.test_id + "-style")) {
            return;
          }
          let styles = document.createElement("style");
          styles.setAttribute("type", "text/css");
          styles.setAttribute("id", config.test_id + "-style");
          document.head.appendChild(styles).textContent = `
            .pros-cons-wrapper h2.ID28_variation {
              display: none;
            }

            .id28-test-content-title {
              font-family: Lato;
              font-size: 18px;
              font-weight: 700;
              line-height: 14px;
              color: #000000;
            }
              
            .id28-test-content-description {
              font-family: Lato;
              font-size: 16px;
              font-weight: 700;
              line-height: 16px;
              color: #353535;
            }

            @media screen and (max-width: 991px) {
            .id28-test-content {
              margin-top: 2rem !important;
            }

            .id28-test-content-title {
              font-size: 16px;
              line-height: 100%;
            }
              
            .id28-test-content-description {
              font-size: 15px;
              line-height: 15px;
            }
            }
          `;
        },
        mainJS: function () {
          const id28TestContentData = {
            spaanplaatschroeven: {
              title: "Spaanplaatschroeven",
              description:
                "Multi-inzetbaar, ook bekend als universeelschroef. Onder andere voor spaanplaat, MDF, hout op hout of hout op metaal.",
            },
            vlonderschroeven: {
              title: "Vlonderschroeven",
              description:
                "Voor het monteren van hard- en zachthouten vlonderplanken en terrasdelen.",
            },
            tellerkopschroeven: {
              title: "Tellerkopschroeven",
              description:
                "Voor zware houtconstructies, balken en dragende verbindingen. Veelgebruikt bij overkappingen, schuren, blokhutten en veranda's.",
            },
            tuinschroeven: {
              title: "Tuinschroeven",
              description:
                "Universele buitenschroeven voor schuttingen, tuinhuizen en meubels van (steiger)hout.",
            },
            dakschroeven: {
              title: "Dakschroeven",
              description:
                "Voor het waterdicht bevestigen van dakplaten (golf- of dakpanplaat) of damwandplaten op hout of metaal.",
            },
            zelftappers: {
              title: "Zelftappers (plaatschroeven)",
              description:
                "Zelftappende schroef voor verbinden van metalen platen, metaal op hout en staal op staal.",
            },
            gipsplaatschroeven: {
              title: "Gipsplaatschroeven",
              description:
                "Voor montage van gipsplaten op houten of metalen profielen.",
            },
            isolatieschroeven: {
              title: "Isolatieschroeven",
              description:
                "Voor montage van harde isolatiematerialen zoals PIR- of steenwolplaten aan houten of metalen ondergronden.",
            },
            "kleurkopschroeven voor trespa® platen": {
              title: "Kleurkopschroeven voor Trespa®",
              description:
                "Voor zichtbare en stevige montage van Trespa® en HPL-platen op gevels.",
            },
            "rockpanel schroeven": {
              title: "Rockpanel schroeven",
              description:
                "Voor montage van Rockpanel gevel- of boeidelen aan voornamelijk houten panelen.",
            },
            glaslatschroeven: {
              title: "Glaslatschroeven",
              description:
                "Voor het splijtvrij bevestigen van glaslatten, plinten en kozijnlijsten op hout.",
            },
            stelschroeven: {
              title: "Stelschroeven",
              description:
                "Voor het exact afstellen en stevig verankeren van kozijnen, houten constructies of regelwerk.",
            },
            bolkopnagels: {
              title: "Bolkopschroeven",
              description:
                "Voor decoratieve en functionele montage van houten gevelbekleding met zichtbare bolkop. Ook voor zichtbare verbindingen binnen houtbewerking of meubelmontage.",
            },
            "kozijnschroeven en betonschroeven": {
              title: "Kozijn- en betonschroeven",
              description:
                "Voor sterke bevestiging van kozijnen of zware objecten, direct in steen of beton, zonder plug.",
            },
          };
          function applyTransformation() {
            console.log("== main js is running ===");
            let id28TestTitle = document
              .querySelector(".container > .breadcrumbs > a:nth-child(3)")
              .textContent.trim()
              .toLowerCase();

            let id28Testdescription = id28TestContentData[id28TestTitle];

            if (!id28Testdescription) return;

            const id28TestContent = `
              <div class="id28-test-content mt-2 mb-4">
                <h2 class="id28-test-content-title pb-3">${id28Testdescription.title}</h2>
                <p class="id28-test-content-description">${id28Testdescription.description}</p>
              </div>
            `;

            document
              .querySelector(config.selector)
              .insertAdjacentHTML("afterend", id28TestContent);
          }

          applyTransformation();

          // let lastUrl = location.href;
          // new MutationObserver(() => {
          //   const currentUrl = location.href;
          //   if (lastUrl !== currentUrl) {
          //     console.log("== url changed ==", currentUrl);

          //     lastUrl = currentUrl;
          //     waitForElement(
          //       () =>
          //         !!document.querySelector(config.selector) &&
          //         !document.querySelector(`.${config.test_id}`),
          //       () => {
          //         echoVariation.init();
          //       }
          //     );
          //   }
          // }).observe(document, { subtree: true, childList: true });
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

      if (document.body.classList.contains("ID25_variation_interval_flag")) {
        return;
      }

      const startTime = Date.now();
      const interval = setInterval(() => {
        if (Date.now() - startTime >= 3000) {
          clearInterval(interval);
          return;
        }
        echoVariation.init();
        document.body.classList.add("ID25_variation_interval_flag");
      }, 25);
    }
  );
})();
