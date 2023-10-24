
/**
 * Clears the addtask form and resets the newTask object with default values.
 * Only the status of the task is preserved (if user comes from board btns).
 */
function clearAddtaskMenu() {
    console.log("clearAddtaskMenu");
    oldStatus = newTask.status;
    newTask = new Task(null, null, null, oldStatus, null, "Low", [], []);
}


function collectData() {
    console.log("new task: ", newTask);
}


function setPriority(priority) {
    toggleButton(priority);
    newTask.priority = priority;
}

/**
 * Highlights the selected button and removes the highlight from the others.
 * @param {*} element as string: "Low", "Medium" or "High".
 */
function toggleButton(element) {
    let buttons = document.getElementsByClassName('priority-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('priority-btn-selected');
    }
    document.getElementById('btn' + element).classList.add('priority-btn-selected');
}