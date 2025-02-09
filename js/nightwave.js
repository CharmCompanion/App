document.addEventListener("DOMContentLoaded", function() {
    const nightwaveDiv = document.getElementById("nightwave");
    
    // Add Nightwave UI
    nightwaveDiv.innerHTML = `
        <h2>Nightwave Progress</h2>
        <label>Rank Progress (0-300,000):</label>
        <progress id="progress-bar" value="0" max="300000"></progress>
        <p id="progress-text">Rank: 0</p>
        
        <h3>Challenges</h3>
        <ul id="challenge-list"></ul>

        <button onclick="addChallenge()">Add Challenge</button>
    `;

    // Preload Challenges
    const challenges = [
        { name: "Deploy a Specter", reward: 1000 },
        { name: "Kill 150 with Gas", reward: 1000 },
        { name: "Complete 15 Missions", reward: 4500 }
    ];

    const challengeList = document.getElementById("challenge-list");
    
    challenges.forEach(challenge => {
        let li = document.createElement("li");
        li.innerHTML = `${challenge.name} | <b>${challenge.reward}</b> <button onclick="markComplete(${challenge.reward})">✔</button>`;
        challengeList.appendChild(li);
    });
});

function markComplete(points) {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    let newProgress = parseInt(progressBar.value) + points;
    progressBar.value = newProgress;
    progressText.innerText = `Rank: ${Math.floor(newProgress / 10000)}`;
}

// Add Nightwave related code here
