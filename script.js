// --- DOM Elements ---
const sectionsTrack = document.getElementById('sectionsTrack');
const sections = document.querySelectorAll('.editor-section');
const navItems = document.querySelectorAll('.nav-item');
const tabItems = document.querySelectorAll('.tab-item');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const sysConsole = document.getElementById('sysConsole');
const glow = document.getElementById('glow');
const themeBtn = document.getElementById('themeBtn');

const sectionOrder = ['about', 'experience', 'skills', 'education'];
let currentActiveIndex = 0;
let isThrottledScrollActive = false;

// --- Application Core Routing ---
function navigateToTargetSectionIndex(index) {
    if (index < 0 || index >= sectionOrder.length) return;
    
    currentActiveIndex = index;
    const currentTargetId = sectionOrder[currentActiveIndex];

    // Slide track Y-axis transformation
    sectionsTrack.style.transform = `translateY(-${currentActiveIndex * 100}%)`;

    // Visual active states update
    sections.forEach((sec, idx) => {
        sec.classList.toggle('active', idx === currentActiveIndex);
    });

    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-target') === currentTargetId);
    });

    tabItems.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-target') === currentTargetId);
    });

    typeConsole(`> Memory pointer shifted -> Buffered [${currentTargetId}.env]`);
}

// Map Clicks
[...navItems, ...tabItems].forEach(el => {
    el.addEventListener('click', () => {
        const targetIndex = sectionOrder.indexOf(el.getAttribute('data-target'));
        navigateToTargetSectionIndex(targetIndex);
    });
});

// --- Mouse Wheel Slide Engine ---
window.addEventListener('wheel', (event) => {
    const activeSectionElement = sections[currentActiveIndex];
    
    if (activeSectionElement.scrollHeight > activeSectionElement.clientHeight) {
        const sortingDirection = event.deltaY;
        const reachedPageFloor = (activeSectionElement.scrollHeight - activeSectionElement.scrollTop) <= (activeSectionElement.clientHeight + 5);
        const reachedPageCeiling = activeSectionElement.scrollTop === 0;
        
        if (sortingDirection > 0 && !reachedPageFloor) return;
        if (sortingDirection < 0 && !reachedPageCeiling) return;
    }

    if (isThrottledScrollActive) return;

    if (event.deltaY > 30) {
        if (currentActiveIndex < sectionOrder.length - 1) {
            triggerThrottledSlideTransition(currentActiveIndex + 1);
        }
    } else if (event.deltaY < -30) {
        if (currentActiveIndex > 0) {
            triggerThrottledSlideTransition(currentActiveIndex - 1);
        }
    }
}, { passive: true });

function triggerThrottledSlideTransition(targetIndex) {
    isThrottledScrollActive = true;
    navigateToTargetSectionIndex(targetIndex);
    setTimeout(() => { isThrottledScrollActive = false; }, 700); 
}

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.log(e));
        typeConsole('> Display mode expanded to fullscreen matrix.');
    } else {
        document.exitFullscreen();
        typeConsole('> Returned to standard window bounds.');
    }
});

// --- Environmental Ambient Utilities ---
window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const targetTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', targetTheme);
    typeConsole(`> Environment theme recompiled -> param:${targetTheme}`);
});

// --- Terminal Typing Logic ---
let typingInterval;
function typeConsole(text) {
    clearInterval(typingInterval);
    sysConsole.textContent = '';
    let i = 0;
    typingInterval = setInterval(() => {
        sysConsole.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(typingInterval);
    }, 25);
}

// Start Random execution loop telemetry
const networkLogs = [
    "> Cluster mapping: Kafka clusters operating at 100% execution boundaries.",
    "> Memory optimization: JVM garbage collector sweep released 0b leaks.",
    "> Event routing: Async pipeline threads handling partition sequences seamlessly.",
    "> Runtime Security: mTLS Handshake verified securely against connection parameters."
];
setInterval(() => {
    if (Math.random() > 0.6) typeConsole(networkLogs[Math.floor(Math.random() * networkLogs.length)]);
}, 7000);