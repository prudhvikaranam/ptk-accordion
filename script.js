const template = document.createElement("template");
template.innerHTML = `
<head>
    <style> 

    </style>
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
    convertedData.forEach((data, i) => {
      const accordian = document.createElement("div");
      accordian.classList = `accordian accordian-${i}`;
      accordian.id = `accordian`;
      console.log(accordian);
      accordian.innerHTML = `
            <h1>${data.headerName}</h1>
            <p>${data.data}</p>
        `;
      this.shadowRoot
        .getElementById("ptk-accordian-container")
        .appendChild(accordian);
    });
  }
}

window.customElements.define("ptk-accordian", ptfAccordian);
