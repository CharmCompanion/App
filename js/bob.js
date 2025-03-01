document.addEventListener("DOMContentLoaded", function () {
    setupMoteTracker();
    fetchRewards();
    addSummaryText();
    setupToggleSections();
    updateArcaneSelection();
});

// Setup the Mote Tracker
function setupMoteTracker() {
    const bellyDiv = document.getElementById("belly-tracker");

    if (!bellyDiv) {
        console.error("Mote tracker element not found.");
        return;
    }

    bellyDiv.innerHTML = `
        <h2 class="tracker-title">Operation: Belly of the Beast</h2>
        <div class="goal-bar">
            <div class="goal-section">
                <label for="motesGoal">Goal:</label>
                <input type="number" id="motesGoal" value="" min="0" class="number-box">
            </div>
            <div class="goal-section">
                <label for="motesOwned">Owned:</label>
                <div class="change-controls">
                    <button class="mote-btn jade-btn rounded-btn" onclick="changeMotes(-1)">-</button>
                    <input type="number" id="motesOwned" value="0" min="0" class="number-box">
                    <button class="mote-btn jade-btn rounded-btn" onclick="changeMotes(1)">+</button>
                </div>
            </div>
        </div>
        <h2 class="toggle-title" data-target="summaryText">Summary</h2>
        <div id="summaryText" class="summary-box"></div>
        <h2 class="toggle-title">Community Rewards</h2>
        <div id="communityRewardsGrid" class="rewards-grid"></div>
        <h2 class="toggle-title">Event Rewards</h2>
        <div id="eventRewardsGrid" class="rewards-grid"></div>
        <h2 class="toggle-title">Clan Rewards</h2>
        <div id="clanRewardsGrid" class="rewards-grid"></div>
    `;

    document.getElementById("motesGoal").addEventListener("input", updateMotes);
    document.getElementById("motesOwned").addEventListener("input", updateMotes);
}

// Function to Render Rewards
function renderRewards(rewards, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = "";

    rewards.forEach((reward, index) => {
        const rewardDiv = document.createElement("div");
        rewardDiv.classList.add("reward-item");

        const imagePath = `images/bob/${reward.img}`;
        const moteImagePath = `images/bob/VolatileMotes.png`;

        rewardDiv.innerHTML = `
            <img src="${imagePath}" alt="${reward.name}" class="reward-image"
            onerror="this.onerror=null;this.src='images/bob/placeholder.png';">
            <p class="reward-name">${reward.name}</p>
            ${reward.limit ? `<p class="reward-limit">Limit: ${reward.limit}</p>` : ''}
            <input type="number" class="reward-quantity" min="0" max="${reward.limit || 0}" value="" style="display:none;">
            <p class="reward-cost">Cost: ${reward.cost} <img src="${moteImagePath}" class="mote-image"></p>
        `;

        rewardDiv.addEventListener("click", function () {
            rewardDiv.classList.toggle("selected");
            updateMotes();
        });

        container.appendChild(rewardDiv);
    });
}

// Change Owned Motes Count
function changeMotes(direction) {
    const owned = document.getElementById("motesOwned");
    if (!owned) return;

    let newOwned = parseInt(owned.value) + direction;
    owned.value = Math.max(newOwned, 0);
    updateMotes();
}

// Update Needed Motes
function updateMotes() {
    let totalMotes = 0;
    document.querySelectorAll(".selected").forEach(reward => {
        const cost = parseInt(reward.querySelector(".reward-cost").textContent.replace("Cost: ", "")) || 0;
        totalMotes += cost;
    });

    const owned = parseInt(document.getElementById("motesOwned").value) || 0;
    document.getElementById("motesGoal").value = totalMotes - owned;
}

// Full Event, Clan, and Community Rewards
const eventRewards = [
    { name: "Low Guardian Chest Plate", cost: 15, img: "LowGuardianChestPlate.png" },
    { name: "Belly Of The Beast Sigil", cost: 10, img: "BellyOfTheBeastEmblem.png" },
    { name: "Krios Signa", cost: 10, img: "KriosSigna.png" },
    { name: "Prominence Wisp Totem", cost: 30, img: "ProminenceWispTotem.png" },
    { name: "Fluctus Rahk Skin", cost: 15, img: "FluctusRahkSkin.png" },
    { name: "Ceti Lacera Blueprint", cost: 15, img: "CetiLacera.png" },
    { name: "Basmu Blueprint", cost: 15, img: "Basmu.png" },
    { name: "Stance Forma Blueprint", cost: 15, img: "StanceForma.png" },
    { name: "The Ballroom Simulacrum", cost: 15, img: "BallroomSimulacrum.png" },
    { name: "Arcane Tempo", cost: 2, img: "ArcaneTempo.png", limit: 42 },
    { name: "Arcane Consequence", cost: 2, img: "ArcaneConsequence.png", limit: 42 },
    { name: "Arcane Momentum", cost: 2, img: "ArcaneMomentum.png", limit: 42 },
    { name: "Arcane Ice", cost: 2, img: "ArcaneIce.png", limit: 42 },
    { name: "Arcane Nullifier", cost: 2, img: "ArcaneNullifier.png", limit: 42 },
    { name: "Arcane Warmth", cost: 2, img: "ArcaneWarmth.png", limit: 42 },
    { name: "Arcane Resistance", cost: 4, img: "ArcaneResistance.png", limit: 42 },
    { name: "Arcane Healing", cost: 4, img: "ArcaneHealing.png", limit: 42 },
    { name: "Arcane Deflection", cost: 4, img: "ArcaneDeflection.png", limit: 42 },
    { name: "Arcane Victory", cost: 4, img: "ArcaneVictory.png", limit: 42 },
    { name: "Arcane Strike", cost: 4, img: "ArcaneStrike.png", limit: 42 },
    { name: "Arcane Awakening", cost: 4, img: "ArcaneAwakening.png", limit: 42 },
    { name: "Arcane Guardian", cost: 4, img: "ArcaneGuardian.png", limit: 42 },
    { name: "Arcane Phantasm", cost: 4, img: "ArcanePhantasm.png", limit: 42 },
    { name: "Arcane Eruption", cost: 4, img: "ArcaneEruption.png", limit: 42 },
    { name: "Arcane Agility", cost: 4, img: "ArcaneAgility.png", limit: 42 },
    { name: "Arcane Acceleration", cost: 4, img: "ArcaneAcceleration.png", limit: 42 },
    { name: "Arcane Trickery", cost: 4, img: "ArcaneTrickery.png", limit: 42 },
    { name: "Arcane Velocity", cost: 6, img: "ArcaneVelocity.png", limit: 42 },
    { name: "Arcane Precision", cost: 6, img: "ArcanePrecision.png", limit: 42 },
    { name: "Arcane Pulse", cost: 6, img: "ArcanePulse.png", limit: 42 },
    { name: "Arcane Ultimatum", cost: 6, img: "ArcaneUltimatum.png", limit: 42 },
    { name: "Arcane Aegis", cost: 6, img: "ArcaneAegis.png", limit: 42 },
    { name: "Arcane Arachne", cost: 6, img: "ArcaneArachne.png", limit: 42 },
    { name: "Arcane Rage", cost: 6, img: "ArcaneRage.png", limit: 42 },
    { name: "Arcane Fury", cost: 6, img: "ArcaneFury.png", limit: 42 },
    { name: "Arcane Avenger", cost: 6, img: "ArcaneAvenger.png", limit: 42 }
];

const clanRewards = [
    { name: "Enlightened Hate Skin", cost: 100, img: "EnlightenedHateSkin.png" },
    { name: "Gilded Clan Sigil", cost: 15, img: "ClanSigilGilded.png" },
    { name: "Glyphed Clan Sigil", cost: 15, img: "ClanSigilGlyphed.png" },
    { name: "Phased Clan Sigil", cost: 15, img: "ClanSigilPhased.png" },
    { name: "Arcane Energize", cost: 30, img: "ArcaneEnergize.png", limit: 42 },
    { name: "Arcane Grace", cost: 30, img: "ArcaneGrace.png", limit: 42 },
    { name: "Arcane Barrier", cost: 30, img: "ArcaneBarrier.png", limit: 42 },
    { name: "Belly Of The Beast Emblem", cost: 45, img: "BellyOfTheBeastEmblem.png" }
];

const communityRewards = [
    { name: "Aspirus Ephemera", cost: 40, img: "AspirusEphemera.png" },
    { name: "Aspirus Emergent Ephemera", cost: 40, img: "AspirusEmergentEphemera.png" },
    { name: "Aspirus Apex Ephemera", cost: 40, img: "AspirusApexEphemera.png" }
];

// Initialize Rewards
function fetchRewards() {
    renderRewards(communityRewards, "communityRewardsGrid");
    renderRewards(eventRewards, "eventRewardsGrid");
    renderRewards(clanRewards, "clanRewardsGrid");
}
// Fetch Rewards
function fetchRewards() {
    renderRewards(communityRewards, "communityRewardsGrid");
    renderRewards(eventRewards, "eventRewardsGrid");
    renderRewards(clanRewards, "clanRewardsGrid");
}

// Add Summary Text
function addSummaryText() {
    const summaryText = document.getElementById("summaryText");
    if (!summaryText) return;

    summaryText.innerHTML = `
        <p>To buy all non-Arcane items at least once, players will need 290 Volatile Motes.</p>
        <p>To buy all Arcanes available through the event to max rank once, players will need 1,659 Volatile Motes.</p>
        <p>To buy all Arcanes available to max rank twice, players will need 3,318 Volatile Motes.</p>
        <p>Total needed from all shops: 11,550 Volatile Motes.</p>
    `;
}

// Setup Toggle Sections
function setupToggleSections() {
    document.querySelectorAll(".toggle-title").forEach(section => {
        section.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            toggleSection(targetId);
        });
    });
}

// Ensure Arcane Selection Stays Within Limits
function updateArcaneSelection() {
    document.querySelectorAll(".reward-item").forEach(reward => {
        let quantityInput = reward.querySelector(".reward-quantity");
        if (!quantityInput) return;

        quantityInput.addEventListener("input", function () {
            let maxLimit = parseInt(quantityInput.max) || 0;
            let selectedAmount = parseInt(quantityInput.value) || 0;

            if (selectedAmount > maxLimit) {
                quantityInput.value = maxLimit;
            } else if (selectedAmount < 0) {
                quantityInput.value = 0;
            }

            updateMotes();
        });
    });
}

// Initialize rewards on page load
document.addEventListener("DOMContentLoaded", function () {
    fetchRewards();
});