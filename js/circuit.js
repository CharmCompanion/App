document.addEventListener("DOMContentLoaded", function () {
    const circuitDiv = document.getElementById("circuit");

    circuitDiv.innerHTML = `
        <h2 class="circuit-title">Normal Circuit</h2>
        <button class="circuit-button" onclick="toggleCircuit()">Switch to Steel Path</button>
        <p>Tracking weekly rotations and progress.</p>
    `;

    window.currentMode = "Normal";
});

function toggleCircuit() {
    const title = document.querySelector(".circuit-title");

    if (window.currentMode === "Normal") {
        window.currentMode = "Steel Path";
        title.textContent = "Steel Path Circuit";
        title.style.backgroundColor = "#b22222"; // Deep red
    } else {
        window.currentMode = "Normal";
        title.textContent = "Normal Circuit";
        title.style.backgroundColor = "#444";
    }
}

// Add Circuit related code here
