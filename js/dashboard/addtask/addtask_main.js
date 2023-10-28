function renderAll() {
    resetAddtaskInputs();
    renderCategories();
    renderAssignments();
    updateSubtaskList();
}

/**
 * Clears the addtask form and resets the newTask object with default values.
 * Only the status of the task is preserved (if user comes from board btns).
 */
function clearAddtaskMenu() {
    oldStatus = newTask.status;
    newTask = new Task(null, null, null, oldStatus, null, "Low", [], []);
    newSubtasks = [];
    renderAll();
    resetAddtaskInputs();
    toggleButton('Low');
}


function resetAddtaskInputs() {
    document.getElementById('addtaskMenuTitle').value = "";
    document.getElementById('addtaskMenuDescription').value = "";
    document.getElementById('addtaskMenuDate').value = "";
    document.getElementById('subtaskInput').value = "";
}

/**
 * Opens the addtask page and prepares the input fields, buttons and selections of addtask page for editing a task.
 * Sets newTask and newSubtasks variables to match the task to be edited.
 * @param {*} taskId as string.
 */
function prepareEditTask(taskId) {
    hideTaskDetails();
    changeAddtaskBottomButtons(); // change buttons to "Update Task" and remove "Cancel"
    newTask = tasks.find(task => task.id == taskId);
    newSubtasks = newTask.subtasks.map(subtask => {
        return subtasks.find(s => s.id == subtask);
    });
    openPage('addtask');
    setInputValues(newTask);
    showSelectedContacts();
    toggleButton(newTask.priority);
}


function setInputValues(task) {
    document.getElementById('addtaskMenuTitle').value = task.title;
    document.getElementById('addtaskMenuDescription').value = task.description;
    document.getElementById('addtaskMenuDate').value = task.due_date.slice(0, 10);
    document.getElementById('addtaskMenuCategory').value = task.category;
    let selected = document.getElementById('addtaskMenuAssigned');
    for (const option of selected.options) {
        if (task.assigned_to.includes(Number(option.value))) {
            option.selected = true;
        }
    }
}


function changeAddtaskBottomButtons() {
    let addtaskButtons = document.getElementById('addtaskButtons');
    let edittaskButtons = document.getElementById('edittaskButtons');
    addtaskButtons.classList.contains('d-none') ? addtaskButtons.classList.remove('d-none') : addtaskButtons.classList.add('d-none');
    edittaskButtons.classList.contains('d-none') ? edittaskButtons.classList.remove('d-none') : edittaskButtons.classList.add('d-none');
}

/**
 * Triggered by the "Cancel" button during edit of task.
 * 
 */
function cancelEditTask() {
    changeAddtaskBottomButtons(); // change buttons back to "Add Task" and "Clear"
    clearAddtaskMenu();
    showSelectedContacts(); // Will reset the display of selected contacts to the original state (empty).
    openPage('board');
}

/**
 * Triggered by the "Add Task" or "Update Task" button.
 * Collects form data, validates it and sends the validated data to the Backend,
 * then calls API for updated data and moves to the board page.
 */
async function collectValidateSendData(type) {
    transferInputValues();
    await handleSubtasks();
    await handleTask(type);
    await getSubtasks();
    await getTasks();
    clearAddtaskMenu();
    openPage('board');
}

/**
 * Collects the input values from the addtask form and stores them in the newTask object.
 */
function transferInputValues() {
    newTask.title = document.getElementById('addtaskMenuTitle').value.trim();
    newTask.description = document.getElementById('addtaskMenuDescription').value.trim();
    newTask.category = document.getElementById('addtaskMenuCategory').value;
    let selected = document.getElementById('addtaskMenuAssigned');
    for (const option of selected.options) {
        if (option.selected) {
            newTask.assigned_to.push(option.value)
        } else {
            // remove unselected contacts from assigned_to if they exist.
            newTask.assigned_to = newTask.assigned_to.filter(id => id != option.value);
        }
    }
    newTask.due_date = document.getElementById('addtaskMenuDate').value + "T00:00:00Z";
}

/**
 * Updates existing subtasks or creates new ones.
 */
async function handleSubtasks() {
    await Promise.all(newSubtasks.map(async subtask => {
        if (subtask.id) {
            // if subtask already exists, update it
            await setSubtask(subtask);
        } else {
            let response = await createSubtask(subtask);
            newTask.subtasks.push(response.id);
        }
    }));
}

/**
 * Updateds existing taks or creates a new one.
 * @param {*} type as string. Either "update" or "create".
 */
async function handleTask(type) {
    if (type == "update") {
        await setTask(newTask);
        showAlert("Task updated successfully.");
        changeAddtaskBottomButtons(); // change buttons back to "Add Task" and "Clear"
    } else {
        await createTask(newTask);
        showAlert("Task created successfully.");
    }
}