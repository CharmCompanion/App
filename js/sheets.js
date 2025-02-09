// Load saved sheets or initialize with default "New Sheet"
let sheets = JSON.parse(localStorage.getItem("sheets")) || { "New Sheet": [{ name: "Sheet1", celldata: [] }] };
let currentSheet = localStorage.getItem("currentSheet") || "New Sheet"; // Default to "New Sheet"

// Initialize Sheets Tab
function initSheets() {
    console.log("Initializing Sheets Tab");

    // Refresh the dropdown with saved sheets
    refreshSheetsDropdown();

    // Load the last active sheet or default to "New Sheet"
    initLuckysheet(sheets[currentSheet] || [{ name: "Sheet1", celldata: [] }]);

    // Attach button handlers
    document.getElementById("sheet-save-button").onclick = saveSheet;
    document.getElementById("sheet-delete-button").onclick = deleteSheet;
    document.getElementById("toggle-view").onclick = toggleView;

    // Attach dropdown handler
    document.getElementById("sheets-dropdown").onchange = switchSheet;

    // Clear the name input field
    document.getElementById("sheets-name-input").value = "";
}

// Save the current sheet's data
function saveCurrentSheetData() {
    console.log("Saving current sheet data...");
    const sheetData = luckysheet.getAllSheets(); // Get the current Luckysheet state
    sheets[currentSheet] = sheetData; // Save it to the sheets object
    saveSheetsToStorage(); // Persist changes to localStorage
}

// Save a new or edited sheet
function saveSheet() {
    const nameInput = document.getElementById("sheets-name-input");
    const dropdown = document.getElementById("sheets-dropdown");
    let name = nameInput.value.trim() || dropdown.value.trim();

    if (!name) {
        alert("Please enter a name!");
        return;
    }

    if (name === "New Sheet") {
        alert("You cannot overwrite the default sheet!");
        return;
    }

    // Save the current sheet's data before creating a new sheet
    saveCurrentSheetData();

    // Save the current sheet (placeholder for data saving)
    sheets[name] = sheets[currentSheet] || [{ name: "Sheet1", celldata: [] }]; // Clone current sheet data
    currentSheet = name;

    refreshSheetsDropdown();
    saveSheetsToStorage(); // Save to localStorage
    alert(`Sheet "${name}" saved successfully!`);
}

// Delete the currently selected sheet
function deleteSheet() {
    const dropdown = document.getElementById("sheets-dropdown");
    const name = dropdown.value.trim();

    if (!name || !sheets[name]) {
        alert("No sheet selected to delete!");
        return;
    }

    if (name === "New Sheet") {
        alert("You cannot delete the default sheet!");
        return;
    }

    // Save the current sheet's data before deletion
    saveCurrentSheetData();

    // Delete the selected sheet and reset to the default sheet
    delete sheets[name];
    currentSheet = "New Sheet";

    refreshSheetsDropdown();
    initLuckysheet(); // Reset Luckysheet
    saveSheetsToStorage(); // Save to localStorage
    alert(`Sheet "${name}" deleted successfully!`);
}

// Switch to another sheet
function switchSheet() {
    const dropdown = document.getElementById("sheets-dropdown");
    const name = dropdown.value.trim();

    // Save the current sheet's data before switching
    saveCurrentSheetData();

    // Reset to default if "New Sheet" is selected
    if (name === "New Sheet") {
        console.log("Switching to default sheet.");
        currentSheet = "New Sheet"; // Reset current sheet
        initLuckysheet([]); // Pass valid empty data for "New Sheet"
        return;
    }

    // Load the selected sheet's content
    currentSheet = name;
    initLuckysheet(sheets[name] || [{ name: "Sheet1", celldata: [] }]); // Load valid data or fallback to default structure
}

// Refresh the Sheets Dropdown
function refreshSheetsDropdown() {
    const dropdown = document.getElementById("sheets-dropdown");
    const nameInput = document.getElementById("sheets-name-input");
    dropdown.innerHTML = ""; // Clear existing options

    // Populate dropdown with sheets
    for (const name in sheets) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    }

    // Set the dropdown to the active sheet
    dropdown.value = currentSheet || "New Sheet"; // Ensure it defaults to "New Sheet"
    nameInput.value = ""; // Clear the name input field
}

// Save sheets to localStorage
function saveSheetsToStorage() {
    localStorage.setItem("sheets", JSON.stringify(sheets));
    localStorage.setItem("currentSheet", currentSheet);
}

// Initialize Luckysheet
function initLuckysheet(data = []) {
    console.log("Initializing Luckysheet");

    // Validate and provide properly formatted default data
    const sheetData = Array.isArray(data) && data.length > 0
        ? data
        : [{ name: "Sheet1", celldata: [] }]; // Default empty sheet structure

    luckysheet.create({
        container: "spreadsheet",
        showtoolbar: true,
        showinfobar: false,
        data: sheetData, // Ensure data is properly formatted
    });
}

// Attach functions to Window for Global Access
window.initSheets = initSheets;
window.saveSheet = saveSheet;
window.deleteSheet = deleteSheet;
window.switchSheet = switchSheet;

document.addEventListener("DOMContentLoaded", initSheets);
