/**
 * All drag & drop functions are here. In mobile version these functions are not working.
 * Dropzones are below tasks (light gray shade) and the tasks themselves.
 */

let draggedTaskId;

function dragstart(event, taskId) {
    draggedTaskId = taskId;
}


function dragend(event, status) {
    tasks.forEach(task => {
        if (task.id == draggedTaskId) {
            task.status = status;
            setTodo(task);
            renderTasks();
        }
    });
}


function dragover(event) {
    event.preventDefault();
}


function dragenter(event, zone) {
    event.preventDefault();
    let dropzone = document.getElementById(zone);
    dropzone.style.border = "2px dotted black";
}


function dragleave(event, zone) {
    event.preventDefault();
    let dropzone = document.getElementById(zone);
    dropzone.style.border = "unset";
}