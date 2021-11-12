const template = document.createElement("template");
let hasCustomArrows;
let showArrow;
let hideArrow;
template.innerHTML = `
<head>
    <link rel="stylesheet" href="accordian.css" />
   
</head>
<div class="ptk-accordian-container" id="ptk-accordian-container">
</div>`;
const accordianData =
  document.getElementById("ptk-accordian").dataset.accordian;
const convertedData = JSON.parse(JSON.parse(JSON.stringify(accordianData)));
const getAccordian = document.getElementById("ptk-accordian");
const showMultiple = getAccordian.getAttribute("showMultiple");

class ptfAccordian extends HTMLElement {
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
  }
  render() {
    convertedData.forEach((data, i) => {
      //Used for creating a the accordion along with the togglers.
      let createMultipleShowArrowSlots = getAccordian.appendChild(
        document.createElement("div")
      );
      createMultipleShowArrowSlots.setAttribute("slot", `showArrow ${i}`);

      createMultipleShowArrowSlots.innerHTML = this.getAttribute("showArrow");

      let createMultipleHideArrowSlots = getAccordian.appendChild(
        document.createElement("div")
      );
      createMultipleHideArrowSlots.setAttribute("slot", `hideArrow ${i}`);
      createMultipleHideArrowSlots.innerHTML = this.getAttribute("hideArrow");

      const accordian = document.createElement("div");
      accordian.classList = `accordian accordian-${i}`;
      accordian.id = `accordian`;
      accordian.innerHTML = `
            <div class="accordian-head" id="accordian-head">
              <span><h1 class="header">${data.headerName}</h1></span>
              <span class="togglers" id="togglers">Show</span>
            </div>
            <div class="accordian-data" id="accordian-data">
              <p class="data" id="data">${data.data}</p>
            </div>
        `;

      this.shadowRoot.appendChild(accordian);
    });

    this.shadowRoot.querySelectorAll("#togglers").forEach((toggler, i) => {
      toggler.addEventListener("click", () => {
        let getSelectedAccordianData =
          this.shadowRoot.querySelectorAll(".accordian-data");
        let getButtonContent = this.shadowRoot.querySelectorAll("#togglers")[i];
        getSelectedAccordianData.forEach((accData, j) => {
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

window.customElements.define("ptk-accordian", ptfAccordian);
