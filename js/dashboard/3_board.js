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
 * Filter process attached to the search field.
 */
function filterTasks() {
    let searchField = document.getElementById('searchField').value.toLowerCase();
    let filteredList = [];
    tasks.forEach(task => {
        if ((task.title.toLowerCase()).includes(searchField) || (task.description.toLowerCase()).includes(searchField)) {
            filteredList.push(task);
        }
    });
    renderFilteredTasks(filteredList);
}


function renderFilteredTasks(filteredList) {
    clearBoardColumns();
    fillBoardColumnsWithFilteredTasks(filteredList);
    addDropzones();
}


function fillBoardColumnsWithFilteredTasks(filteredList) {
    filteredList.forEach(task => {
        task.status === 'Todo' ? todo.innerHTML += taskTemplate.getBoardTask(task) : "";
        task.status === "In Progress" ? progress.innerHTML += taskTemplate.getBoardTask(task) : "";
        task.status === "Awaiting Feedback" ? feedback.innerHTML += taskTemplate.getBoardTask(task) : "";
        task.status === "Done" ? done.innerHTML += taskTemplate.getBoardTask(task) : "";
    });
}


/**
 * 
 * @param {string} name
 * @returns the initial letters of name and surname.
 */
function returnInitials(name) {
    return name.charAt(0) + name.charAt(name.indexOf(" ") + 1);
}

/**
 * Shows the task's details when user clicks on a small card on the Board.
 * @param {*} taskId as string.
 */
function showTaskDetails(taskId) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    renderOverlayTask(taskId);
}


function showMoveList() {
    let moveList = document.getElementById("moveList");
    moveList.classList.contains('d-none') ? moveList.classList.remove('d-none') : moveList.classList.add('d-none');
}


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
 * Hides all overlays when user clicks on the overlay's grey background or its close button.
 */
function closeOverlay() {
    isNewTask = true; // Sets the logic to a new task.
    let domElementList = ['overlayBackground', 'overlayTask', 'addtaskOverlay', 'addcontactOverlay', 'editcontactOverlay', 'taskClearButton'];
    domElementList.forEach(element => {
        let domElement = document.getElementById(element);
        domElement.classList.add('d-none');
        element === 'addtaskOverlay' ? domElement.classList.add('hidden') : "";
        element === 'taskClearButton' ? domElement.classList.remove('d-none') : "";
    });
    clearOverlay();// This clears the addtask overlay fields.
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

/**
 * Opens the overlay with the addtask form and calls the initNewTask() function,
 * then sets the new tasks' status depending on the button clicked.
 * @param {*} status as string (Todo, In Progress, Awaiting Feedback or Done).
 */
function openAddtaskOverlay(status) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let taskoverlay = document.getElementById('addtaskOverlay');
    taskoverlay.classList.remove('d-none');
    taskoverlay.classList.remove('hidden');
    initNewTask();
    newTask.status = status;
}

/**
 * Creates a new task with default values.
 */
function initNewTask() {
    // Empty new task template with standard values for group, color and priority
    newTask = new Task("", "", "General", "Todo", "#FF7A00", "", "Low", [], []);
}