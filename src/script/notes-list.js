import notesData from './notes-data.js';

class NotesList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const sortBy = this.getAttribute('sort-by');
    this.render();
  }

  render() {
    const listContainer = document.createElement('div');
    listContainer.classList.add('notes-list-container');

    notesData.forEach(note => {
      const noteItem = this.createNoteElement(note);
      listContainer.appendChild(noteItem);
    });

    this.appendChild(listContainer);
  }

  addNoteToList(note) {
    const listContainer = this.querySelector('.notes-list-container');
    const noteItem = this.createNoteElement(note);
    listContainer.appendChild(noteItem);
  }

  createNoteElement(note) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    
    const words = note.body.split(' ');

    const bodyContent = words.map(word => {
        if (word.length > 60) { 
            const slicedWords = [];
            while (word.length > 60) {
                slicedWords.push(word.slice(0, 60));
                word = word.slice(60);
            }
            slicedWords.push(word);
            return slicedWords.join('<br>-');
        }
        return word;
    }).join(' ');

    noteItem.setAttribute('data-note-id', note.id);

    noteItem.innerHTML = `
      <h2>${note.title}</h2>
      <p>${bodyContent}</p>
      <div class="note-meta">
        <span class="created-at">${this.formatDate(note.createdAt)}</span><br>
        <span class="archive-info">${note.archived ? 'Sudah Diarsipkan' : 'Belum Diarsipkan'}</span>
      </div>
    `;
    
    return noteItem;
  }

  formatDate(dateString) {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('in-IN', { hour: '2-digit', minute: '2-digit' });
    const dayMonthYear = date.toLocaleDateString('in-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    return `${time}, ${dayMonthYear}`;
  }
}

customElements.define('notes-list', NotesList);
