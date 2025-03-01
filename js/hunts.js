document.addEventListener("DOMContentLoaded", function () {
    initializeHunts();
});

function initializeHunts() {
    const huntPage = localStorage.getItem("activeHuntPage") || "sisters";
    setActiveHuntPage(huntPage);

    document.getElementById("switch-hunt").addEventListener("click", toggleHuntPage);
    document.getElementById("reset-hunt").addEventListener("click", resetHuntSelections);
    document.getElementById("suggest-hunt").addEventListener("click", generateHuntSuggestions);
}

function setActiveHuntPage(page) {
    localStorage.setItem("activeHuntPage", page);
    document.body.setAttribute("data-hunt", page);
    document.getElementById("hunt-title").textContent = page === "sisters" ? "Sisters" : "Brothers";
    document.getElementById("hunt-title").className = page === "sisters" ? "sisters-title" : "brothers-title";
}

function toggleHuntPage() {
    const newPage = localStorage.getItem("activeHuntPage") === "sisters" ? "brothers" : "sisters";
    setActiveHuntPage(newPage);
}

function resetHuntSelections() {
    document.querySelectorAll(".mod-slot").forEach(slot => slot.innerHTML = "");
    document.querySelectorAll(".mod-dropdown").forEach(dropdown => dropdown.selectedIndex = 0);
    localStorage.removeItem("huntSelections");
}

function generateHuntSuggestions() {
    const selections = getHuntSelections();
    if (selections.length < 3) {
        alert("You need to select three mods to generate suggestions.");
        return;
    }

    const orderings = [
        [selections[0], "Oull", selections[1]],
        ["Oull", selections[0], selections[1]],
        ["Oull", selections[1], selections[0]],
        [selections[1], "Oull", selections[0]],
    ];

    document.querySelectorAll(".hunt-row").forEach((row, index) => {
        const slots = row.querySelectorAll(".mod-slot");
        slots.forEach((slot, i) => {
            slot.innerHTML = `<img src="images/mods/${orderings[index][i]}.png" alt="${orderings[index][i]}">`;
        });
    });
}

function getHuntSelections() {
    return [...document.querySelectorAll(".mod-dropdown")].map(dropdown => dropdown.value).filter(val => val !== "");
}
