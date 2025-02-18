// Sample leaderboard data
let leaderboard = [
    { name: "Alice", id: "00001", score: 600 },
    { name: "Bob", id: "00002", score: 550 },
    { name: "Charlie", id: "00003", score: 500 },
    { name: "David", id: "00004", score: 300 },
    { name: "Eve", id: "00005", score: 100 }
];

// Function to calculate trophies (1 trophy per 500 points)
function getTrophies(score) {
    return "🏆".repeat(Math.floor(score / 200));
}

// Function to render leaderboard
function renderLeaderboard(filteredData = leaderboard) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Clear existing data

    filteredData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.id}</td>
            <td>${entry.score}</td>
            <td>${getTrophies(entry.score)}</td> <!-- Trophies Column -->
        `;

        // Add event listener to open popup when clicking a row
        row.addEventListener("click", () => openPlayerModal(entry));

        leaderboardBody.appendChild(row);
    });
}

// Function to open player modal
function openPlayerModal(player) {
    document.getElementById("playerName").innerText = player.name;
    document.getElementById("playerid").innerText = player.id; // FIXED: Replaced player.email with player.id
    document.getElementById("playerScore").innerText = player.score;
    document.getElementById("playerTrophies").innerText = getTrophies(player.score);

    // Show the modal
    document.getElementById("playerModal").style.display = "flex";

    // Generate a score trend chart
    createScoreChart(player);
}

let scoreChartInstance; // Store chart instance globally

// Function to create a chart
function createScoreChart(player) {
    const ctx = document.getElementById("scoreChart").getContext("2d");

    // Dummy score data for chart
    const scoreHistory = {
        "Alice": [800, 1000, 1200, 1400, 1500],
        "Bob": [500, 700, 900, 1100, 1200],
        "Charlie": [600, 750, 850, 950, 1000],
        "David": [400, 600, 750, 850, 900],
        "Eve": [300, 500, 650, 750, 800]
    };

    // Destroy existing chart before creating a new one
    if (scoreChartInstance) {
        scoreChartInstance.destroy();
    }

    scoreChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            datasets: [{
                label: `${player.name}'s Score Trend`,  // Use backticks for template literals
                data: scoreHistory[player.name] || [500, 700, 900, 1100, 1200],  // Default data if no score history
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }]
            
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Function to close the modal when the close button is clicked
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("playerModal").style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    const modal = document.getElementById("playerModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initial render of the leaderboard
renderLeaderboard();