class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header>
        <h1>Notes App</h1>
      </header>
    `;
  }
}

customElements.define('app-header', Header);
