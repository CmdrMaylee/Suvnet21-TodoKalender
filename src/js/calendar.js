/* DEFAULTS */

function decrementMonth(date) {
    date.setMonth(date.getMonth() - 1);
    renderCalendarView(date);
}

function incrementMonth(date) {
    date.setMonth(date.getMonth() + 1);
    renderCalendarView(date);
}

/* RENDER ELEMENTS */


function renderCalendarView() {
    renderMonthHeader(activeDate)
    emptyCalendar()
    fillCalendar(activeDate)
}

function renderMonthHeader(date) {
    document.getElementById("current-year-and-month").innerHTML =
        date.getFullYear() + "/" + convertMonth(date.getMonth());
}

function renderEmptyDayBlock() {
    let emptyBlock = document.createElement("div");
    emptyBlock.className = "day-block dim-day";
    const calendarView = document.getElementById("calendar-view");
    calendarView.appendChild(emptyBlock);
}

function renderNumberedDay(date, num) {
    let dayBlock = document.createElement("div");
    dayBlock.className = "day-block";
    dayBlock.innerHTML = num;

    const thisDaysTodoArray = countTodosForDayBlock(date, num);
    // console.log(date.getMonth() + ' on the ' + num + ' has ' + thisDaysTodoCount.length + ' many todos')

    if (thisDaysTodoArray.length !== 0) {
        let selectedDate = new Date(date);
        selectedDate.setDate(num)
        selectedDate = formatDate(selectedDate)
        let todoCounterOnDay = document.createElement("div");
        todoCounterOnDay.addEventListener("click", () => {
            emptyTodoView();
            if (selectedDateForTodos === "" || selectedDateForTodos !== selectedDate) {
                selectedDateForTodos = selectedDate;
                let dateConvert = new Date(selectedDate)
                printTodos(dateConvert);
            } else {
                selectedDateForTodos = "";
                printTodos();
            }
            console.log('Selected date: ' + selectedDate)
        })
        todoCounterOnDay.className = "todo-count";
        todoCounterOnDay.innerHTML = thisDaysTodoArray.length;
        dayBlock.appendChild(todoCounterOnDay);
    }

    const calendarView = document.getElementById("calendar-view");
    calendarView.appendChild(dayBlock);
}

/* MANIPULATE CALENDAR */

function emptyCalendar() {
    const calendar = document.getElementById("calendar-view");
    while (calendar.lastChild) {
        calendar.removeChild(calendar.lastChild);
    }
}

function fillCalendar(date) {
    const firstDayOfMonth = getFirstDayOfMonthReturnDate(date);
    const currentMonthDayCount = getLastDayOfMonthReturnDate(date);

    let totalElements = 0;
    let dayCount = 1;
    for (let i = 1; dayCount <= currentMonthDayCount.getDate(); i++) {
        if (i < firstDayOfMonth.getDay()) {
            renderEmptyDayBlock();
        } else {
            renderNumberedDay(date, dayCount);
            dayCount += 1;
        }
        totalElements++;
    }

    while (totalElements % 7 != 0) {
        renderEmptyDayBlock();
        totalElements++;
    }
}

/* CALENDAR HELPERS */

function countTodosForDayBlock(date, dayNum) {
    const allTodos = JSON.parse(localStorage.getItem("data"));
    let result = [];
    for (const todo of allTodos) {
        const todoDate = new Date(todo.date);
        if (
            todoDate.getFullYear() === date.getFullYear() &&
            todoDate.getMonth() === date.getMonth() &&
            todoDate.getDate() === dayNum
        ) {
            result.push(todo);
        }
    }
    return result;
}

function getFirstDayOfMonthReturnDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getLastDayOfMonthReturnDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * 
 * @param {Date} date 
 */
function formatDate(date) {
    let filterDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    filterDate = filterDate.getFullYear() + '-' + ('0' + (filterDate.getMonth() + 1)).slice(-2) + '-' + ('0' + filterDate.getDate()).slice(-2);
    return filterDate
}

function convertMonth(monthNum) {
    switch (monthNum) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return NaN;
    }
}