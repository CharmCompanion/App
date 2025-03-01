document.addEventListener("DOMContentLoaded", () => {
    console.log("App initialized.");

    // Sidebar Navigation
    const tabs = document.querySelectorAll(".tab");
    const pages = document.querySelectorAll(".page");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetPage = tab.dataset.target;
            const targetElement = document.getElementById(targetPage);
            if (!targetElement) return;

            pages.forEach(page => page.classList.remove("active"));
            targetElement.classList.add("active");

            if (targetPage === "map-container") {
                reloadMap();
            }
        });
    });

    const homeIcon = document.getElementById("home-icon");
    if (homeIcon) {
        homeIcon.addEventListener("click", () => {
            showPage("home");
        });
    }

    setupMapEvents();
    loadSettings();
});

// Setup Map Interactions
function setupMapEvents() {
    d3.selectAll("[id^='SolNode'], [id$='Junction']").on("click", function () {
        showMissionInfo(this.id);
    });

    d3.selectAll("[id^='planet_']").on("click", function () {
        const bbox = this.getBBox();
        zoomToArea(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, 4);
    });
}

// Steel Path Toggle
let steelPathMode = false;
function toggleSteelPathMode() {
    steelPathMode = !steelPathMode;
    document.body.classList.toggle("steelpath-active", steelPathMode);

    d3.selectAll("[id^='SolNode']").each(function () {
        let node = d3.select(this);
        if (steelPathMode) {
            node.classed("steelpath", true);
        } else {
            node.classed("steelpath", false);
        }
    });
}

// Resize map when switching tabs
function reloadMap() {
    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    d3.select("#starchart").selectAll("*").remove(); // Clears old map
    d3.xml("images/map/StarChart.svg").then((xml) => {
        const importedNode = document.importNode(xml.documentElement, true);
        d3.select("#starchart").node().appendChild(importedNode);
        setupMapInteractions();
    });
}

// Close Info Panel
const closeInfoBtn = document.getElementById("close-info");
if (closeInfoBtn) {
    closeInfoBtn.addEventListener("click", () => {
        document.getElementById("info-panel").classList.remove("active");
    });
}

// Load Settings (Theme, Preferences, etc.)
function loadSettings() {
    const theme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", theme);
}
