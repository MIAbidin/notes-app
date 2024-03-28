class SearchComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div id="search-bar">
            <input type="text" id="search-input" placeholder="Search...">
            <span id="search-icon" class="fas fa-search"></span>
        </div>
    `;

    const searchInput = this.querySelector('#search-input');
    searchInput.addEventListener('input', this.handleInput.bind(this));

    const searchIcon = this.querySelector('#search-icon');
    searchIcon.addEventListener('click', this.handleSearch.bind(this));
  }

  handleInput() {
    const searchInput = this.querySelector('#search-input').value.trim().toLowerCase();
    const notesList = document.querySelectorAll('.note-item');

    notesList.forEach(note => {
      const title = note.querySelector('h2').textContent.toLowerCase();
      if (title.includes(searchInput)) {
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
    });
  }

  handleSearch() {
    const searchInput = this.querySelector('#search-input').value.trim().toLowerCase();
    const notesList = document.querySelectorAll('.note-item');

    notesList.forEach(note => {
      const title = note.querySelector('h2').textContent.toLowerCase();
      if (title.includes(searchInput)) {
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
    });
  }
}

customElements.define('search-component', SearchComponent);
