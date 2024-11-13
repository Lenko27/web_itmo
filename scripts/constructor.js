document.addEventListener("DOMContentLoaded", () => {
    const addActivityButton = document.getElementById("addActivity");
    const clearActivitiesButton = document.getElementById("clearActivities");
    const generateTableButton = document.getElementById("generateTable");
    const todoList = document.getElementById("todoList");
    const scheduleTable = document.getElementById("scheduleTable");
    const errorMessage = document.getElementById("error-message");
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

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
            activity => `<p>${activity.time} - ${activity.name}</p>`
        ).join("");
    }

    function generateScheduleTable() {
        sortActivitiesByTime();
        scheduleTable.innerHTML = `
            <table class="zoo-table">
                <thead>
                    <tr>
                        <th>Время</th>
                        <th>Активность</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    ${activities.map(activity => `
                        <tr>
                            <td>${activity.time}</td>
                            <td>${activity.name}</td>
                            <td>${activity.status}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    function clearActivities() {
        activities = [];
        localStorage.removeItem("activities");
        updateTodoList();
        scheduleTable.innerHTML = "";
        errorMessage.textContent = "";
    }

    function loadActivities() {
        if (activities.length > 0) updateTodoList();
    }

    addActivityButton.addEventListener("click", addActivity);
    clearActivitiesButton.addEventListener("click", clearActivities);
    generateTableButton.addEventListener("click", generateScheduleTable);
    loadActivities();
});
