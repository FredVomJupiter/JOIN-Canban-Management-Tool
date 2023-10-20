const todo = document.getElementById("todo-canvas");
const progress = document.getElementById("progress-canvas");
const feedback = document.getElementById("feedback-canvas");
const done = document.getElementById("done-canvas");

// Render process for Board page
function renderTasks() {
    clearBoardColumns();
    fillBoardColumns();
    addDropzones();
}

/**
 * Clears all board columns.
 */
function clearBoardColumns() {
    todo.innerHTML = "";
    progress.innerHTML = "";
    feedback.innerHTML = "";
    done.innerHTML = "";
}

/**
 * Responsible for filling the board columns with tasks fitting the status.
 */
function fillBoardColumns() {
    tasks.forEach(task => {
        task.status === 'Todo' ? todo.innerHTML += taskTemplate.getBoardTask(task) : "";
        task.status === "In Progress" ? progress.innerHTML += taskTemplate.getBoardTask(task) : "";
        task.status === "Awaiting Feedback" ? feedback.innerHTML += taskTemplate.getBoardTask(task) : "";
        task.status === "Done" ? done.innerHTML += taskTemplate.getBoardTask(task) : "";
    });
}

/**
 * In addition to the dropzones on tasks itself, one dedicated dropzone is added to each column.
 */
function addDropzones() {
    todo.innerHTML += taskTemplate.getDropzone('todo');
    progress.innerHTML += taskTemplate.getDropzone('progress');
    feedback.innerHTML += taskTemplate.getDropzone('feedback');
    done.innerHTML += taskTemplate.getDropzone('done');
}

/**
 * Renders the initials of assigned contacts for the miniature task on the board.
 * @param {string} name
 * @returns the initial letters of name and surname.
 */
function returnInitials(name) {
    return name.charAt(0) + name.charAt(name.indexOf(" ") + 1);
}