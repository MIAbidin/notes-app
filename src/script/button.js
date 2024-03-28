const addNoteButton = document.getElementById('add-note-button');

addNoteButton.addEventListener('click', () => {
    const addNoteForm = document.getElementById('add-note-modal');

    if (addNoteForm.style.display === 'none' || !addNoteForm.style.display) {
        addNoteForm.style.display = 'block';
    } else {
        addNoteForm.style.display = 'none';
    }
});