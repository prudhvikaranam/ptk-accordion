const template = document.createElement("template");
let hasCustomArrows;
let showArrow;
let hideArrow;
template.innerHTML = `
<head>
    <link rel="stylesheet" href="accordion.css" />
   
</head>
<div class="ptk-accordion-container" id="ptk-accordion-container">
</div>`;
const accordionData =
  document.getElementById("ptk-accordion").dataset.accordion;
const convertedData = JSON.parse(JSON.parse(JSON.stringify(accordionData)));
const getAccordion = document.getElementById("ptk-accordion");
const showMultiple = getAccordion.getAttribute("showMultiple");

class ptfAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    if (this.getAttribute("toggleIcons") == "true") {
      hasCustomArrows = true;
      this.render();
    } else if (this.getAttribute("toggleIcons") == "false") {
      hasCustomArrows = false;
      this.render();
    } else {
      hasCustomArrows = false;
      this.render();
    }
    if (this.getAttribute("showDefaultAccordion")) {
      this.openDefault();
    }
  }

  openDefault() {
    const getDefaultAccordionIndex = +this.getAttribute("showDefaultAccordion");
    this.shadowRoot
      .querySelectorAll(".accordion-data")
      [getDefaultAccordionIndex].classList.add("active");
    this.shadowRoot.querySelectorAll("#togglers")[
      getDefaultAccordionIndex
    ].innerHTML = "Hide";
  }

  render() {
    convertedData.forEach((data, i) => {
      //Used for creating a the accordion along with the togglers.
      let createMultipleShowArrowSlots = getAccordion.appendChild(
        document.createElement("div")
      );
      createMultipleShowArrowSlots.setAttribute("slot", `showArrow ${i}`);

      createMultipleShowArrowSlots.innerHTML = this.getAttribute("showArrow");

      let createMultipleHideArrowSlots = getAccordion.appendChild(
        document.createElement("div")
      );
      createMultipleHideArrowSlots.setAttribute("slot", `hideArrow ${i}`);
      createMultipleHideArrowSlots.innerHTML = this.getAttribute("hideArrow");

      const accordion = document.createElement("div");
      accordion.classList = `accordion accordion-${i}`;
      accordion.id = `accordion`;
      accordion.innerHTML = `
            <div class="accordion-head" id="accordion-head">
              <span><h1 class="header">${data.headerName}</h1></span>
              <span class="togglers" id="togglers">Show</span>
            </div>
            <div class="accordion-data" id="accordion-data">
              <p class="data" id="data">${data.data}</p>
            </div>
        `;

      this.shadowRoot.appendChild(accordion);
    });

    this.shadowRoot.querySelectorAll("#togglers").forEach((toggler, i) => {
      // for toggling and changing the text/icons
      toggler.addEventListener("click", () => {
        let getSelectedAccordionData =
          this.shadowRoot.querySelectorAll(".accordion-data");
        let slots = document.getEle;
        getSelectedAccordionData.forEach((accData, j) => {
          if (j == i) {
            accData.classList.toggle("active");
            if (accData.classList.contains("active")) {
              this.shadowRoot.querySelectorAll("#togglers")[j].innerHTML =
                "Hide";
            } else {
              this.shadowRoot.querySelectorAll("#togglers")[j].innerHTML =
                "Show";
            }
          } else {
            accData.classList.remove("active");
            this.shadowRoot.querySelectorAll("#togglers")[j].innerHTML = "Show";
          }
        });
      });
    });
  }
}

window.customElements.define("ptk-accordion", ptfAccordion);
