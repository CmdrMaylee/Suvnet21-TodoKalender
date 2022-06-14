document.addEventListener('DOMContentLoaded', main)

function main() {
    const currentDate = new Date()
    addEventListeners(currentDate)
    document.getElementById('stuffsi').innerHTML = currentDate.getFullYear() + '/' + convertMonth(currentDate.getMonth())
}


function addEventListeners(date) {
    const previousArrow = document.getElementById("previous-month-arrow")
    const nextArrow = document.getElementById("next-month-arrow")

    nextArrow.addEventListener('click', incrementMonth(date))
}

/**
 * 
 * @param {Date} date 
 */
function incrementMonth(date) {
    if (date.getMonth() == 11) {
        date.setFullYear(date.getFullYear()++)
    }
    date.setDate(date.getDate() + 1)
    console.log(date.getMonth())
    // renderCalendarView()
}

function convertMonth(monthNum) {
    switch (monthNum) {
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
        default:
            return NaN
    }
}
