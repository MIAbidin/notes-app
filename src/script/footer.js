class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <p>&copy; 2024 Muhammad Irfan Abidin</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', Footer);
