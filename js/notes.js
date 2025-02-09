// Load saved notes or initialize with default "New Note"
let notes = JSON.parse(localStorage.getItem("notes")) || { "New Note": "" };
let currentNote = localStorage.getItem("currentNote") || "New Note"; // Default to "New Note"

// Initialize Notes Tab
function initNotes() {
    console.log("Initializing Notes Tab");

    // Refresh the dropdown with saved notes
    refreshNotesDropdown();

    // Ensure the text entry box is blank when "New Note" is selected
    if (currentNote === "New Note") {
        setEditorContent(""); // Explicitly clear the editor for "New Note"
    } else {
        setEditorContent(notes[currentNote] || ""); // Load content for saved notes
    }

    // Attach button handlers
    document.getElementById("save-button").onclick = saveNote;
    document.getElementById("delete-button").onclick = deleteNote;
    document.getElementById("toggle-view").onclick = toggleView;

    // Attach dropdown handler
    document.getElementById("notes-dropdown").onchange = switchNote;

    // Clear the name input field
    document.getElementById("notes-name-input").value = "";

    console.log(`Notes Tab initialized with currentNote: "${currentNote}"`);
}

// Save a new or edited note
function saveNote() {
    const nameInput = document.getElementById("notes-name-input");
    const notesEditor = document.getElementById("notes-editor");
    const dropdown = document.getElementById("notes-dropdown");
    let name = nameInput.value.trim();

    if (currentNote === "New Note") {
        // Handle "New Note" behavior
        if (!name) {
            // If no name is provided, generate a unique name (Note1, Note2, etc.)
            let noteNumber = 1;
            while (notes[`Note${noteNumber}`]) {
                noteNumber++;
            }
            name = `Note${noteNumber}`;
            console.log(`Generated new note name: "${name}"`);
        }

        // Save the content of the editor as a new note
        notes[name] = notesEditor.value;
        currentNote = name; // Set currentNote to the newly created note
    } else {
        // Handle existing note behavior
        if (!name) {
            // Save changes to the current note if no name is provided
            notes[currentNote] = notesEditor.value;
            console.log(`Updated note: "${currentNote}"`);
        } else if (name !== currentNote) {
            // Rename the note if a new name is provided
            notes[name] = notesEditor.value;
            delete notes[currentNote]; // Remove the old name
            currentNote = name;
            console.log(`Renamed note to: "${currentNote}"`);
        }
    }

    // Persist changes to localStorage
    saveNotesToStorage();

    // Refresh dropdown and reset inputs
    refreshNotesDropdown();
    document.getElementById("notes-name-input").value = "";
    alert(`Note "${currentNote}" saved successfully!`);
}

// Delete the currently selected note
function deleteNote() {
    const dropdown = document.getElementById("notes-dropdown");
    const name = dropdown.value.trim();

    if (!name || !notes[name]) {
        alert("No note selected to delete!");
        return;
    }

    if (name === "New Note") {
        alert("You cannot delete the default note!");
        return;
    }

    // Delete the selected note
    delete notes[name];
    currentNote = "New Note"; // Reset to default

    refreshNotesDropdown();
    setEditorContent(""); // Explicitly clear the editor to blank
    saveNotesToStorage(); // Save to localStorage
    alert(`Note "${name}" deleted successfully!`);
}

// Switch to another note
function switchNote() {
    const dropdown = document.getElementById("notes-dropdown");
    const name = dropdown.value.trim();

    // Reset to default if "New Note" is selected
    if (name === "New Note") {
        console.log("Switching to default note.");
        currentNote = "New Note"; // Reset current note
        setEditorContent(""); // Blank out the editor
        return;
    }

    // Load the selected note's content
    currentNote = name;
    setEditorContent(notes[name] || ""); // Load valid data or fallback to blank
}

// Refresh the Notes Dropdown
function refreshNotesDropdown() {
    const dropdown = document.getElementById("notes-dropdown");
    const nameInput = document.getElementById("notes-name-input");
    dropdown.innerHTML = ""; // Clear existing options

    // Populate dropdown with notes
    for (const name in notes) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    }

    // Set the dropdown to the active note
    dropdown.value = currentNote || "New Note"; // Ensure it defaults to "New Note"
    nameInput.value = ""; // Clear the name input field
}

// Save notes to localStorage
function saveNotesToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("currentNote", currentNote);
}

// Load content into the editor
function setEditorContent(content = "") {
    const notesEditor = document.getElementById("notes-editor");
    notesEditor.value = content; // Load content or blank
    console.log(content ? `Loaded content for note.` : "Editor cleared for 'New Note'");
}

// Switch to Sheets Page
function toggleView() {
    console.log("Toggling between Notes and Sheets View...");

    const notesContainer = document.getElementById("notes");
    const sheetsContainer = document.getElementById("sheets");

    if (notesContainer.classList.contains("active")) {
        // Hide notes and show sheets
        notesContainer.classList.remove("active");
        sheetsContainer.classList.add("active");
        initSheets(); // Initialize Sheets
    } else {
        // Hide sheets and show notes
        sheetsContainer.classList.remove("active");
        notesContainer.classList.add("active");
        initNotes(); // Initialize Notes
    }
}

// Attach functions to Window for Global Access
window.initNotes = initNotes;
window.saveNote = saveNote;
window.deleteNote = deleteNote;
window.switchNote = switchNote;
window.toggleView = toggleView;

document.addEventListener("DOMContentLoaded", initNotes);
