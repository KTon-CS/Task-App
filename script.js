// Array of categories with their titles and associated images
let categories = [
  {
    title: "Personal",
    img: "lock.png",
  },
  {
    title: "Work",
    img: "working.png",
  },
  {
    title: "Shopping",
    img: "bags.png",
  },
  {
    title: "Coding",
    img: "coding.png",
  },
  {
    title: "Health",
    img: "health.png",
  },
  {
    title: "Fitness",
    img: "muscles.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Finance",
    img: "money.png",
  },
];

// Array of tasks with unique IDs, task descriptions, categories, and completion status
let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  // Additional tasks go here...
  {
    id: 25,
    task: "Review investment portfolio",
    category: "Finance",
    completed: false,
  },
];

// Function to save tasks to localStorage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to retrieve tasks from localStorage
const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal) {
    tasks = tasksLocal;
  }
};

// Function to toggle the visibility of the category screen
const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

// Function to update the task count for the selected category and overall total
const updateTotals = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  numTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

// Function to render the list of categories
const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    // Filter tasks by category
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );

    // Create a new div for each category
    const div = document.createElement("div");
    div.classList.add("category");

    // Event listener to toggle category view and update tasks
    div.addEventListener("click", () => {
      screenWrapper.classList.toggle("show-category");
      selectedCategory = category;
      updateTotals();
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
    });

    // HTML content for the category div
    div.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasks.length} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </div>
      </div>
    `;

    // Append the category div to the categories container
    categoriesContainer.appendChild(div);
  });
};

// Function to render the list of tasks for the selected category
const renderTasks = () => {
  tasksContainer.innerHTML = "";

  // Filter tasks by the selected category
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  // Check if there are no tasks for the selected category
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
  } else {
    // Loop through the tasks and create HTML elements for each task
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");

      // Create label for task with checkbox and text
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;

      // Event listener to toggle task completion status
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });

      // HTML content for the task label
      label.innerHTML = `
        <span class="checkmark"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
        <p>${task.task}</p>
      `;

      // Prepend the checkbox to the label
      label.prepend(checkbox);
      // Prepend the label to the task div
      div.prepend(label);

      // HTML content for the delete button
      div.innerHTML += `
        <div class="delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      `;

      // Append the task div to the tasks container
      tasksContainer.appendChild(div);

      // Event listener to delete a task
      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
      });
    });

    // Re-render categories and update task totals after task actions
    renderCategories();
    updateTotals();
  }
};

// Function to toggle the visibility of the Add Task form
const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

// Function to add a new task to the list
const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  // Check if the task input is empty
  if (task === "") {
    alert("Please enter a task");
  } else {
    // Create a new task object
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    // Clear the input field
    taskInput.value = "";
    // Add the new task to the tasks array
    tasks.push(newTask);
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  }
};

// Initialize variables and select DOM elements
let selectedCategory = categories[0];
const categoriesContainer = document.querySelector(".categories");
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const tasksContainer = document.querySelector(".tasks");
const numTasks = document.getElementById("num-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const categorySelect = document.getElementById("category-select");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.getElementById("total-tasks");

// Attach event listeners to buttons and elements
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);

// Render the initial state of the app
getLocal();
renderTasks();
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});
