document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    // Optional: Sound Effects
    const addSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");
    const deleteSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3");

    // Add Task on Button Click
    addBtn.addEventListener("click", addTask);

    // Add Task on Enter Key
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = input.value.trim();

        if (!taskText) {
            highlightInput();
            return;
        }

        // Prevent duplicate tasks
        if (isDuplicate(taskText)) {
            alert("Task already exists!");
            return;
        }

        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="buttons">
                <i class="fa-solid fa-check complete-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        `;

        taskList.appendChild(li);

        // Play add sound
        addSound.play();

        // Smooth appearance
        setTimeout(() => {
            li.classList.add("show");
        }, 10);

        // Complete task
        li.querySelector(".complete-btn").addEventListener("click", () => {
            li.classList.toggle("completed");

            // Completed animation pulse
            li.classList.add("pulse");
            setTimeout(() => li.classList.remove("pulse"), 500);
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.classList.add("delete-anim");

            // Sound
            deleteSound.play();

            setTimeout(() => li.remove(), 350);
        });

        input.value = "";
    }

    // Function to highlight input when empty
    function highlightInput() {
        input.style.border = "2px solid #ff5d5d";
        input.style.boxShadow = "0 0 10px #ff4d4d";
        setTimeout(() => {
            input.style.border = "none";
            input.style.boxShadow = "none";
        }, 600);
    }

    // Check duplicates
    function isDuplicate(task) {
        const tasks = document.querySelectorAll(".task-text");
        return [...tasks].some(t => t.textContent.toLowerCase() === task.toLowerCase());
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const dateInput = document.getElementById("taskDate");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const filterBtns = document.querySelectorAll(".filter-btn");

    addBtn.addEventListener("click", addTask);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = input.value.trim();
        const taskDate = dateInput.value;

        if (!taskText) return highlightInput(input);
        if (!taskDate) return highlightInput(dateInput);

        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <div class="task-info">
                <span class="task-text">${taskText}</span>
                <p class="task-time">
                    <i class="fa-solid fa-clock"></i> 
                    ${formatDate(taskDate)}
                </p>
            </div>

            <div class="buttons">
                <i class="fa-solid fa-check complete-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        `;

        taskList.appendChild(li);

        input.value = "";
        dateInput.value = "";

        // Complete task
        li.querySelector(".complete-btn").addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });
    }

    /* Highlight wrong input */
    function highlightInput(el) {
        el.style.border = "2px solid #ff5d5d";
        setTimeout(() => el.style.border = "none", 600);
    }

    /* Convert datetime-local format */
    function formatDate(dateString) {
        const d = new Date(dateString);
        return d.toLocaleString();
    }

    /* ------------------- FILTERING ------------------- */
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".filter-btn.active").classList.remove("active");
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            document.querySelectorAll(".task-item").forEach(task => {
                if (filter === "all") {
                    task.style.display = "flex";
                } 
                else if (filter === "completed") {
                    task.style.display = task.classList.contains("completed") ? "flex" : "none";
                } 
                else if (filter === "pending") {
                    task.style.display = task.classList.contains("completed") ? "none" : "flex";
                }
            });
        });
    });

});



