document.addEventListener('DOMContentLoaded', main)

function main() {
    const activeDate = new Date()

    // Todos
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    DisplayTodos();

    // Calendar
    addEventListeners(activeDate)
    renderCalendarView(activeDate)

    // Header
    headerCountNumOfTotalTodos()



    addEventListeners()
}

function addEventListeners() {
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

        DisplayTodos();
    });

    const previousArrow = document.getElementById("previous-month-arrow")
    previousArrow.addEventListener('click', function () { decrementMonth(date) })

    const nextArrow = document.getElementById("next-month-arrow")
    nextArrow.addEventListener('click', function () { incrementMonth(date) })

    const allDeleteButtons = document.getElementsByClassName('delete')
    console.log(allDeleteButtons)
    for (const button of allDeleteButtons) {
        button.addEventListener("click", (date) => {
            todos = todos.filter((t) => t != todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            headerCountNumOfTotalTodos()
            renderCalendarView(date)
            DisplayTodos();
        });
    }
}