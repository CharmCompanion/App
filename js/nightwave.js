document.addEventListener("DOMContentLoaded", function () {
    const nightwaveDiv = document.getElementById("nightwave");

    // Add Nightwave UI
    nightwaveDiv.innerHTML = `
        <h2>Nightwave Progress</h2>
        <div class="progress-container">
            <span id="rank-display">Rank: 0</span>
            <div class="progress-bar-background">
                <div id="progress-bar" class="progress-bar"></div>
            </div>
        </div>
        <div id="challenges-container" class="challenges-grid"></div>
    `;

    const progressBar = document.getElementById("progress-bar");
    const rankDisplay = document.getElementById("rank-display");
    const challengesContainer = document.getElementById("challenges-container");

    let totalProgress = 0;
    const maxProgress = 300000;
    const worthValues = [1000, 4500, 7000];

    const challenges = [
        { task: "Task 1", amountHave: 0, amountNeeded: 10, worth: 1000, completed: false },
        { task: "Task 2", amountHave: 0, amountNeeded: 20, worth: 1000, completed: false },
        { task: "Task 3", amountHave: 0, amountNeeded: 15, worth: 1000, completed: false },
        { task: "Task 4", amountHave: 0, amountNeeded: 25, worth: 1000, completed: false },
        { task: "Task 5", amountHave: 0, amountNeeded: 30, worth: 1000, completed: false },
        { task: "Task 6", amountHave: 0, amountNeeded: 35, worth: 1000, completed: false },
        { task: "Task 7", amountHave: 0, amountNeeded: 40, worth: 1000, completed: false },
        { task: "Task 8", amountHave: 0, amountNeeded: 50, worth: 1000, completed: false }
    ];

    function updateProgressBar() {
        const progressPercentage = (totalProgress / maxProgress) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        rankDisplay.textContent = `Rank: ${Math.max(0, Math.floor(totalProgress / 10000))}`; // Adjust rank calculation to 0-30 levels
    }

    function renderChallenges() {
        challengesContainer.innerHTML = "";

        challenges.forEach((challenge, index) => {
            const challengeDiv = document.createElement("div");
            challengeDiv.classList.add("challenge");
            if (challenge.completed) {
                challengeDiv.classList.add("completed");
            }

            challengeDiv.addEventListener("click", () => {
                challenge.completed = !challenge.completed;
                if (challenge.completed) {
                    totalProgress += challenge.worth;
                    challengeDiv.classList.add("completed");
                } else {
                    totalProgress -= challenge.worth;
                    challengeDiv.classList.remove("completed");
                }
                updateProgressBar();
            });

            const taskSpan = document.createElement("span");
            taskSpan.textContent = challenge.task;
            taskSpan.classList.add("task-span");
            taskSpan.contentEditable = true;
            taskSpan.style.minWidth = "50px";
            taskSpan.addEventListener("input", (event) => {
                challenge.task = event.target.textContent;
                taskSpan.style.width = `${taskSpan.textContent.length + 1}ch`;
            });

            const amountSpan = document.createElement("span");
            amountSpan.textContent = `${challenge.amountHave}/${challenge.amountNeeded}`;
            amountSpan.classList.add("amount-span");
            amountSpan.contentEditable = true;
            amountSpan.style.minWidth = "50px";
            amountSpan.addEventListener("input", (event) => {
                const [amountHave, amountNeeded] = event.target.textContent.split("/").map(Number);
                challenge.amountHave = amountHave || 0;
                challenge.amountNeeded = amountNeeded || 0;
                amountSpan.style.width = `${amountSpan.textContent.length + 1}ch`;
                if (challenge.amountHave >= challenge.amountNeeded) {
                    challenge.completed = true;
                    totalProgress += challenge.worth;
                    challengeDiv.classList.add("completed");
                } else {
                    challenge.completed = false;
                    totalProgress -= challenge.worth;
                    challengeDiv.classList.remove("completed");
                }
                updateProgressBar();
            });

            const worthSpan = document.createElement("span");
            worthSpan.textContent = challenge.worth;
            worthSpan.classList.add("worth-span");
            worthSpan.style.backgroundColor = challenge.worth === 1000 ? "#4caf50" : challenge.worth === 4500 ? "#ff9800" : "#f44336";
            worthSpan.addEventListener("click", () => {
                const currentIndex = worthValues.indexOf(challenge.worth);
                challenge.worth = worthValues[(currentIndex + 1) % worthValues.length];
                worthSpan.textContent = challenge.worth;
                worthSpan.style.backgroundColor = challenge.worth === 1000 ? "#4caf50" : challenge.worth === 4500 ? "#ff9800" : "#f44336";
                updateProgressBar();
            });

            challengeDiv.appendChild(taskSpan);
            challengeDiv.appendChild(amountSpan);
            challengeDiv.appendChild(worthSpan);

            challengesContainer.appendChild(challengeDiv);
        });
    }

    updateProgressBar();
    renderChallenges();
});
