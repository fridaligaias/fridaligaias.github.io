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

    // =========================================
    // CONTACT FORM AJAX SUBMISSION
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const successToast = document.getElementById('successToast');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                if (response.status == 200) {
                    // SUCCESS: Show Toast
                    successToast.classList.add('show');
                    contactForm.reset(); // Clear the form
                    // Hide toast after 4 seconds
                    setTimeout(() => {
                        successToast.classList.remove('show');
                    }, 4000);
                } else {
                    alert("Something went wrong. Please try again.");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Submission failed.");
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }    

});