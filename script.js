document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // THEME TOGGLE
    // =========================================
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun'); 
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }); 

    // =========================================
    // PROJECT GALLERY
    // =========================================
    const cards = document.querySelectorAll('.gallery-card');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentIndex = 0;

    function updateGallery() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'next', 'prev', 'hidden');

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    if (cards.length > 0) {
        rightBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateGallery();
        });

        leftBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateGallery();
        });

        updateGallery();
    }
});