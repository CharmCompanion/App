import { fetchWithCors } from './cors_util.js';

document.addEventListener("DOMContentLoaded", function () {
    initializeHuntsPage();
});

function initializeHuntsPage() {
    const savedPage = localStorage.getItem("activePage") || "brothers";
    setupHuntsUI(savedPage);
}

// Handles the page switching logic
function setupHuntsUI(pageType) {
    const huntsContainer = document.getElementById("hunts");
    huntsContainer.innerHTML = `
        <div class="hunts-header">
            <h2 class="${pageType}-title">${pageType === "brothers" ? "Brothers" : "Sisters"}</h2>
        </div>
        <div class="hunts-controls">
            <button id="reset-hunts" class="reset-button">Clear</button>
            <button id="suggest-hunts" class="suggest-button">Guess</button>
            <button id="switch-hunts" class="switch-button">${pageType === "brothers" ? "Switch to Sisters" : "Switch to Brothers"}</button>
        </div>
        <div id="hunts-grid" class="${pageType}-grid"></div>
    `;

    document.getElementById("switch-hunts").addEventListener("click", () => switchHuntsPage());
    document.getElementById("reset-hunts").addEventListener("click", () => resetHuntsSelections());
    document.getElementById("suggest-hunts").addEventListener("click", () => generateHuntsSuggestion());

    if (pageType === "brothers") {
        renderHuntsGrid("brothers");
    } else {
        renderHuntsGrid("sisters");
    }
}

// Switches between Brothers and Sisters pages
function switchHuntsPage() {
    const newPage = localStorage.getItem("activePage") === "brothers" ? "sisters" : "brothers";
    localStorage.setItem("activePage", newPage);
    setupHuntsUI(newPage);
}

// Clears the selections for the active page
function resetHuntsSelections() {
    localStorage.removeItem(`huntsData_${localStorage.getItem("activePage")}`);
    setupHuntsUI(localStorage.getItem("activePage"));
}

// Generates the suggested mod loadout based on logic
function generateHuntsSuggestion() {
    const activePage = localStorage.getItem("activePage");
    const grid = document.getElementById("hunts-grid");
    const rows = grid.querySelectorAll(".hunts-row");

    rows.forEach((row, index) => {
        const slot1 = row.children[0];
        const slot2 = row.children[1];
        const slot3 = row.children[2];

        if (index === 0) {
            slot1.dataset.mod = "FirstMod";
            slot2.dataset.mod = "Oull";
            slot3.dataset.mod = "SecondMod";
        } else if (index === 1) {
            slot1.dataset.mod = "Oull";
            slot2.dataset.mod = "FirstMod";
            slot3.dataset.mod = "SecondMod";
        } else if (index === 2) {
            slot1.dataset.mod = "Oull";
            slot2.dataset.mod = "SecondMod";
            slot3.dataset.mod = "FirstMod";
        } else if (index === 3) {
            slot1.dataset.mod = "SecondMod";
            slot2.dataset.mod = "Oull";
            slot3.dataset.mod = "FirstMod";
        }

        updateHuntsGridState();
    });
}

// Populates the grid with selectable mod slots
function renderHuntsGrid(pageType) {
    const huntsGrid = document.getElementById("hunts-grid");
    huntsGrid.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const row = document.createElement("div");
        row.classList.add("hunts-row");
        row.innerHTML = `
            <div class="hunts-slot" data-row="${i}" data-mod=""></div>
            <div class="hunts-slot" data-row="${i}" data-mod=""></div>
            <div class="hunts-slot" data-row="${i}" data-mod=""></div>
        `;
        huntsGrid.appendChild(row);
    }

    loadHuntsGridState();
}

// Saves the current state of selections to localStorage
function updateHuntsGridState() {
    const gridData = [];
    document.querySelectorAll(".hunts-row").forEach(row => {
        const rowData = [];
        row.querySelectorAll(".hunts-slot").forEach(slot => {
            rowData.push(slot.dataset.mod);
        });
        gridData.push(rowData);
    });
    localStorage.setItem(`huntsData_${localStorage.getItem("activePage")}`, JSON.stringify(gridData));
}

// Loads the saved grid state from localStorage
function loadHuntsGridState() {
    const savedData = JSON.parse(localStorage.getItem(`huntsData_${localStorage.getItem("activePage")}`) || "[]");
    if (savedData.length > 0) {
        document.querySelectorAll(".hunts-row").forEach((row, rowIndex) => {
            row.querySelectorAll(".hunts-slot").forEach((slot, colIndex) => {
                slot.dataset.mod = savedData[rowIndex][colIndex] || "";
            });
        });
    }
}
