import notesData from './notes-data.js';

class AddNoteForm extends HTMLElement {
  constructor() {
    super();
    
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal" id="add-note-modal">
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <form id="add-note-form">
            <h2>Catat Sesuatu</h2>
            <input type="text" id="note-title" placeholder="Judul" required>
            <div class="error" id="title-error"></div>
            <textarea id="note-body" placeholder="Isi Catatan" required></textarea>
            <div class="error" id="body-error"></div>
            <button type="submit">Tambah Catatan</button>
          </form>
        </div>
      </div>
    `;

    const closeButton = this.querySelector('.close-button');
    closeButton.addEventListener('click', this.closeModal.bind(this));

    const form = this.querySelector('#add-note-form');
    form.addEventListener('submit', this.handleSubmit.bind(this));

    const titleInput = this.querySelector('#note-title');
    titleInput.addEventListener('input', this.validateTitle.bind(this));

    const bodyInput = this.querySelector('#note-body');
    bodyInput.addEventListener('input', this.validateBody.bind(this));
  }

  showModal() {
    const modal = this.querySelector('#add-note-modal');
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = this.querySelector('#add-note-modal');
    modal.style.display = 'none';
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateTitle() && this.validateBody()) {
      const title = this.querySelector('#note-title').value;
      const body = this.querySelector('#note-body').value;
      const createdAt = new Date().toISOString();
      const archived = false;

      const newNote = {
        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        body: body,
        createdAt: createdAt,
        archived: archived,
      };

      const notesList = document.querySelector('notes-list');
      notesList.addNoteToList(newNote);

      this.closeModal();

      event.target.reset();
    }
  }

  validateTitle() {
    const titleInput = this.querySelector('#note-title');
    const titleError = this.querySelector('#title-error');
    const titleValue = titleInput.value.trim();

    if (titleValue === '') {
      titleError.textContent = 'Judul tidak boleh kosong!';
      return false;
    }

    if (titleValue.length < 2) {
      titleError.textContent = 'Judul harus memiliki minimal 2 karakter!';
      return false;
    }

    const isTitleExists = notesData.some(note => note.title.toLowerCase() === titleValue.toLowerCase());
    if (isTitleExists) {
      titleError.textContent = 'Judul sudah digunakan, gunakan judul yang berbeda!';
      return false;
    }

    titleError.textContent = '';
    return true;
  }


  validateBody() {
    const bodyInput = this.querySelector('#note-body');
    const bodyError = this.querySelector('#body-error');
    const bodyValue = bodyInput.value.trim();

    if (bodyValue === '') {
      bodyError.textContent = 'Isi catatan tidak boleh kosong!';
      return false;
    } else {
      bodyError.textContent = '';
      return true;
    }
  }
}

customElements.define('add-note-form', AddNoteForm);
