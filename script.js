// 1. Core State Engine Mapping for Tab Routing
const navItems = document.querySelectorAll('.nav-item');
const tabItems = document.querySelectorAll('.tab-item');
const sections = document.querySelectorAll('.editor-section');
const sysConsole = document.getElementById('sysConsole');

function switchEnvironmentTab(targetId) {
    // Drop execution focus arrays on all components
    navItems.forEach(item => item.classList.remove('active'));
    tabItems.forEach(tab => tab.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));

    // Highlight selected operational vectors
    const activeNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    const activeTab = document.getElementById(`tab-${targetId}`);
    const activeSection = document.getElementById(targetId);

    if(activeNav) activeNav.classList.add('active');
    if(activeTab) activeTab.classList.add('active');
    if(activeSection) {
        activeSection.classList.add('active');
        // Instantly snap internal canvas scope safely back to top frame lines
        document.querySelector('.editor-stage').scrollTop = 0;
    }

    // Output real-time diagnostic stream telemetry
    sysConsole.textContent = `> Cat pipeline initialized successfully: opening standard stream stack context // ${targetId}.env`;
}

// Attach event listeners to sidebar list trees
navItems.forEach(item => {
    item.addEventListener('click', () => {
        switchEnvironmentTab(item.getAttribute('data-target'));
    });
});

// Attach event listeners to top horizontal control bar tabs
tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
        switchEnvironmentTab(tab.getAttribute('data-target'));
    });
});

// 2. Interactive Backglow Tracking Matrix
const glow = document.getElementById('glow');
window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// 3. Environment Dark/Light Hardware State Toggle Controls
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', targetTheme);
    sysConsole.textContent = `> UI Theme vector reset. Active state compiled parameters -> theme:${targetTheme}`;
});

// 4. Randomized Live Execution Threads inside System Footer Bar
const networkLogs = [
    "> Cluster mapping: Kafka clusters operating at 100% execution boundaries.",
    "> Memory optimization: JVM garbage collector sweep released 0b leaks.",
    "> Event routing: Async pipeline threads handling partition sequences seamlessly.",
    "> Runtime Security: mTLS Handshake verified securely against connection parameters."
];
setInterval(() => {
    if (Math.random() > 0.6) {
        sysConsole.textContent = networkLogs[Math.floor(Math.random() * networkLogs.length)];
    }
}, 4500);