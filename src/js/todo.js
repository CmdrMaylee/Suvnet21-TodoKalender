let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else if (dateInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Date cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = (date) => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    if (date) {
      /* const filterDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      const checkThisDate = x.date */
      let filterDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      filterDate =
        filterDate.getFullYear() +
        "-" +
        ("0" + (filterDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + filterDate.getDate()).slice(-2);
      const checkThisDate = x.date;
      if (filterDate == checkThisDate) {
        // console.log("Matched!")
        return (tasks.innerHTML += `
      <div id=${y} class="todo-task">
          <span class="fw-bold">${x.text}</span>
          <br>
          <span class="purple">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit hover"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt hover"></i>
          </span>
        </div>
    `);
      }
    } else if (!date) {
      console.log("No date, printing default");
      return (tasks.innerHTML += `
    <div id=${y} class="todo-task">
          <span class="fw-bold">${x.text}</span>
          <br>
          <span class="purple">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit hover"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt hover"></i>
          </span>
        </div>
    `);
    }
  });
  headerCountNumOfTotalTodos();
  renderCalendarView();
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  headerCountNumOfTotalTodos();
  renderCalendarView();
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

function emptyTodoView() {
  const todoList = document.getElementById("tasks");
  while (todoList.lastChild) {
    todoList.removeChild(todoList.lastChild);
  }
}

function createLocalStorageIfMissing() {
  if (!localStorage.getItem("data")) {
    localStorage.setItem("data", "[]");
    return;
  }
}

function printTodos(date) {
  if (date) {
    createTasks(date);
  } else {
    createTasks();
  }
}
