let tasks = []; // Array to store tasks

const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

// Add task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false,
    dueDate: dueDate ? new Date(dueDate) : null
  });

  taskInput.value = "";
  dueDateInput.value = "";
  renderTasks();
});

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  // Sort tasks by due date
  tasks.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate - b.dueDate;
  });

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    // Due date
    if (task.dueDate) {
      const dateSpan = document.createElement("span");
      dateSpan.classList.add("due-date");
      dateSpan.textContent = `(Due: ${task.dueDate.toDateString()})`;
      span.appendChild(dateSpan);
    }

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(filter);
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks(filter);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    renderTasks(button.dataset.filter);
  });
});
