// Initialize the D3.js Map
const svg = d3.select("#starchart");
const width = window.innerWidth;
const height = window.innerHeight;

// Zoom behavior
const zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", (event) => {
        svg.select("g").attr("transform", event.transform);
    });

svg.call(zoom);

// Group for map elements
const mapGroup = svg.append("g");

// Load the main map
d3.xml("images/map/StarChart.svg").then((xml) => {
    const importedNode = document.importNode(xml.documentElement, true);
    mapGroup.node().appendChild(importedNode);

    setupMapInteractions();
});

// Setup interactions for planets and nodes
function setupMapInteractions() {
    // FlyTo function for planets
    d3.selectAll("[id^='planet_']").on("click", function () {
        const bbox = this.getBBox();
        zoomToArea(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, 4);
    });

    // Mission nodes interactions
    d3.selectAll("[id^='SolNode'], [id$='Junction']").on("click", function () {
        showMissionInfo(this.id);
    });

    // Handle hovering over planets for subtle glow
    d3.selectAll("[id^='planet_']")
        .on("mouseenter", function () {
            d3.select(this).style("filter", "drop-shadow(0px 0px 5px rgba(255,255,255,0.8))");
        })
        .on("mouseleave", function () {
            d3.select(this).style("filter", "none");
        });
}

// Zoom function
function zoomToArea(x, y, scale) {
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(width / 2 - x * scale, height / 2 - y * scale).scale(scale));
}

// Show mission info panel
function showMissionInfo(missionId) {
    const infoPanel = document.getElementById("info-panel");
    infoPanel.innerHTML = `<h3>${missionId}</h3><p>Mission details loading...</p>`;
    infoPanel.classList.add("active");

    fetchMissionData(missionId);
}

// Fetch mission data from API
function fetchMissionData(missionId) {
    fetch(`/api/missions/${missionId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("info-panel").innerHTML = `
                <h3>${data.name}</h3>
                <p>Type: ${data.type}</p>
                <p>Enemies: ${data.enemies}</p>
                <p>Level Range: ${data.level}</p>
            `;
        })
        .catch(() => {
            document.getElementById("info-panel").innerHTML = `<h3>${missionId}</h3><p>Data not available.</p>`;
        });
}

// Handle map resize
window.addEventListener("resize", () => {
    svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
});
