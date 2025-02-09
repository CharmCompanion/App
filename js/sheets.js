document.addEventListener("DOMContentLoaded", function () {
    const sheetsContainer = document.getElementById("sheets-container");
    const saveButton = document.getElementById("sheet-save-button");
    const deleteButton = document.getElementById("sheet-delete-button");
    const sheetsDropdown = document.getElementById("sheets-dropdown");
    const sheetNameInput = document.getElementById("sheets-name-input");

    // Initialize Luckysheet
    luckysheet.create({
        container: 'sheets-container',
        showinfobar: false,
        title: 'Luckysheet',
        lang: 'en',
        allowEdit: true,
        showtoolbar: true,
        showsheetbar: true,
        showstatisticBar: true,
        sheetFormulaBar: true,
        sheetConfig: {
            enableAddRow: true,
            enableAddCol: true,
            enableDeleteRow: true,
            enableDeleteCol: true,
            enableRenameSheet: true,
            enableSheetResize: true,
            enableSheetScroll: true
        }
    });

    // Save and Load Sheets
    saveButton.addEventListener("click", function () {
        const sheetName = sheetNameInput.value.trim();
        if (sheetName) {
            const sheetData = luckysheet.getAllSheets();
            localStorage.setItem(`sheet_${sheetName}`, JSON.stringify(sheetData));
            updateSheetsDropdown();
            alert("Sheet saved successfully!");
        } else {
            alert("Please enter a sheet name.");
        }
    }, { passive: true });

    deleteButton.addEventListener("click", function () {
        const sheetName = sheetsDropdown.value;
        if (sheetName) {
            localStorage.removeItem(`sheet_${sheetName}`);
            updateSheetsDropdown();
            luckysheet.destroy();
            luckysheet.create({
                container: 'sheets-container',
                showinfobar: false,
                title: 'Luckysheet',
                lang: 'en',
                allowEdit: true,
                showtoolbar: true,
                showsheetbar: true,
                showstatisticBar: true,
                sheetFormulaBar: true,
                sheetConfig: {
                    enableAddRow: true,
                    enableAddCol: true,
                    enableDeleteRow: true,
                    enableDeleteCol: true,
                    enableRenameSheet: true,
                    enableSheetResize: true,
                    enableSheetScroll: true
                }
            });
            alert("Sheet deleted successfully!");
        } else {
            alert("Please select a sheet to delete.");
        }
    }, { passive: true });

    sheetsDropdown.addEventListener("change", function () {
        const sheetName = sheetsDropdown.value;
        if (sheetName) {
            const sheetData = JSON.parse(localStorage.getItem(`sheet_${sheetName}`));
            luckysheet.destroy();
            luckysheet.create({
                container: 'sheets-container',
                data: sheetData,
                showinfobar: false,
                title: 'Luckysheet',
                lang: 'en',
                allowEdit: true,
                showtoolbar: true,
                showsheetbar: true,
                showstatisticBar: true,
                sheetFormulaBar: true,
                sheetConfig: {
                    enableAddRow: true,
                    enableAddCol: true,
                    enableDeleteRow: true,
                    enableDeleteCol: true,
                    enableRenameSheet: true,
                    enableSheetResize: true,
                    enableSheetScroll: true
                }
            });
        }
    }, { passive: true });

    function updateSheetsDropdown() {
        sheetsDropdown.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("sheet_")) {
                const option = document.createElement("option");
                option.value = key.replace("sheet_", "");
                option.textContent = key.replace("sheet_", "");
                sheetsDropdown.appendChild(option);
            }
        }
    }

    updateSheetsDropdown();
});
