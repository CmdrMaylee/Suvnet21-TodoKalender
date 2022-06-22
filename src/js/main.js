document.addEventListener("DOMContentLoaded", main);
const activeDate = new Date();
let selectedDateForTodos = "";
todos = JSON.parse(localStorage.getItem("data")) || [];

function main() {
  // Startup
  // createLocalStorageIfMissing();

  // Todos

  // Calendar
  addEventListeners(activeDate);
  renderCalendarView();

  // Header
  headerCountNumOfTotalTodos();
}

function addEventListeners(date) {
  const previousArrow = document.getElementById("previous-month-arrow");
  previousArrow.addEventListener("click", function () {
    decrementMonth(date);
  });

  const nextArrow = document.getElementById("next-month-arrow");
  nextArrow.addEventListener("click", function () {
    incrementMonth(date);
  });
}
