// Selecting the important HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const messageBox = document.getElementById("messageBox");

// This array stores all task objects
let tasks = [];

// Different card styles are used to make the task wall look like notes
const noteStyles = ["steel", "navy", "amber", "mint"];

// Load tasks from localStorage when the page opens
function loadTasks() {
    const savedTasks = localStorage.getItem("urbanTaskWallTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        // Some starter tasks are added only the first time to show the design.
        tasks = [
            { text: "Finish JavaScript assignment", completed: true },
            { text: "Practice DOM manipulation", completed: false },
            { text: "Study for upcoming quiz", completed: false },
            { text: "Review localStorage concept", completed: true },
            { text: "Design To-Do List UI", completed: false },
            { text: "Read assignment requirements", completed: true }
        ];
        saveTasks();
    }
}

// Save task array to localStorage
function saveTasks() {
    localStorage.setItem("urbanTaskWallTasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        messageBox.textContent = "Please enter a task.";
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    messageBox.textContent = "";
}

// Delete a task by its index
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Mark a task as completed or not completed
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Update the total, completed, and pending numbers
function updateStats() {
    const completedCount = tasks.filter(function(task) {
        return task.completed;
    }).length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completedCount;
    pendingTasks.textContent = tasks.length - completedCount;
}

// Show all tasks on the page
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-text">No tasks yet. Add your first task above.</li>';
        updateStats();
        return;
    }

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        const styleName = noteStyles[index % noteStyles.length];

        li.className = "task-card " + styleName;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-content">
                <input class="task-checkbox" type="checkbox" ${task.completed ? "checked" : ""}>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" type="button">Delete</button>
        `;

        const checkbox = li.querySelector(".task-checkbox");
        const deleteBtn = li.querySelector(".delete-btn");

        checkbox.addEventListener("change", function() {
            toggleComplete(index);
        });

        deleteBtn.addEventListener("click", function() {
            deleteTask(index);
        });

        taskList.appendChild(li);
    });

    updateStats();
}

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
 taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Start the app
loadTasks();
renderTasks();
