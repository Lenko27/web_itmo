document.addEventListener("DOMContentLoaded", () => {
    const addActivityButton = document.getElementById("addActivity");
    const clearActivitiesButton = document.getElementById("clearActivities");
    const generateTableButton = document.getElementById("generateTable");
    const todoList = document.getElementById("todoList");
    const selectedActivitiesTitle = document.getElementById("selectedActivitiesTitle");
    const scheduleTable = document.getElementById("scheduleTable");
    const scheduleTableBody = document.getElementById("scheduleTableBody");
    const errorMessage = document.getElementById("error-message");
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    function toggleSelectedActivitiesTitle() {
        if (activities.length > 0) {
            selectedActivitiesTitle.style.display = "block";
        } else {
            selectedActivitiesTitle.style.display = "none";
        }
    }

    function addActivity() {
        const selectedOption = document.getElementById("activity").value.split("|");
        const activityName = selectedOption[0];
        const activityTime = selectedOption[1];
        const activityStatus = selectedOption[2];
        const existingActivity = activities.find(a => a.time === activityTime);

        if (existingActivity) {
            errorMessage.textContent = "Активность на это время уже добавлена";
            return;
        }

        const newActivity = { name: activityName, time: activityTime, status: activityStatus };
        activities.push(newActivity);
        localStorage.setItem("activities", JSON.stringify(activities));
        errorMessage.textContent = "";
        updateTodoList();
        toggleSelectedActivitiesTitle();
    }

    function sortActivitiesByTime() {
        activities.sort((a, b) => {
            const [hA, minA] = a.time.split(":").map(Number);
            const [hB, minB] = b.time.split(":").map(Number);
            return hA - hB || minA - minB;
        });
    }

    function updateTodoList() {
        sortActivitiesByTime();
        todoList.innerHTML = activities.map(
            (activity, index) => `
                <div class="todo-item">
                    <p>${activity.time} - ${activity.name}</p>
                    <button class="remove-button" data-index="${index}">Удалить</button>
                </div>
            `
        ).join("");

        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach(button => {
            button.addEventListener("click", removeActivity);
        });
    }

    function removeActivity(event) {
        const activityIndex = parseInt(event.target.dataset.index, 10);
        activities.splice(activityIndex, 1);
        localStorage.setItem("activities", JSON.stringify(activities));
        updateTodoList();
        toggleSelectedActivitiesTitle();
    }

    function generateScheduleTable() {
        if (activities.length === 0) {
            errorMessage.textContent = "Список активностей пуст. Добавьте активности перед созданием таблицы.";
            scheduleTable.style.display = "none";
            return;
        }

        errorMessage.textContent = "";
        sortActivitiesByTime();
        scheduleTableBody.innerHTML = "";

        activities.forEach(activity => {
            const row = document.createElement("tr");

            const timeCell = document.createElement("td");
            timeCell.textContent = activity.time;
            row.appendChild(timeCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = activity.name;
            row.appendChild(nameCell);

            const statusCell = document.createElement("td");
            statusCell.textContent = activity.status;
            row.appendChild(statusCell);

            scheduleTableBody.appendChild(row);
        });

        scheduleTable.style.display = "block";
    }

    function clearActivities() {
        activities = [];
        localStorage.removeItem("activities");
        updateTodoList();
        scheduleTableBody.innerHTML = "";
        scheduleTable.style.display = "none";
        toggleSelectedActivitiesTitle();
        errorMessage.textContent = "";
    }

    function loadActivities() {
        if (activities.length > 0) {
            updateTodoList();
        }
        toggleSelectedActivitiesTitle();
        scheduleTable.style.display = "none";
    }

    addActivityButton.addEventListener("click", addActivity);
    clearActivitiesButton.addEventListener("click", clearActivities);
    generateTableButton.addEventListener("click", generateScheduleTable);
    loadActivities();
});
