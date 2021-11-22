const template = document.createElement("template");
const getAccordion = document.getElementById("ptk-accordion"); //get the tag from HTML
const accordionData = getAccordion.dataset.accordion; // get the data from html tag
const convertedData = JSON.parse(JSON.parse(JSON.stringify(accordionData))); // convert data to array

let getDefaultAccordionValue; //hold the default accordion value
if (getAccordion.hasAttribute("showDefaultAccordionIndex")) {
  getDefaultAccordionValue = getAccordion
    .getAttribute("showDefaultAccordionIndex")
    .trim();
}

let showMultiple; //hold the default accordion value
if (getAccordion.hasAttribute("showMultiple")) {
  showMultiple = getAccordion.getAttribute("showMultiple");
}
let noTogglers = false;
if (getAccordion.hasAttribute("noTogglers")) {
  noTogglers = true;
}

let hasCustomToggleIcons;
let showArrow;
let hideArrow;

template.innerHTML = `
<head>
    <link rel="stylesheet" href="accordion.css" />
   
</head>
<div class="ptk-accordion-container" id="ptk-accordion-container">
</div>`;

class ptfAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.getAttribute("toggleIcons") == "true") {
      hasCustomToggleIcons = true;
      this.render();
    } else if (this.getAttribute("toggleIcons") == "false") {
      hasCustomToggleIcons = false;
      this.render();
    } else {
      hasCustomToggleIcons = false;
      this.render();
    }
    if (getDefaultAccordionValue) {
      this.openDefault();
    } else if (getDefaultAccordionValue == "") {
      console.warn(
        `Warning: showDefaultAccordionIndex attribute has be defined but no value has been assigned`
      );
    }
  }

  openDefault() {
    const getDefaultAccordionIndex = +this.getAttribute(
      "showDefaultAccordionIndex"
    );
    this.shadowRoot
      .querySelectorAll(".accordion-data")
      [getDefaultAccordionIndex].classList.add("active");
    this.shadowRoot.querySelectorAll("#togglers")[
      getDefaultAccordionIndex
    ].innerHTML = hasCustomToggleIcons
      ? `<slot name= 'hideArrow 0'></slot>`
      : `Hide`;
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
              <span class="togglers" id="togglers">${
                hasCustomToggleIcons
                  ? `<slot name= 'showArrow ${i}'></slot>`
                  : `Show`
              } </span>
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
        if (showMultiple && showMultiple == "true") {
          // if show Multiple
          if (getSelectedAccordionData[i].classList.contains("active")) {
            getSelectedAccordionData[i].classList.remove("active");
            this.shadowRoot.querySelectorAll("#togglers")[i].innerHTML =
              hasCustomToggleIcons
                ? `<slot name= 'showArrow ${i}'></slot>`
                : `Show`;
          } else {
            getSelectedAccordionData[i].classList.add("active");
            this.shadowRoot.querySelectorAll("#togglers")[i].innerHTML =
              hasCustomToggleIcons
                ? `<slot name= 'hideArrow ${i}'></slot>`
                : `Hide`;
          }
        } else {
          // Show only one at a time
          getSelectedAccordionData.forEach((accData, j) => {
            if (j == i) {
              accData.classList.toggle("active");
              if (accData.classList.contains("active")) {
                this.shadowRoot.querySelectorAll("#togglers")[j].innerHTML =
                  hasCustomToggleIcons
                    ? `<slot name= 'hideArrow ${i}'></slot>`
                    : `Hide`;
              } else {
                this.shadowRoot.querySelectorAll("#togglers")[j].innerHTML =
                  hasCustomToggleIcons
                    ? `<slot name= 'showArrow ${i}'></slot>`
                    : `Show`;
              }
            } else {
              accData.classList.remove("active");
              this.shadowRoot.querySelectorAll("#togglers")[j].innerHTML =
                hasCustomToggleIcons
                  ? `<slot name= 'showArrow ${j}'></slot>`
                  : `Show`;
            }
          });
        }
      });
    });
  }
}

window.customElements.define("ptk-accordion", ptfAccordion);
