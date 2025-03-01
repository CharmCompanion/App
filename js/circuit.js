document.addEventListener("DOMContentLoaded", function () {
    console.log("Circuit.js Loaded");

    // Example function to track progress in a circuit system
    function updateCircuitStatus(status) {
        localStorage.setItem("circuitStatus", status);
        document.getElementById("circuit-status").textContent = `Circuit Status: ${status}`;
    }

    // Load stored circuit status
    function loadCircuitStatus() {
        const savedStatus = localStorage.getItem("circuitStatus") || "Not Started";
        document.getElementById("circuit-status").textContent = `Circuit Status: ${savedStatus}`;
    }

    // Example event listener for a button to change circuit state
    document.getElementById("circuit-button")?.addEventListener("click", function () {
        updateCircuitStatus("Completed");
    });

    loadCircuitStatus();
});
