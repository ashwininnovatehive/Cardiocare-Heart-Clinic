document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const lyricElement = document.getElementById('lyric-line');
    const endingOverlay = document.getElementById('ending-overlay');
    const timerElement = document.getElementById('timer');
    const countdownElement = document.getElementById('countdown');
    const mainContainer = document.getElementById('main-container');

    // Target date: 16th Jan 2026 00:00 IST
    const targetDate = new Date('2026-01-16T00:00:00+05:30');

    // Lyrics array with emojis
    const lyrics = [
        "Mrig-naini tu na jaane 👀✨",
        "Prem kitna mere mann mein hai 💛",
        "Yeh bechaini maangti hai 💓",
        "Roop jo tere yauvan mein hai 🌸",
        "Tera phool sa hai ang 🌼",
        "Tere ang mein hai rang 🎨",
        "X",
        "Tere rang ke main sang goriye 💫",
        "Tere rang mein hai roop 🌈",
        "Tere roop mein hai dhoop ☀️",
        "Teri dhoop hai anoop goriye ✨",
        "Sajna se kaahe aaye laaj sajni 🙈",
        "Chhoone de ang mohe aaj sajni 🤍",
        "Dhoom taana ta dhoom ta na na na 🎶",
        "Dhoom taana ta dhoom ta na na na 🎵",
        "Dhoom taana de na de na 💃"
    ];

    let currentLyricIndex = 0;

    // Update countdown timer
    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            countdownElement.style.display = 'none';
            mainContainer.style.display = 'block';
            start();
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        setTimeout(updateTimer, 1000);
    }

    // Add sparkles with hearts
    function addSparkles() {
        const sparklesContainer = document.querySelector('.sparkles');
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.textContent = Math.random() > 0.5 ? '✨' : '💛';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparklesContainer.appendChild(sparkle);
        }
    }

    // Start the experience
    function start() {
        addSparkles();
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
        displayLyrics();
    }

    // Display lyrics sequentially
    function displayLyrics() {
        if (currentLyricIndex < lyrics.length) {
            lyricElement.textContent = lyrics[currentLyricIndex];
            lyricElement.style.animation = 'none';
            setTimeout(() => {
                lyricElement.style.animation = 'lyricFade 4s ease-in-out';
            }, 10);
            currentLyricIndex++;
            setTimeout(displayLyrics, 4000); // 4s per line
        } else {
            setTimeout(() => {
                endingOverlay.classList.add('active');
            }, 2000);
        }
    }

    // Start countdown
    updateTimer();
});