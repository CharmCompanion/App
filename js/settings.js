// Settings Management
document.addEventListener("DOMContentLoaded", function () {
    loadSettings();
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
});

// Toggle Theme
function toggleTheme() {
    let currentTheme = document.body.getAttribute("data-theme");
    let newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}

// Load Settings
function loadSettings() {
    let savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
}
