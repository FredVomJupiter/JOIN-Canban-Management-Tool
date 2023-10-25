/**
 * Clears the addtask form and resets the newTask object with default values.
 * Only the status of the task is preserved (if user comes from board btns).
 */
function clearAddtaskMenu() {
    console.log("clearAddtaskMenu");
    oldStatus = newTask.status;
    newTask = new Task(null, null, null, oldStatus, null, "Low", [], []);
}

/**
 * Triggered by the addtask button.
 * Collects form data, validates it and sends the validated data to the Backend.
 */
function collectValidateSendData() {
    console.log("new task: ", newTask);
}


function renderAll() {
    renderCategories();
    renderAssignments();
}