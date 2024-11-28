let currentStart = Math.random() > 0.5 ? 10 : 20
const limit = 10;
const guestbookContainer = document.getElementById("guestbook-container");
const preloader = document.getElementById("preloader");
const loadMoreButton = document.getElementById("load-more");
const commentTemplate = document.getElementById("comment-template");

async function fetchComments(start = 0, limit) {
    const endpoint = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`;
    try {
        preloader.style.display = "block";
        loadMoreButton.style.display = "none";

        const timeout = new Promise(resolve => setTimeout(resolve, 3000));
        const response = await fetch(endpoint);
        await timeout;

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

    loadMoreButton.style.display = "inline-block";
}

loadMoreButton.addEventListener("click", async () => {
    const calculatedRandomLimit = limit * (Math.random() > 0.5 ? 0.5 : 2);
    currentStart += calculatedRandomLimit;
    await fetchComments(currentStart, calculatedRandomLimit);
});

document.addEventListener("DOMContentLoaded", async () => {
    await fetchComments(currentStart, limit);
});
