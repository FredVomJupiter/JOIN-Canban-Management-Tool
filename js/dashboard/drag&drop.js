/**
 * All drag & drop functions are here. In mobile version these functions are not working.
 * Dropzones are below tasks (light gray shade) and the tasks themselves.
 */

let draggedTaskId = null;
let alertTriggered = false;

/**
 * Runs when a task is dragged. Only the owner of the task can move it.
 * @param {*} event 
 * @param {*} taskId 
 */
function dragstart(event, taskId) {
    checkPermission(taskId) ? draggedTaskId = taskId : showAlert();
}


function dragend(event, status) {
    tasks.forEach(task => {
        if (task.id == draggedTaskId) {
            task.status = status;
            setTodo(task);
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
function checkPermission(taskid) {
    return tasks.find(task => task.id == taskid).user.id == loggedUser.id;
}


function showAlert() {
    if (alertTriggered) return;
    let alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = "You don't have permission to move this task.";
    document.body.appendChild(alert);
    setTimeout(() => {
        document.querySelector(".alert").remove();
        alertTriggered = false;
    }, 3000);
}