document.addEventListener("DOMContentLoaded", () => {
    const nightwaveContainer = document.getElementById("nightwave-container");

    async function fetchNightwave() {
        try {
            const response = await fetch("https://api.warframestat.us/pc/nightwave");
            const data = await response.json();
            renderNightwave(data);
        } catch (error) {
            console.error("Failed to fetch Nightwave data:", error);
        }
    }

    function renderNightwave(nightwave) {
        if (!nightwaveContainer) return;

        if (!nightwave.activeChallenges || nightwave.activeChallenges.length === 0) {
            nightwaveContainer.innerHTML = "<p>No active Nightwave challenges.</p>";
            return;
        }

        nightwaveContainer.innerHTML = `
            <h3>Nightwave: ${nightwave.activeChallenges.length} Active Challenges</h3>
            <ul>
                ${nightwave.activeChallenges
                    .map(challenge => `<li>${challenge.desc} - ${challenge.reputation} Rep</li>`)
                    .join("")}
            </ul>`;
    }

    fetchNightwave();
});
