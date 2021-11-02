const template = document.createElement("template");
template.innerHTML = `
<head>
    <link rel="stylesheet" href="accordian.css" />
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
    let a = 0;
    convertedData.forEach((data, i) => {
      a = i;
      const accordian = document.createElement("div");
      accordian.classList = `accordian accordian-${i}`;
      accordian.id = `accordian`;
      accordian.innerHTML = `
            <div class="accordian-head" id="accordian-head">
              <span><h1 class="header">${data.headerName}</h1></span>
              <span class="toggleData" id="toggleData">Show</span>
            </div>
            <div class="accordian-data" id="accordian-data">
              <p class="data" id="data">${data.data}</p>
            </div>
        `;

      this.shadowRoot
        .getElementById("ptk-accordian-container")
        .appendChild(accordian);
    });
    this.shadowRoot.querySelectorAll("#toggleData").forEach((data, i) => {
      data.addEventListener("click", () => {
        const getDataClass =
          this.shadowRoot.querySelectorAll("#accordian-data")[i].classList;
        let getButtonContent =
          this.shadowRoot.querySelectorAll("#toggleData")[i];

        if (getDataClass.contains("show")) {
          getDataClass.remove("show");
          getButtonContent.innerHTML = "Show";
        } else {
          getDataClass.add("show");
          getButtonContent.innerHTML = "Hide";
        }
      });
    });
  }
}

window.customElements.define("ptk-accordian", ptfAccordian);

