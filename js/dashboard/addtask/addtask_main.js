function renderAll() {
    renderCategories();
    renderAssignments();
}

/**
 * Clears the addtask form and resets the newTask object with default values.
 * Only the status of the task is preserved (if user comes from board btns).
 */
function clearAddtaskMenu() {
    oldStatus = newTask.status;
    newTask = new Task(null, null, null, oldStatus, null, "Low", [], []);
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
 * Triggered by the addtask button.
 * Collects form data, validates it and sends the validated data to the Backend.
 */
async function collectValidateSendData() {
    newTask.title = document.getElementById('addtaskMenuTitle').value.trim();
    newTask.description = document.getElementById('addtaskMenuDescription').value.trim();
    newTask.category = document.getElementById('addtaskMenuCategory').value;
    let selected = document.getElementById('addtaskMenuAssigned');
    for (const option of selected.options) {
        if (option.selected) {
            newTask.assigned_to.push(option.value)
        }
    }
    newTask.due_date = document.getElementById('addtaskMenuDate').value + "T00:00:00Z";
    await Promise.all(newSubtasks.map(async subtask => {
            let response = await createSubtask(subtask);
            newTask.subtasks.push(response.id);
    }));
    let response = await createTask(newTask);
    await getSubtasks();
    await getTasks();
    showAlert("Task created successfully.");
    clearAddtaskMenu();
    setTimeout(() => {
        openPage('board');
    }, 1000);
}