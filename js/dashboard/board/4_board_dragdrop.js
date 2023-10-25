/**
 * All drag & drop functions are here. In mobile version these functions are not working.
 * Dropzones are below tasks (light gray shade) and the tasks themselves.
 */

let draggedTaskId = null;

/**
 * Runs when a task is dragged. Only the owner of the task can move it.
 * @param {*} event 
 * @param {*} taskId 
 */
function dragstart(event, taskId) {
    checkPermission(taskId) ? draggedTaskId = taskId : showAlert("You can only move your own tasks.");
}


function dragend(event, status) {
    tasks.forEach(task => {
        if (task.id == draggedTaskId) {
            task.status = status;
            setTask(task);
            renderTasks();
        }
    });
    draggedTaskId = null;
}


function dragover(event) {
    event.preventDefault();
}


function dragenter(event, zone) {
    if (draggedTaskId == null) return;
    event.preventDefault();
    let dropzone = document.getElementById(zone);
    dropzone.style.border = "2px dotted black";
}


function dragleave(event, zone) {
    event.preventDefault();
    let dropzone = document.getElementById(zone);
    dropzone.style.border = "unset";
}

/**
 * Checkes if the logged user is the owner of the task.
 * @param {*} taskid 
 * @returns true or false.
 */
function checkPermission(taskId) {
    return tasks.find(task => task.id == taskId).user == loggedUser.id;
}