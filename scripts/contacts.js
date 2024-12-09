const toaster = document.getElementById('toaster');
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toaster.classList.add('show');

    setTimeout(() => {
    toaster.classList.remove('show');
}, 3000);
});