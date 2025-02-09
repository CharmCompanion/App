// Enhanced Lich Hunts Script

let mods = JSON.parse(localStorage.getItem("mod_selections")) || {
  Sisters: [[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null]],
  Brothers: [[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null]],
};
let currentPage = localStorage.getItem("lichType") || "Brothers";
const themes = { Sisters: "blue", Brothers: "red" };

function initLichHunts() {
  const lichTitle = document.getElementById("lich-title");
  if (!lichTitle) {
    console.error("Lich title element not found. Please ensure the 'lich-title' element exists in the HTML.");
    return;
  }

  // Set default theme and page
  lichTitle.style.backgroundColor = themes[currentPage];
  lichTitle.textContent = currentPage;

  // Render the saved rows
  renderLichSavedRows();

  // Add event listener for switching between Brothers and Sisters
  lichTitle.onclick = () => {
    currentPage = currentPage === "Sisters" ? "Brothers" : "Sisters";
    localStorage.setItem("lichType", currentPage);
    lichTitle.style.backgroundColor = themes[currentPage];
    lichTitle.textContent = currentPage;
    renderLichSavedRows();
  };
}

function renderLichSavedRows() {
  const savedRowsContainer = document.getElementById("lich-saved-rows");
  if (!savedRowsContainer) {
    console.error("Saved rows container not found. Please ensure the 'lich-saved-rows' element exists in the HTML.");
    return;
  }

  savedRowsContainer.innerHTML = "";

  // Ensure mods[currentPage] is properly initialized
  if (!mods[currentPage]) {
    mods[currentPage] = [[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null]];
  }

  // Render the active row (Row 0)
  const activeRowDiv = createRowDiv(0, true);
  savedRowsContainer.appendChild(activeRowDiv);

  // Render rows 1–5 stacked under the active row
  for (let rowIndex = 1; rowIndex <= 5; rowIndex++) {
    const rowDiv = createRowDiv(rowIndex, false);
    savedRowsContainer.appendChild(rowDiv);
  }
}

function createRowDiv(rowIndex, isActiveRow) {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("lich-row");

  if (!mods[currentPage][rowIndex]) {
    mods[currentPage][rowIndex] = [null, null, null];
  }

  // Add Reset and Suggest buttons for the active row
  if (isActiveRow) {
    const clearButton = document.createElement("button");
    clearButton.textContent = "CLEAR";
    clearButton.classList.add("lich-button");
    clearButton.addEventListener("click", resetLichPage);

    const guessButton = document.createElement("button");
    guessButton.textContent = "GUESS";
    guessButton.classList.add("lich-button");
    guessButton.addEventListener("click", suggestLoadout);

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.marginRight = "10px";

    buttonContainer.appendChild(clearButton);
    buttonContainer.appendChild(document.createElement("div")).style.height = "5px"; // Add gap
    buttonContainer.appendChild(guessButton);
    rowDiv.appendChild(buttonContainer);
  } else {
    const rowButton = document.createElement("button");
    rowButton.textContent = rowIndex;
    rowButton.classList.add("lich-button");
    rowButton.style.height = "60px"; // Match height with mod boxes

    rowButton.addEventListener("click", () => {
      mods[currentPage][rowIndex] = [...mods[currentPage][0]]; // Copy active row to this row
      localStorage.setItem("mod_selections", JSON.stringify(mods)); // Save changes
      renderLichSavedRows(); // Re-render rows
    });

    rowDiv.appendChild(rowButton);
  }

  // Add mod slots for each row
  mods[currentPage][rowIndex].forEach((mod, colIndex) => {
    const cell = document.createElement("div");
    cell.classList.add("mod-box");

    if (isActiveRow) {
      if (mod) {
        const modImage = document.createElement("img");
        modImage.src = `images/mods/${mod}.png`;
        modImage.draggable = true;

        modImage.addEventListener("click", () => {
          if (mod !== "Oull") {
            mods[currentPage][0][colIndex] = cycleModVariant(mod);
            localStorage.setItem("mod_selections", JSON.stringify(mods));
            renderLichSavedRows();
          }
        });

        modImage.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", JSON.stringify({ colIndex }));
        });

        modImage.addEventListener("dragend", (event) => {
          const isDropTargetValid = event.dataTransfer.dropEffect !== "none";
          if (!isDropTargetValid) {
            mods[currentPage][0][colIndex] = null; // Reset to dropdown
            localStorage.setItem("mod_selections", JSON.stringify(mods));
            renderLichSavedRows();
          }
        });

        modImage.addEventListener("dragover", (event) => {
          event.preventDefault();
        });

        modImage.addEventListener("drop", (event) => {
          event.preventDefault();
          const dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
          const draggedIndex = dragData.colIndex;

          // Swap mods within the active row
          const tempMod = mods[currentPage][0][draggedIndex];
          mods[currentPage][0][draggedIndex] = mods[currentPage][0][colIndex];
          mods[currentPage][0][colIndex] = tempMod;

          localStorage.setItem("mod_selections", JSON.stringify(mods));
          renderLichSavedRows();
        });

        cell.appendChild(modImage);
      } else {
        const dropdown = document.createElement("select");
        dropdown.classList.add("mod-dropdown");

        updateDropdownOptions(dropdown, colIndex);

        dropdown.addEventListener("change", (event) => {
          const selectedMod = event.target.value;
          if (selectedMod !== "Select Mod") {
            mods[currentPage][0][colIndex] = selectedMod;
            localStorage.setItem("mod_selections", JSON.stringify(mods));
            renderLichSavedRows();
          }
        });

        cell.appendChild(dropdown);
      }
    } else {
      if (mod) {
        const modImage = document.createElement("img");
        modImage.src = `images/mods/${mod}.png`;
        cell.appendChild(modImage);
      } else {
        const blankBox = document.createElement("div");
        blankBox.classList.add("mod-box");
        cell.appendChild(blankBox);
      }
    }

    rowDiv.appendChild(cell);
  });

  return rowDiv;
}

function updateDropdownOptions(dropdown, excludeIndex) {
  const usedMods = mods[currentPage][0]
    .filter((mod, index) => mod && index !== excludeIndex)
    .flatMap((mod) => {
      const baseMod = mod.replace(/F|P$/, ""); // Normalize to base mod
      return [baseMod, `${baseMod}F`, `${baseMod}P`]; // Include all variants
    });

  // Explicit "Fass" Fix: Ensure "Fass" and its variants are properly handled
  if (mods[currentPage][0].some((mod) => mod && mod.includes("Fass"))) {
    if (!usedMods.includes("Fass")) usedMods.push("Fass");
    if (!usedMods.includes("FassF")) usedMods.push("FassF");
    if (!usedMods.includes("FassP")) usedMods.push("FassP");
    console.log("Fass variants explicitly added to usedMods:", usedMods);
  }

  const allMods = ["Fass", "Jahu", "Khra", "Lohk", "Netra", "Ris", "Vome", "Xata", "Oull"];
  const availableMods = allMods.filter((mod) => !usedMods.includes(mod));

  dropdown.innerHTML = ""; // Clear options
  const defaultOption = document.createElement("option");
  defaultOption.value = "Select Mod";
  defaultOption.textContent = "Select Mod";
  dropdown.appendChild(defaultOption);

  availableMods.forEach((modOption) => {
    const option = document.createElement("option");
    option.value = modOption;
    option.textContent = modOption;
    dropdown.appendChild(option);
  });
}

function cycleModVariant(mod) {
  if (mod === "Oull") return mod;
  if (mod.endsWith("F")) return mod.slice(0, -1) + "P";
  if (mod.endsWith("P")) return mod.slice(0, -1);
  return mod + "F";
}

function resetLichPage() {
  mods[currentPage] = [[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null]];
  localStorage.setItem("mod_selections", JSON.stringify(mods));
  renderLichSavedRows();
}

function suggestLoadout() {
  const activeMods = mods[currentPage][0];

  // Check how many mods are filled
  const filledMods = activeMods.filter(Boolean);

  if (filledMods.length < 2) {
    alert("Please set at least 2 active mods before using the GUESS button.");
    return;
  }

  // Automatically add "Oull" to the third slot if only two mods are filled
  if (filledMods.length === 2) {
    activeMods[2] = "Oull";
    localStorage.setItem("mod_selections", JSON.stringify(mods)); // Save the updated mods
    renderLichSavedRows(); // Re-render rows to reflect the change
  }

  // Generate loadouts dynamically
  const suggestions = [];
  if (filledMods.length === 3 || activeMods.filter(Boolean).length === 3) {
    // If all 3 mods are filled, use them directly for suggestions
    suggestions.push([activeMods[0], activeMods[1], "Oull"]);
    suggestions.push(["Oull", activeMods[0], activeMods[1]]);
    suggestions.push(["Oull", activeMods[1], activeMods[0]]);
    suggestions.push([activeMods[1], "Oull", activeMods[0]]);
  }

  // Assign the suggestions to rows 1-4
  mods[currentPage][1] = suggestions[0];
  mods[currentPage][2] = suggestions[1];
  mods[currentPage][3] = suggestions[2];
  mods[currentPage][4] = suggestions[3];

  // Swap rows 3 and 4 if a third mod is used
  if (activeMods[2] !== "Oull") {
    [mods[currentPage][3], mods[currentPage][4]] = [mods[currentPage][4], mods[currentPage][3]];
  }

  localStorage.setItem("mod_selections", JSON.stringify(mods));
  renderLichSavedRows();
}

// Fetch with no CORS
function fetchWithNoCors(url) {
  fetch(url, { mode: 'no-cors' })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Handle data
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Expose initLichHunts globally
window.initLichHunts = initLichHunts;

document.addEventListener("DOMContentLoaded", initLichHunts);