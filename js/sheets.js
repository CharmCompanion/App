document.addEventListener("DOMContentLoaded", function () {
    const sheetDropdown = document.getElementById("sheet-select");
    const sheetTitle = document.getElementById("sheet-title");
    const saveButton = document.getElementById("save-sheet");
    const deleteButton = document.getElementById("delete-sheet");
    const sheetContainer = document.getElementById("spreadsheet");

    if (!sheetContainer) {
        console.error("Spreadsheet container not found.");
        return;
    }

    let sheets = JSON.parse(localStorage.getItem("savedSheets")) || {};
    let currentSheet = "Sheet1";

    function createSpreadsheet(sheetData = []) {
        sheetContainer.innerHTML = "";
        let table = document.createElement("table");
        table.classList.add("spreadsheet-table");

        // Build Header Row
        let headerRow = document.createElement("tr");
        for (let i = 0; i < 10; i++) {
            let th = document.createElement("th");
            th.contentEditable = true;
            th.textContent = sheetData[0]?.[i] || `Column ${i + 1}`;
            th.addEventListener("input", () => saveSheet());
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        // Build Data Rows
        for (let row = 1; row < 10; row++) {
            let tr = document.createElement("tr");
            for (let col = 0; col < 10; col++) {
                let td = document.createElement("td");
                td.contentEditable = true;
                td.textContent = sheetData[row]?.[col] || "";
                td.addEventListener("input", () => saveSheet());
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        sheetContainer.appendChild(table);
    }

    function saveSheet() {
        let data = [];
        const rows = sheetContainer.querySelectorAll("tr");

        rows.forEach((row, rowIndex) => {
            data[rowIndex] = [];
            row.querySelectorAll("th, td").forEach((cell, colIndex) => {
                data[rowIndex][colIndex] = cell.textContent.trim();
            });
        });

        sheets[currentSheet] = data;
        localStorage.setItem("savedSheets", JSON.stringify(sheets));
    }

    function loadSheet() {
        sheetTitle.value = currentSheet;
        createSpreadsheet(sheets[currentSheet] || []);
    }

    function updateSheetList() {
        sheetDropdown.innerHTML = "";
        Object.keys(sheets).forEach(sheet => {
            let option = document.createElement("option");
            option.value = sheet;
            option.textContent = sheet;
            sheetDropdown.appendChild(option);
        });
        sheetDropdown.value = currentSheet;
    }

    if (sheetDropdown) {
        sheetDropdown.addEventListener("change", function () {
            currentSheet = this.value;
            loadSheet();
        });
    }

    if (saveButton) {
        saveButton.addEventListener("click", function () {
            const newTitle = sheetTitle.value.trim();
            if (newTitle) {
                sheets[newTitle] = sheets[currentSheet] || [];
                if (newTitle !== currentSheet) {
                    delete sheets[currentSheet];
                    currentSheet = newTitle;
                }
                saveSheet();
                updateSheetList();
            }
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            delete sheets[currentSheet];
            localStorage.setItem("savedSheets", JSON.stringify(sheets));
            currentSheet = Object.keys(sheets)[0] || "Sheet1";
            loadSheet();
            updateSheetList();
        });
    }

    updateSheetList();
    loadSheet();
});
