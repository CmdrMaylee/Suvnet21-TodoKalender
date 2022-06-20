document.addEventListener('DOMContentLoaded', main)
const activeDate = new Date()
todos = JSON.parse(localStorage.getItem("todos")) || [];

function main() {

    // Todos
    DisplayTodos(todos);

    // Calendar
    addEventListeners(activeDate)
    renderCalendarView()

    // Header
    headerCountNumOfTotalTodos()
}

function addEventListeners(date) {
    const newTodoForm = document.querySelector("#new-todo-form");
    newTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            date: e.target.elements.date.value,
        };

        if (!todo.date || !todo.content.trim()) {
            console.log(todo.date);
            console.log(todo.content.trim());
            alert("please provide both date input and todo input");
        } else {
            console.log("success");
            console.log(todo);
            todos.push(todo);
        }

        localStorage.setItem("todos", JSON.stringify(todos));

        // Reset the form
        e.target.reset();
        headerCountNumOfTotalTodos()
        renderCalendarView(date)

        DisplayTodos(todos);
    });

    const previousArrow = document.getElementById("previous-month-arrow")
    previousArrow.addEventListener('click', function () { decrementMonth(date) })

    const nextArrow = document.getElementById("next-month-arrow")
    nextArrow.addEventListener('click', function () { incrementMonth(date) })
}
