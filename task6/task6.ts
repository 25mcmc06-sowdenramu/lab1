enum TaskStatus {
  Pending = "Pending",
  Completed = "Completed"
}

class Task {
  text: string;
  completed: boolean;
  dueDate: Date | null;

  constructor(text: string, dueDate: Date | null = null) {
    this.text = text;
    this.completed = false;
    this.dueDate = dueDate;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }
}

let tasks: Task[] = [];

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const dueDateInput = document.getElementById("dueDateInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filters button");

addBtn.addEventListener("click", (): void => {
  const taskText: string = taskInput.value.trim();
  const dueDate: string = dueDateInput.value;

  if (taskText === "") return;

  const newTask = new Task(taskText, dueDate ? new Date(dueDate) : null);
  tasks.push(newTask);

  taskInput.value = "";
  dueDateInput.value = "";
  renderTasks();
});

function renderTasks(filter: "all" | "completed" | "pending" = "all"): void {
  taskList.innerHTML = "";

  tasks.sort((a: Task, b: Task): number => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  tasks.forEach((task: Task, index: number): void => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li: HTMLLIElement = document.createElement("li");

    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    if (task.dueDate) {
      const dateSpan: HTMLSpanElement = document.createElement("span");
      dateSpan.classList.add("due-date");
      dateSpan.textContent = `(Due: ${task.dueDate.toDateString()})`;
      span.appendChild(dateSpan);
    }

    const completeBtn: HTMLButtonElement = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.addEventListener("click", (): void => {
      tasks[index].toggleCompletion();
      renderTasks(filter);
    });

    const deleteBtn: HTMLButtonElement = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (): void => {
      tasks.splice(index, 1);
      renderTasks(filter);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

filterButtons.forEach((button: HTMLButtonElement): void => {
  button.addEventListener("click", (): void => {
    renderTasks(button.dataset.filter as "all" | "completed" | "pending");
  });
});
