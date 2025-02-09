import { fetchWithCors } from './cors_util.js';

// Example of handling CORS issue using the new utility function
function fetchWithNoCors(url) {
    fetchWithCors(url)
        .then(data => {
            console.log(data);
            // Handle data
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function renderLichGrid() {
    const lichGrid = document.getElementById("lich-grid");
    lichGrid.innerHTML = ''; // Clear existing content
    const lichRewards = [
        { name: "Oull", img: "Oull.png" },
        { name: "Xata", img: "Xata.png" },
        { name: "Vome", img: "Vome.png" },
        { name: "Ris", img: "Ris.png" },
        { name: "Netra", img: "Netra.png" },
        { name: "Lohk", img: "Lohk.png" },
        { name: "Khra", img: "Khra.png" },
        { name: "Jahu", img: "Jahu.png" },
        { name: "Fass", img: "Fass.png" },
    ];
    lichRewards.forEach(reward => {
        const rewardDiv = document.createElement("div");
        rewardDiv.classList.add("reward-item");
        const imagePath = `images/mods/${reward.img}`;
        rewardDiv.innerHTML = `
            <img src="${imagePath}" alt="${reward.name}" class="reward-image" onerror="this.onerror=null;this.src='images/placeholder.png';">
            <p class="reward-name">${reward.name}</p>
        `;
        lichGrid.appendChild(rewardDiv);
    });
}

function renderSisterGrid() {
    const grid = document.getElementById("lich-grid");
    grid.innerHTML = `
        <select class="sister-row">
            <option>Select Mod</option>
            <option>Oull</option>
        </select>
        <select class="sister-row">
            <option>Select Mod</option>
            <option>Xata</option>
            <option>Vome</option>
            <option>Ris</option>
        </select>
        <select class="sister-row">
            <option>Select Mod</option>
            <option>Netra</option>
            <option>Lohk</option>
            <option>Khra</option>
            <option>Jahu</option>
            <option>Fass</option>
        </select>
    `;
}

function switchLich() {
    const title = document.querySelector(".lich-title");
    const grid = document.getElementById("lich-grid");
    if (title.textContent === "Brothers") {
        title.textContent = "Sisters";
        title.classList.add("sister-title");
        title.classList.remove("lich-title");
        grid.classList.add("sister-grid");
        grid.classList.remove("mod-grid");
        renderSisterGrid();
    } else {
        title.textContent = "Brothers";
        title.classList.add("lich-title");
        title.classList.remove("sister-title");
        grid.classList.add("mod-grid");
        grid.classList.remove("sister-grid");
        renderLichGrid();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const lichDiv = document.getElementById("lich");
    lichDiv.innerHTML = `
        <h2 class="lich-title">Brothers</h2>
        <button class="lich-button" onclick="switchLich()">Switch to Sisters</button>
        <div id="lich-grid" class="mod-grid"></div>
    `;
    renderLichGrid();
});