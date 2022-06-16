window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      date: e.target.elements.date.value,
    };

    if (!todo.date || !todo.content.trim()) {
      console.log("no values");
      alert("please provide both date input and todo input");
    } else {
      console.log("success");
      console.log(todo);
      todos.push(todo);
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    // Reset the form
    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const label = document.createElement("label");
    const input = document.createElement("input");
    // const dateInput = document.createElement("dateInput");
    const content = document.createElement("div");
    const date = document.createElement("div");
    const actions = document.createElement("div");
    // const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    content.classList.add("todo-content");

    date.classList.add("todo-date");

    actions.classList.add("actions");
    // edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<div class="div-todo"> ${todo.content}<br>${todo.date}<br><div></div></div>`;
    // `<div class="div-todo"> ${todo.date}</div>`;
    // date.innerHTML = `<input type="text" value="${todo.date}" >`;
    // edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    // label.appendChild(dateInput);
    label.appendChild(date);
    // actions.appendChild(edit);
    actions.appendChild(deleteButton);
    // todoItem.appendChild(label);
    // todoItem.appendChild(input);
    todoItem.appendChild(date);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    // edit.addEventListener("click", (e) => {
    //   const input = content.querySelector("input");
    //   input.removeAttribute("readonly");
    //   input.focus();
    //   input.addEventListener("blur", (e) => {
    //     input.setAttribute("readonly", true);
    //     todo.content = e.target.value;
    //     localStorage.setItem("todos", JSON.stringify(todos));
    //     DisplayTodos();
    //   });
    // });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
