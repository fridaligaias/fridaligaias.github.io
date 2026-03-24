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
    // DEMO MODAL LOGIC
    // =========================================
    const demoBtns = document.querySelectorAll('.demo-btn');
    const modal = document.getElementById('demoModal');
    const modalText = document.getElementById('demoModalText');
    const closeModal = document.querySelector('.close-modal');

    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stops the document click listener from firing immediately
            const text = btn.getAttribute('data-demo-text');
            modalText.textContent = text;
            modal.classList.add('show-modal');
        });
    });

    const hideModal = () => {
        modal.classList.remove('show-modal');
    };

    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    document.addEventListener('click', (e) => {
        if (modal && modal.classList.contains('show-modal') && !modal.contains(e.target)) {
            hideModal();
        }
    });
});