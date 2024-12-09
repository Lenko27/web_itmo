(function () {
    window.addEventListener('load', function () {
        const performanceEntry = performance.getEntriesByType('navigation')[0];
        if (performanceEntry) {
            let loadTime = performance.now();
            let footer = document.querySelector('footer');
            let info = document.createElement('p');
            info.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
            footer.appendChild(info);
        }
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    let curPage = window.location.pathname;
    let navButtons = document.querySelectorAll(".nav__button");
    navButtons.forEach(button => {
        let buttonPage = new URL(button.href).pathname;
        if (buttonPage === curPage) {
            button.classList.add("active");
        }
    });
});

