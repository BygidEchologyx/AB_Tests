(function () {
  const config = {
    test_id: "ID25_variation",
    test_name: "ID25-Informatie-schroeven-cat-pagina",
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
          if (document.querySelector(".id25-container")) return;

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
            .webshop-category-list .text-center.mb-3 {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .webshop-category-list .text-center.mb-3 h1 {
              padding-bottom: unset;  
              margin-bottom: 0.2rem !important;
            }

            .overflow-hide {
              overflow: hidden !important;
            }
            
            .id25-container {
              margin: 0 auto;
              position: relative;
              display: flex;
            }

            .modal-backdrop {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0,0,0,0.5); /* shady background */
              z-index: 99;
            }

            .modal-25 {
              display: none;
              flex-direction: column;
              justify-content: start;
              align-items: center;
              margin-top: 5px;
              animation: modalSlideIn 0.3s ease-out;
              position: absolute;
              top: 40px !important;
              left: -90px;
              height: 395px !important;
              width: 482px;
              background: white;
              z-index: 100;
            }

            .modal-backdrop.active,
            .modal-25.active {
              display: flex;
            }
            
            @keyframes modalSlideIn {
              from {
                  transform: translateY(-20px);
                  opacity: 0;
              }
              to {
                  transform: translateY(0);
                  opacity: 1;
              }
            }

            .modal-trigger-button {
              margin-bottom: 2rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 5px;
              position: relative;
            }
            .modal-trigger-button-text {
              font-family: Poppins;
              font-weight: 400;
              font-size: 15px;
              text-decoration: underline;
            }

            .close-button {
              position: absolute;
              top: 20px;
              right: 25px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .modal-arrow {
              position: absolute;
              top: -20px;
              left: 117px;
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 9px solid transparent;
              border-bottom: 20px solid white;
              z-index: 1001;
            }

            .modal-content {
              width: 100%;
              height: 335px;
              overflow-y: auto;
              padding: 0 30px 0 30px;
              margin-top: 30px;
              line-height: 16px;
            }

            .modal-list-item {
              display: flex;
              flex-direction: column;
              align-items: start;
              margin-bottom: 15px;
              gap: 2px;
            }

            .modal-list-item:last-child {
              margin-bottom: unset;
            }

            .modal-list-item-title {
              font-family: Lato;
              font-weight: 700;
              font-size: 14px;
            }
            .modal-list-item-description {
              display: flex;
              justify-items: start;
              margin-left: 7px;
              gap: 7px;
            }
            .modal-list-item-description-bullet {
              margin-top: 5px;
              background-color: black;
              max-width: 5px !important;
              height: 5px !important;
              border-radius: 50%;
              flex: 5%;
            }
            .modal-list-item-description-text {
              font-family: Lato;
              font-weight: 400;
              font-size: 14px;
              text-align: start;
            }

            @media screen and (max-width: 575px) {
              .modal-25 {
                max-width: 345px;
                max-height: 335px;
                left: -55px;
              }
              .modal-list-item-title {
                font-size: 13px;
              }

              .modal-list-item-description-text {
                font-size: 13px;
              }

              .modal-content {
                height: 288px;
                padding: 0 10px 0 20px;
                margin-top: 26px;
              }

              .close-button {
                top: 12px;
                right: 12px;
              }
              
              .modal-arrow {
                top: -18px;
                left: 75px;
              }
            }

            @media screen and (min-width: 400px) and (max-width: 575px) {
              .modal-25 {
                max-height: 380px;
              }

              .modal-content {
                height: 325px;
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
              !document.querySelector(".id25-container")
            );
          }

          function checkNonEligibility() {
            const heading = getCategoryHeading();
            return (
              heading &&
              !heading.textContent.includes("Schroeven") &&
              document.querySelector(".id25-container")
            );
          }

          const modalData = [
            {
              title: "Spaanplaatschroeven",
              description:
                "Multi-inzetbaar, ook bekend als universeelschroef. Onder andere voor spaanplaat, MDF, hout op hout of hout op metaal.",
            },
            {
              title: "Vlonderschroeven",
              description:
                "Voor het monteren van hard- en zachthouten vlonderplanken en terrasdelen.",
            },
            {
              title: "Tellerkopschroeven",
              description:
                "Voor zware houtconstructies, balken en dragende verbindingen. Veelgebruikt bij overkappingen, schuren, blokhutten en veranda's.",
            },
            {
              title: "Tuinschroeven",
              description:
                "Universele buitenschroeven voor schuttingen, tuinhuizen en meubels van (steiger)hout.",
            },
            {
              title: "Dakschroeven",
              description:
                "Voor het waterdicht bevestigen van dakplaten (golf- of dakpanplaat) of damwandplaten op hout of metaal.",
            },
            {
              title: "Zelftappers (plaatschroeven)",
              description:
                "Zelftappende schroef voor verbinden van metalen platen, metaal op hout en staal op staal.",
            },
            {
              title: "Gipsplaatschroeven",
              description:
                "Voor montage van gipsplaten op houten of metalen profielen.",
            },
            {
              title: "Isolatieschroeven",
              description:
                "Voor montage van harde isolatiematerialen zoals PIR- of steenwolplaten aan houten of metalen ondergronden.",
            },
            {
              title: "Kleurkopschroeven voor Trespa®",
              description:
                "Voor zichtbare en stevige montage van Trespa® en HPL-platen op gevels.",
            },
            {
              title: "Rockpanel schroeven",
              description:
                "Voor montage van Rockpanel gevel- of boeidelen aan voornamelijk houten panelen.",
            },
            {
              title: "Glaslastschroeven",
              description:
                "Voor het splijtvrij bevestigen van glaslatten, plinten en kozijnlijsten op hout.",
            },
            {
              title: "Stelschroeven",
              description:
                "Voor het exact afstellen en stevig verankeren van kozijnen, houten constructies of regelwerk.",
            },
            {
              title: "Bolkopschroeven",
              description:
                "Voor decoratieve en functionele montage van houten gevelbekleding met zichtbare bolkop. Ook voor zichtbare verbindingen binnen houtbewerking of meubelmontage.",
            },
            {
              title: "Kozijn- en betonschroeven",
              description:
                "Voor sterke bevestiging van kozijnen of zware objecten, direct in steen of beton, zonder plug.",
            },
          ];

          function renderPopupModal() {
            const heading = getCategoryHeading();
            if (!heading) return;

            const html = `
              <div class='id25-container'>
                <button class="modal-trigger-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                    <path fill="#666666" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/>
                  </svg>
                  <span class="modal-trigger-button-text">Welke schroef heb ik nodig?</span>
                </button>

                <div class="modal-backdrop"></div>

                <div class="modal-25">
                  <div class="modal-arrow"></div>
                  <button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <g clip-path="url(#clip0_32_9966)">
                      <path d="M8 2C9.72391 2 11.3772 2.68482 12.5962 3.90381C13.8152 5.12279 14.5 6.77609 14.5 8.5C14.5 10.2239 13.8152 11.8772 12.5962 13.0962C11.3772 14.3152 9.72391 15 8 15C6.27609 15 4.62279 14.3152 3.40381 13.0962C2.18482 11.8772 1.5 10.2239 1.5 8.5C1.5 6.77609 2.18482 5.12279 3.40381 3.90381C4.62279 2.68482 6.27609 2 8 2ZM8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5ZM5.21875 5.71875C4.925 6.0125 4.925 6.4875 5.21875 6.77812L6.9375 8.49687L5.21875 10.2156C4.925 10.5094 4.925 10.9844 5.21875 11.275C5.5125 11.5656 5.9875 11.5687 6.27812 11.275L7.99687 9.55625L9.71562 11.275C10.0094 11.5687 10.4844 11.5687 10.775 11.275C11.0656 10.9812 11.0687 10.5062 10.775 10.2156L9.05625 8.49687L10.775 6.77812C11.0687 6.48438 11.0687 6.00938 10.775 5.71875C10.4812 5.42812 10.0062 5.425 9.71562 5.71875L7.99687 7.4375L6.27812 5.71875C5.98438 5.425 5.50938 5.425 5.21875 5.71875Z" fill="#353535"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_32_9966">
                      <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </button>
                    
                  <div class="modal-content">
                    ${modalData
                      .map(
                        (item) => `
                      <div class="modal-list-item">
                        <span class="modal-list-item-title">${item.title}</span>
                        <span class="modal-list-item-description">
                          <span class="modal-list-item-description-bullet"></span>
                          <span class="modal-list-item-description-text">${item.description}</span>
                        </span>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </div>
              </div>
            `;
            heading.insertAdjacentHTML("afterend", html);

            const triggerButton = document.querySelector(
              ".modal-trigger-button"
            );
            const targetModal = document.querySelector(".modal-25");
            const backdrop = document.querySelector(".modal-backdrop");
            const closeButton = document.querySelector(".close-button");

            function openModal() {
              targetModal.classList.add("active");
              backdrop.classList.add("active");
              document.body.classList.add("overflow-hide");
            }

            function closeModal() {
              targetModal.classList.remove("active");
              backdrop.classList.remove("active");
              document.body.classList.remove("overflow-hide");
            }

            // Event listeners
            triggerButton.addEventListener("click", function (e) {
              openModal();
            });

            closeButton.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              closeModal();
            });

            backdrop.addEventListener("click", () => closeModal());

            const modalContent = document.querySelector(".modal-25");
            modalContent.addEventListener("click", function (e) {
              e.stopPropagation();
            });

            document.addEventListener("keydown", function (event) {
              if (
                event.key === "Escape" &&
                targetModal.classList.contains("active")
              ) {
                closeModal();
              }
            });

            document.addEventListener("click", function (e) {
              const modalContainer = document.querySelector(".id25-container");
              const isClickInsideModal =
                modalContainer && modalContainer.contains(e.target);

              if (
                !isClickInsideModal &&
                targetModal.classList.contains("active")
              ) {
                closeModal();
              }
            });
          }

          function applyTransformation() {
            waitForElement(checkEligibility, () => {
              console.log("== should be added ==");
              renderPopupModal();
            });

            waitForElement(
              checkNonEligibility,
              () => {
                console.log("== should be removed ==");
                document.querySelector(".id25-container")?.remove();
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
