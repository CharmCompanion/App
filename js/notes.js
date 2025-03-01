document.addEventListener("DOMContentLoaded", function () {
    const noteDropdown = document.getElementById("note-select");
    const noteTitle = document.getElementById("note-title");
    const noteContent = document.getElementById("note-content");
    const saveButton = document.getElementById("save-note");
    const deleteButton = document.getElementById("delete-note");

    if (!noteContent) {
        console.error("Note content element not found.");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("savedNotes")) || {};
    let currentNote = "Notes1";

    function saveNote() {
        notes[currentNote] = noteContent.value;
        localStorage.setItem("savedNotes", JSON.stringify(notes));
    }

    function loadNote() {
        noteTitle.value = currentNote;
        noteContent.value = notes[currentNote] || "";
    }

    function updateNoteList() {
        noteDropdown.innerHTML = "";
        Object.keys(notes).forEach(note => {
            let option = document.createElement("option");
            option.value = note;
            option.textContent = note;
            noteDropdown.appendChild(option);
        });
        noteDropdown.value = currentNote;
    }

    if (noteDropdown) {
        noteDropdown.addEventListener("change", function () {
            currentNote = this.value;
            loadNote();
        });
    }

    if (saveButton) {
        saveButton.addEventListener("click", function () {
            const newTitle = noteTitle.value.trim();
            if (newTitle) {
                notes[newTitle] = notes[currentNote] || "";
                if (newTitle !== currentNote) {
                    delete notes[currentNote];
                    currentNote = newTitle;
                }
                saveNote();
                updateNoteList();
            }
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            delete notes[currentNote];
            localStorage.setItem("savedNotes", JSON.stringify(notes));
            currentNote = Object.keys(notes)[0] || "Notes1";
            loadNote();
            updateNoteList();
        });
    }

    updateNoteList();
    loadNote();
});
