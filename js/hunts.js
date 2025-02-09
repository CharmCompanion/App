document.addEventListener("DOMContentLoaded", function () {
    setupHuntsTracker();
    fetchHuntsRewards();
    addHuntsSummaryText();
    setupHuntsToggleSections();
    updateHuntsSelection();
    setupCousinsTracker();
    fetchCousinsRewards();
    addCousinsSummaryText();
    setupCousinsToggleSections();
    updateCousinsSelection();
});

// Setup the Hunts Tracker
function setupHuntsTracker() {
    const huntsDiv = document.getElementById("hunts-saved-rows");

    huntsDiv.innerHTML = `
        <div class="goal-bar" style="justify-content: center; margin-bottom: 20px;">
            <div class="goal-section">
                <label for="huntsGoal">Goal:</label>
                <input type="number" id="huntsGoal" value="" min="0" class="number-box" style="text-align:center;">
            </div>
            <div class="goal-section" style="margin-left: 20px;">
                <label for="huntsOwned">Owned:</label>
                <div class="change-controls">
                    <button class="mote-btn jade-btn rounded-btn" onclick="changeHunts(-1)">-</button>
                    <input type="number" id="huntsOwned" value="0" min="0" class="number-box" style="text-align:center;">
                    <button class="mote-btn jade-btn rounded-btn" onclick="changeHunts(1)">+</button>
                </div>
            </div>
        </div>
        <div id="huntsSummarySection" class="toggle-section">
            <h2 class="toggle-title" data-target="huntsSummaryText">Summary</h2>
            <div id="huntsSummaryText" class="summary-box" style="display: none;"></div>
        </div>
        <h2 class="toggle-title">Community Rewards</h2>
        <div id="huntsCommunityRewardsGrid" class="rewards-grid" style="background: none;"></div>
        <div id="huntsEventRewardsGrid" class="rewards-grid"></div>
        <h2>Clan Rewards</h2>
        <div id="huntsClanRewardsGrid" class="rewards-grid"></div>
    `;

    document.getElementById("huntsGoal").addEventListener("input", updateHunts);
    document.getElementById("huntsOwned").addEventListener("input", updateHunts);
}

// Function to Render Hunts Rewards
function renderHuntsRewards(rewards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    rewards.forEach((reward, index) => {
        const rewardDiv = document.createElement("div");
        rewardDiv.classList.add("reward-item");

        const imagePath = `images/bob/${reward.img}`;
        const moteImagePath = `images/bob/VolatileMotes.png`; // Path to the Volatile Mote image

        rewardDiv.innerHTML = `
            <img src="${imagePath}" alt="${reward.name}" class="reward-image"
            onerror="this.onerror=null;this.src='images/bob/placeholder.png';">
            <p class="reward-name">${reward.name}</p>
            ${reward.limit ? `<p class="reward-limit">Limit: ${reward.limit}</p>` : ''}
            <input type="number" class="reward-quantity" min="0" max="${reward.limit || 0}" value="" style="display:none;">
            <p class="reward-cost">Cost: ${reward.cost} <img src="${moteImagePath}" alt="Volatile Mote" class="mote-image" style="width: 16px; height: 16px;"></p>
        `;

        if (reward.limit) {
            rewardDiv.addEventListener("click", function () {
                const quantityInput = rewardDiv.querySelector(".reward-quantity");
                quantityInput.style.display = "block";
                quantityInput.focus();
                quantityInput.addEventListener("blur", function () {
                    if (quantityInput.value === "") {
                        quantityInput.style.display = "none";
                    }
                });
                quantityInput.addEventListener("input", function () {
                    if (quantityInput.value !== "") {
                        const quantity = parseInt(quantityInput.value) || 0;
                        rewardDiv.querySelector(".reward-limit").textContent = `Limit: ${reward.limit - quantity}`;
                        updateHunts();
                    }
                });
            });
        }

        rewardDiv.addEventListener("click", function () {
            rewardDiv.classList.toggle("selected");
            updateHunts();
        });

        container.appendChild(rewardDiv);

        // Limit the number of displayed rewards for community rewards
        if (containerId === "huntsCommunityRewardsGrid" && index >= 2) {
            return;
        }
    });

    // Ensure community rewards are displayed in a row
    if (containerId === "huntsCommunityRewardsGrid") {
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
    }
}

// Change Owned Hunts Count
function changeHunts(direction) {
    const owned = document.getElementById("huntsOwned");
    const inputAmount = parseInt(owned.value) || 1;
    let newOwned = parseInt(owned.value) + (direction * inputAmount);

    owned.value = Math.max(newOwned, 0);
    updateHunts();
}

// Update Needed Hunts
function updateHunts() {
    let totalMotes = 0;
    document.querySelectorAll(".selected").forEach(reward => {
        const cost = parseInt(reward.querySelector(".reward-cost").textContent.replace("Cost: ", "")) || 0;
        const quantity = parseInt(reward.querySelector(".reward-quantity").value) || 1;
        totalMotes += cost * quantity;
    });

    const owned = parseInt(document.getElementById("huntsOwned").value) || 0;
    const goal = totalMotes - owned;

    document.getElementById("huntsGoal").value = goal;
}

// Toggle Sections
function toggleHuntsSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('hidden');
    }
}

// Event Rewards Table (FULLY COMPLETE)
const huntsEventRewards = [
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

// Clan Rewards Table (FULLY COMPLETE)
const huntsClanRewards = [
    { name: "Enlightened Hate Skin", cost: 100, img: "EnlightenedHateSkin.png" },
    { name: "Gilded Clan Sigil", cost: 15, img: "ClanSigilGilded.png" },
    { name: "Glyphed Clan Sigil", cost: 15, img: "ClanSigilGlyphed.png" },
    { name: "Phased Clan Sigil", cost: 15, img: "ClanSigilPhased.png" },
    { name: "Arcane Energize", cost: 30, img: "ArcaneEnergize.png", limit: 42 },
    { name: "Arcane Grace", cost: 30, img: "ArcaneGrace.png", limit: 42 },
    { name: "Arcane Barrier", cost: 30, img: "ArcaneBarrier.png", limit: 42 },
    { name: "Belly Of The Beast Emblem", cost: 45, img: "BellyOfTheBeastEmblem.png" } // Removed limit
];

// Community Rewards Table
const huntsCommunityRewards = [
    { name: "Aspirus Ephemera", cost: 40, img: "AspirusEphemera.png" },
    { name: "Aspirus Emergent Ephemera", cost: 40, img: "AspirusEmergentEphemera.png" },
    { name: "Aspirus Apex Ephemera", cost: 40, img: "AspirusApexEphemera.png" }
];

// Initialize Hunts Rewards
function fetchHuntsRewards() {
    renderHuntsRewards(huntsCommunityRewards, "huntsCommunityRewardsGrid");
    renderHuntsRewards(huntsEventRewards, "huntsEventRewardsGrid");
    renderHuntsRewards(huntsClanRewards, "huntsClanRewardsGrid");
}

// Summary Information
function addHuntsSummaryText() {
    document.getElementById("huntsSummaryText").innerHTML = `
        <p>To buy all non-Arcane items at least once, players will need 290 Volatile Motes.</p>
        <p>To buy all Arcanes available through the event to max rank once, players will need 1,659 Volatile Motes.</p>
        <p>To buy all Arcanes available to max rank twice, players will need 3,318 Volatile Motes.</p>
    `;
}

// Setup the Cousins Tracker
function setupCousinsTracker() {
    const cousinsDiv = document.getElementById("cousins-saved-rows");

    cousinsDiv.innerHTML = `
        <div class="goal-bar" style="justify-content: center; margin-bottom: 20px;">
            <div class="goal-section">
                <label for="cousinsGoal">Goal:</label>
                <input type="number" id="cousinsGoal" value="" min="0" class="number-box" style="text-align:center;">
            </div>
            <div class="goal-section" style="margin-left: 20px;">
                <label for="cousinsOwned">Owned:</label>
                <div class="change-controls">
                    <button class="mote-btn jade-btn rounded-btn" onclick="changeCousins(-1)">-</button>
                    <input type="number" id="cousinsOwned" value="0" min="0" class="number-box" style="text-align:center;">
                    <button class="mote-btn jade-btn rounded-btn" onclick="changeCousins(1)">+</button>
                </div>
            </div>
        </div>
        <div id="cousinsSummarySection" class="toggle-section">
            <h2 class="toggle-title" data-target="cousinsSummaryText">Summary</h2>
            <div id="cousinsSummaryText" class="summary-box" style="display: none;"></div>
        </div>
        <h2 class="toggle-title">Community Rewards</h2>
        <div id="cousinsCommunityRewardsGrid" class="rewards-grid" style="background: none;"></div>
        <div id="cousinsEventRewardsGrid" class="rewards-grid"></div>
        <h2>Clan Rewards</h2>
        <div id="cousinsClanRewardsGrid" class="rewards-grid"></div>
    `;

    document.getElementById("cousinsGoal").addEventListener("input", updateCousins);
    document.getElementById("cousinsOwned").addEventListener("input", updateCousins);
}

// Function to Render Cousins Rewards
function renderCousinsRewards(rewards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    rewards.forEach((reward, index) => {
        const rewardDiv = document.createElement("div");
        rewardDiv.classList.add("reward-item");

        const imagePath = `images/bob/${reward.img}`;
        const moteImagePath = `images/bob/VolatileMotes.png`; // Path to the Volatile Mote image

        rewardDiv.innerHTML = `
            <img src="${imagePath}" alt="${reward.name}" class="reward-image"
            onerror="this.onerror=null;this.src='images/bob/placeholder.png';">
            <p class="reward-name">${reward.name}</p>
            ${reward.limit ? `<p class="reward-limit">Limit: ${reward.limit}</p>` : ''}
            <input type="number" class="reward-quantity" min="0" max="${reward.limit || 0}" value="" style="display:none;">
            <p class="reward-cost">Cost: ${reward.cost} <img src="${moteImagePath}" alt="Volatile Mote" class="mote-image" style="width: 16px; height: 16px;"></p>
        `;

        if (reward.limit) {
            rewardDiv.addEventListener("click", function () {
                const quantityInput = rewardDiv.querySelector(".reward-quantity");
                quantityInput.style.display = "block";
                quantityInput.focus();
                quantityInput.addEventListener("blur", function () {
                    if (quantityInput.value === "") {
                        quantityInput.style.display = "none";
                    }
                });
                quantityInput.addEventListener("input", function () {
                    if (quantityInput.value !== "") {
                        const quantity = parseInt(quantityInput.value) || 0;
                        rewardDiv.querySelector(".reward-limit").textContent = `Limit: ${reward.limit - quantity}`;
                        updateCousins();
                    }
                });
            });
        }

        rewardDiv.addEventListener("click", function () {
            rewardDiv.classList.toggle("selected");
            updateCousins();
        });

        container.appendChild(rewardDiv);

        // Limit the number of displayed rewards for community rewards
        if (containerId === "cousinsCommunityRewardsGrid" && index >= 2) {
            return;
        }
    });

    // Ensure community rewards are displayed in a row
    if (containerId === "cousinsCommunityRewardsGrid") {
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
    }
}

// Change Owned Cousins Count
function changeCousins(direction) {
    const owned = document.getElementById("cousinsOwned");
    const inputAmount = parseInt(owned.value) || 1;
    let newOwned = parseInt(owned.value) + (direction * inputAmount);

    owned.value = Math.max(newOwned, 0);
    updateCousins();
}

// Update Needed Cousins
function updateCousins() {
    let totalMotes = 0;
    document.querySelectorAll(".selected").forEach(reward => {
        const cost = parseInt(reward.querySelector(".reward-cost").textContent.replace("Cost: ", "")) || 0;
        const quantity = parseInt(reward.querySelector(".reward-quantity").value) || 1;
        totalMotes += cost * quantity;
    });

    const owned = parseInt(document.getElementById("cousinsOwned").value) || 0;
    const goal = totalMotes - owned;

    document.getElementById("cousinsGoal").value = goal;
}

// Toggle Sections
function toggleCousinsSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('hidden');
    }
}

// Event Rewards Table (FULLY COMPLETE)
const cousinsEventRewards = [
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

// Clan Rewards Table (FULLY COMPLETE)
const cousinsClanRewards = [
    { name: "Enlightened Hate Skin", cost: 100, img: "EnlightenedHateSkin.png" },
    { name: "Gilded Clan Sigil", cost: 15, img: "ClanSigilGilded.png" },
    { name: "Glyphed Clan Sigil", cost: 15, img: "ClanSigilGlyphed.png" },
    { name: "Phased Clan Sigil", cost: 15, img: "ClanSigilPhased.png" },
    { name: "Arcane Energize", cost: 30, img: "ArcaneEnergize.png", limit: 42 },
    { name: "Arcane Grace", cost: 30, img: "ArcaneGrace.png", limit: 42 },
    { name: "Arcane Barrier", cost: 30, img: "ArcaneBarrier.png", limit: 42 },
    { name: "Belly Of The Beast Emblem", cost: 45, img: "BellyOfTheBeastEmblem.png" } // Removed limit
];

// Community Rewards Table
const cousinsCommunityRewards = [
    { name: "Aspirus Ephemera", cost: 40, img: "AspirusEphemera.png" },
    { name: "Aspirus Emergent Ephemera", cost: 40, img: "AspirusEmergentEphemera.png" },
    { name: "Aspirus Apex Ephemera", cost: 40, img: "AspirusApexEphemera.png" }
];

// Initialize Cousins Rewards
function fetchCousinsRewards() {
    renderCousinsRewards(cousinsCommunityRewards, "cousinsCommunityRewardsGrid");
    renderCousinsRewards(cousinsEventRewards, "cousinsEventRewardsGrid");
    renderCousinsRewards(cousinsClanRewards, "cousinsClanRewardsGrid");
}

// Summary Information
function addCousinsSummaryText() {
    document.getElementById("cousinsSummaryText").innerHTML = `
        <p>To buy all non-Arcane items at least once, players will need 290 Volatile Motes.</p>
        <p>To buy all Arcanes available through the event to max rank once, players will need 1,659 Volatile Motes.</p>
    `;
}