/**
 * Shows the task's details when user clicks on a small card on the Board.
 * @param {*} taskId as string.
 */
function showTaskDetails(taskId) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    renderOverlayTask(taskId);
}

/**
 * Move list is shown if the user clicks on the top-right check button on the task details overlay.
 */
function showMoveList() {
    let moveList = document.getElementById("moveList");
    moveList.classList.contains('d-none') ? moveList.classList.remove('d-none') : moveList.classList.add('d-none');
}

/**
 * Equivalent function to drag&drop changing of task status.
 * @param {*} taskId 
 * @param {*} status 
 */
function moveTask(taskId, status) {
    tasks.forEach(task => {
        if (task.id == taskId) {
            task.status = status;
            setTodo(task);
            showMoveList();
            renderTasks();
        }
    });
}

/**
 * Rendering the html template. Called by showTaskDetails(taskId).
 * @param {*} taskId as string.
 */
function renderOverlayTask(taskId) {
    let overlayTask = document.getElementById('overlayTask');
    overlayTask.classList.remove('d-none');
    overlayTask.innerHTML = "";
    overlayTask.innerHTML += taskTemplate.getOverlayTask(taskId);
}

/**
 * Prevents the click event to bubble up to the parent element.
 * @param {*} event 
 */
function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * Returns a date as string. Whereas the month is plain text e.g "April".
 * The days have 2 digits (e.g. 01 or 21 etc.) and the year has 4 digits.
 * @param {*} date as Date-object.
 * @returns a formatted date as string.
 */
function returnFormatedDate(date) {
    if (date) {
        return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    } else {
        return "No date specified"
    }
}


function hideTaskDetails() {
    let overlayTask = document.getElementById('overlayTask');
    overlayTask.classList.add('d-none');
    let background = document.getElementById("overlayBackground");
    background.classList.add("d-none");
}