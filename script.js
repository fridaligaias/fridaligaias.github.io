document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // PARTICLES.JS CONFIGURATION 
    // =========================================
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 150, 
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": {
                    "value": "#a277ff" 
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.4, 
                    "random": false,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#a277ff",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.7, 
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" 
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" 
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": { "opacity": 0.5 }
                    },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

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
    const modalTitle = document.getElementById('demoModalTitle');
    const modalText = document.getElementById('demoModalText');
    const modalLink = document.getElementById('demoModalLink');
    const closeModal = document.querySelector('.close-modal');

    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stops the document click listener from firing immediately
            const title = btn.getAttribute('data-demo-title') || 'Demo Information';
            const text = btn.getAttribute('data-demo-text');
            const link = btn.getAttribute('data-demo-link');
            const linkLabel = btn.getAttribute('data-demo-link-label') || 'Open Link';
            if (modalTitle) {
                modalTitle.textContent = title;
            }
            modalText.textContent = text;
            if (modalLink) {
                if (link) {
                    modalLink.href = link;
                    modalLink.querySelector('span').textContent = linkLabel;
                    modalLink.classList.add('show-link');
                } else {
                    modalLink.removeAttribute('href');
                    modalLink.classList.remove('show-link');
                }
            }
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
    // CONTACT FORM MODE
    // =========================================
    const generalEnquiryToggle = document.getElementById('generalEnquiryToggle');
    const projectFields = document.getElementById('projectFields');
    const messageLabel = document.getElementById('messageLabel');
    const enquiryType = document.querySelector('select[name="enquiry_type"]');

    const updateContactFormMode = () => {
        if (!generalEnquiryToggle || !projectFields || !messageLabel) {
            return;
        }

        const isGeneral = generalEnquiryToggle.checked;
        const enquiryValue = enquiryType ? enquiryType.value : '';
        const hidesProjectFields = isGeneral ||
            enquiryValue === 'Full-time Employment Opportunity' ||
            enquiryValue === 'Speaking, Event or Networking';

        if (enquiryType) {
            enquiryType.classList.toggle('is-hidden', isGeneral);
            enquiryType.disabled = isGeneral;
            enquiryType.required = !isGeneral;
            if (isGeneral) {
                enquiryType.value = '';
            }
        }
        projectFields.classList.toggle('is-hidden', hidesProjectFields);
        projectFields.querySelectorAll('input, select, textarea').forEach(field => {
            field.disabled = hidesProjectFields;
        });
        messageLabel.textContent = hidesProjectFields ? 'Share your thoughts' : 'Tell me about the project';
    };

    if (generalEnquiryToggle) {
        generalEnquiryToggle.addEventListener('change', updateContactFormMode);
        if (enquiryType) {
            enquiryType.addEventListener('change', updateContactFormMode);
        }
        updateContactFormMode();
    }

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
