// All months for the summary board (urgent) date calculation and visualization.
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

/**
 * Updates all elements on the summary page.
 */
function updateCounters() {
    countTasks();
    countProgress();
    countFeedback();
    countUrgent();
    showUpcomingDeadline();
    countToDo();
    countDone();
}


function countTasks() {
    let tasksCounter = document.getElementById('tasksCounter');
    tasksCounter.innerHTML = "";
    tasksCounter.innerHTML = todos.length;
}


function countProgress() {
    let progressCounter = document.getElementById('progressCounter');
    progressCounter.innerHTML = "";
    progressCounter.innerHTML = todos.filter(card => card.status == "In Progress").length;
}


function countFeedback() {
    let feedbackCounter = document.getElementById('feedbackCounter');
    feedbackCounter.innerHTML = "";
    feedbackCounter.innerHTML = todos.filter(card => card.status == "Awaiting Feedback").length;
}


function countUrgent() {
    let urgentCounter = document.getElementById('urgentCounter');
    urgentCounter.innerHTML = "";
    urgentCounter.innerHTML = todos.filter(card => card.priority == "High").length;
}


function showUpcomingDeadline() {
    let urgentDate = document.getElementById('urgentDate');
    urgentDate.innerHTML = "";
    urgentDate.innerHTML = returnDeadline();
}


/**
 * This functon filters todos with prority "High" and if more than 1
 * urgent todo exists, it hands over the list of todos to the "mostUrgentDeadline()"
 * function.
 * @returns String containing month, day and year.
 */
function returnDeadline() {
    let urgentDeadlines = todos.filter(card => card.priority == "High");
    if (urgentDeadlines.length >= 1) {
        let theChosenOne = mostUrgentDeadline(urgentDeadlines);
        return formatDeadline(theChosenOne);
    }
    if (urgentDeadlines.length == 0) {
        return "No urgent";
    }
}

/**
 * 
 * @param {array} urgentDeadlines containing filtered todos with priority "High".
 * @returns the first date of a ascending sorted list of dates.
 */
function mostUrgentDeadline(urgentDeadlines) {
    let urgentDatesList = [];
    urgentDeadlines.forEach(urgent => {
        urgentDatesList.push(urgent.due_date);
    });
    urgentDatesList.sort((a, b) => a - b);
    return urgentDatesList[0];
}


function formatDeadline(date) {
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);
    let year = date.substr(0, 4);
    return monthNames[month - 1] + " " + day + ", " + year;
}


function countToDo() {
    let todoCounter = document.getElementById('todoCounter');
    todoCounter.innerHTML = "";
    todoCounter.innerHTML = todos.filter(card => card.status == "Todo").length;
}


function countDone() {
    let doneCounter = document.getElementById('doneCounter');
    doneCounter.innerHTML = "";
    doneCounter.innerHTML = todos.filter(card => card.status == "Done").length;
}