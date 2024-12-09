const toaster = document.getElementById('toaster');
const buyTicketButton = document.getElementById('buyTicketButton');
buyTicketButton.addEventListener('click', () => {
    toaster.classList.add('show');

    setTimeout(() => {
        toaster.classList.remove('show');
    }, 3000);
});