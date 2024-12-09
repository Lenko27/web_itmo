let currentStart = 0;
const limit = 10;
const guestbookContainer = document.getElementById("guestbook-container");
const preloader = document.getElementById("preloader");
const loadMoreButton = document.getElementById("load-more");
const commentTemplate = document.getElementById("comment-template");

async function fetchComments(start = 0, limit = 10) {
    const endpoint = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`;
    try {
        preloader.style.display = "block";
        loadMoreButton.style.display = "none";

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const comments = await response.json();
        renderComments(comments);
    } catch (error) {
        displayError("⚠ Что-то пошло не так. Проверьте подключение к интернету.");
        console.error(error);
    } finally {
        preloader.style.display = "none";
    }
}

function renderComments(comments) {
    if (!comments.length) {
        loadMoreButton.style.display = "none";
        return;
    }

    comments.forEach((comment) => {
        const commentElement = document.importNode(commentTemplate.content, true);
        commentElement.querySelector("h3").textContent = comment.title;
        commentElement.querySelector("p").textContent = comment.body;
        guestbookContainer.appendChild(commentElement);
    });

    ScrollReveal().reveal('.comment', {
        origin: 'bottom',
        distance: '50px',
        duration: 750,
        interval: 200,
        reset: false
    });

    loadMoreButton.style.display = "inline-block";
}

function displayError(message) {
    const errorElement = document.createElement("p");
    errorElement.textContent = message;
    errorElement.style.color = "red";
    guestbookContainer.appendChild(errorElement);
}

loadMoreButton.addEventListener("click", async () => {
    currentStart += limit;
    await fetchComments(currentStart, limit);
});

document.addEventListener("DOMContentLoaded", async () => {
    await fetchComments(currentStart, limit);
});
