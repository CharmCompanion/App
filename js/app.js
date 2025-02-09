function initApp() {
    switchTab('lich');
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
}

// Initialize the app
document.addEventListener("DOMContentLoaded", initApp);
