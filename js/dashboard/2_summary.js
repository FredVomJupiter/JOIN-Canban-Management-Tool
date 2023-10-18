// Functions for Summary Page

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
 * This functon filters cards with prority "urgent" and if more than 1
 * urgent card exists, it hands over the list of cards to the "mostUrgentDeadline()"
 * function.
 * @returns String containing month, day and year.
 */
function returnDeadline() {
    let urgentDeadlines = todos.filter(card => card.priority == "High");
    if (urgentDeadlines.length >= 1) {
        let month = mostUrgentDeadline(urgentDeadlines).getMonth() + 1;
        let day = mostUrgentDeadline(urgentDeadlines).getDate();
        let year = mostUrgentDeadline(urgentDeadlines).getFullYear();
        return monthNames[month] + " " + day + ", " + year; // monthNames called from database.js
    }
    if (urgentDeadlines.length == 0) {
        return "No urgent";
    }
}


/**
 * 
 * @param {array} urgentDeadlines containing filtered cards with priority "urgent".
 * @returns the first date of a ascending sorted list of dates.
 */
function mostUrgentDeadline(urgentDeadlines) {
    let urgentDatesList = [];
    urgentDeadlines.forEach(urgent => {
        urgentDatesList.push(new Date(urgent.date));
    });
    urgentDatesList.sort((a, b) => a - b);
    return new Date(urgentDatesList[0]);
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