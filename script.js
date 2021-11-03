const template = document.createElement("template");
let hasCustomArrows;
let showArrow;
let hideArrow;
template.innerHTML = `
<head>
    <link rel="stylesheet" href="accordian.css" />
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
  />
</head>
<div class="ptk-accordian-container" id="ptk-accordian-container">
</div>`;
const accordianData =
  document.getElementById("ptk-accordian").dataset.accordian;
const convertedData = JSON.parse(JSON.parse(JSON.stringify(accordianData)));

class ptfAccordian extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    console.log(this.querySelector("#showArrow"));
    showArrow = this.querySelector("#showArrow").innerHTML;
    if (this.getAttribute("addToggleArrows") == "true") {
      hasCustomArrows = true;
      this.render();
    } else if (this.getAttribute("addToggleArrows") == "false") {
      hasCustomArrows = false;
      this.render();
    } else {
      hasCustomArrows = false;
      this.render();
    }
  }
  render() {
    convertedData.forEach((data, i) => {
      const accordian = document.createElement("div");
      accordian.classList = `accordian accordian-${i}`;
      accordian.id = `accordian`;
      accordian.innerHTML = `
            <div class="accordian-head" id="accordian-head">
              <span><h1 class="header">${data.headerName}</h1></span>
              ${
                hasCustomArrows
                  ? `<span class="toggleData" id="toggleData"> <i class="fa fa-angle-down custom"></i></span>`
                  : `<span class="toggleData" id="toggleData">Show</span>`
              }
            </div>
            <div class="accordian-data" id="accordian-data">
              <p class="data" id="data">${data.data}</p>
            </div>
        `;

      this.shadowRoot.appendChild(accordian);
    });
    this.shadowRoot.querySelectorAll("#toggleData").forEach((data, i) => {
      data.addEventListener("click", () => {
        const getDataClass =
          this.shadowRoot.querySelectorAll("#accordian-data")[i].classList;
        let getButtonContent =
          this.shadowRoot.querySelectorAll("#toggleData")[i];

        if (getDataClass.contains("show")) {
          getDataClass.remove("show");
          getButtonContent.innerHTML = hasCustomArrows
            ? ' <i class="fa fa-angle-down custom"></i>'
            : "Show";
        } else {
          getDataClass.add("show");
          getButtonContent.innerHTML = hasCustomArrows
            ? '<i class="fa fa-angle-up custom"></i>'
            : "Hide";
        }
      });
    });
  }
}

window.customElements.define("ptk-accordian", ptfAccordian);
