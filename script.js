/* 
  CONFIGURATION 
*/

// Set this to true to unlock all cards for testing/preview!
const DEBUG_MODE = false;
// Mock date for testing (e.g., '02-10'). Set to null to use real date.
const TEST_DATE = null;

/* Logic Starts Here */

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const proposalPage = document.getElementById('proposal-page');
const celebrationPage = document.getElementById('celebration-page');
const weekGrid = document.getElementById('week-grid');

// Modal Elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.querySelector('.close-modal');

// No Button Logic
const noTexts = [
    "Try again 😜",
    "Nope, not allowed 😏",
    "You sure about that? 😆",
    "Haha, almost 😝",
    "Just click Yes! ❤️",
    "Nice try! 😂"
];

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);

    // Ensure button stays fixed/absolute
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;

    const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
    btnNo.innerText = randomText;
}

btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('click', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes Button & Celebration
btnYes.addEventListener('click', () => {
    proposalPage.classList.add('hidden');
    celebrationPage.classList.remove('hidden');

    // Trigger confetti/hearts
    createHearts();

    // Scroll to top
    window.scrollTo(0, 0);

    // Initialize Week Grid (Unlock logic)
    initWeekGrid();
});

// Particle Background
function createHearts() {
    const container = document.getElementById('particles-js');
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = Math.random() > 0.5 ? '💖' : '🌸';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500);
}

// Date Checking & Grid Logic
function getFormattedDate() {
    if (TEST_DATE) return TEST_DATE;
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}

function initWeekGrid() {
    const cards = document.querySelectorAll('.card');
    const currentMD = getFormattedDate();

    cards.forEach(card => {
        const dateStr = card.getAttribute('data-date');
        const title = card.getAttribute('data-title');
        const image = card.getAttribute('data-image');
        // Get the hidden content HTML from inside the card div
        const messageHtml = card.querySelector('.hidden-content').innerHTML;

        const isToday = currentMD === dateStr;
        const isUnlocked = DEBUG_MODE || isToday;

        const lockOverlay = card.querySelector('.lock-overlay');

        if (isUnlocked) {
            card.classList.remove('locked');
            if (lockOverlay) lockOverlay.classList.add('hidden');

            // Add click event for modal
            card.addEventListener('click', () => {
                openModal(title, image, messageHtml);
            });
        } else {
            card.classList.add('locked');
            if (lockOverlay) lockOverlay.classList.remove('hidden');

            // Locked click alert
            card.addEventListener('click', () => {
                // Remove listeners to avoid duplicates if re-init but init is called once.
                // Simpler: Just check class in click.
                if (card.classList.contains('locked')) {
                    alert(`Come back on ${title} (${dateStr})! 💕`);
                }
            });
        }
    });
}

function openModal(title, imageSrc, messageHtml) {
    modalTitle.innerText = title;
    modalImage.src = imageSrc;
    modalMessage.innerHTML = messageHtml; // Use innerHTML to support <br>
    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Start background hearts
createHearts();
