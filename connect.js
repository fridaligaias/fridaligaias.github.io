document.addEventListener('DOMContentLoaded', () => {
    const switches = document.querySelectorAll('.qr-switch');
    const panels = document.querySelectorAll('.qr-panel');

    switches.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-qr-target');

            switches.forEach(item => {
                const isActive = item === button;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-selected', String(isActive));
            });

            panels.forEach(panel => {
                const isActive = panel.id === targetId;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            });
        });
    });
});
