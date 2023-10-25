document.getElementById('subtaskInput').onkeyup = function (event) {
    if (event.target.value != "") {
        document.getElementById('addSubtask')
            .classList.remove('d-none');
    } else {
        document.getElementById('addSubtask')
            .classList.add('d-none');
    }
};

/**
 * Triggered by the addSubtask button.
 * Collects the subtask title from the input field and adds it to the newSubtasks array.
 */
function addSubtask() {
    let subtask = document.getElementById('subtaskInput').value;
    if (subtask != "") {
        newSubtasks.push(new Subtask(subtask, false));
        document.getElementById('subtaskInput').value = "";
        document.getElementById('subtaskInput').focus();
        document.getElementById('addSubtask').classList.add('d-none');
        updateSubtaskList();
    }
}

/**
 * Renders the subtask list with new subtasks.
 * @returns HTML string with the subtask list.
 */
function updateSubtaskList() {
    let subtaskList = document.getElementById('subtaskList')
    if (newSubtasks.length === 0) {
        subtaskList.innerHTML = "";
        subtaskList.innerHTML = "No subtasks yet";
        return;
    }
    subtaskList.innerHTML = "";
    newSubtasks.forEach(subtask => {
        subtaskList.innerHTML += getSubtaskHTML(subtask); 
    });
}

/**
 * Auxilliary function.
 * @param {*} subtask as string.
 * @returns HTML string with the subtask.
 */
function getSubtaskHTML(subtask) {
    return `
    <div class="flex-row flex-center">
        <span class="text-normal">${subtask.title}</span>
        <div class="btn-secondary cursor-pointer" onclick="removeSubtask('${subtask.title}')">
            Remove
        </div>
    </div>`;
}

/**
 * Removes the subtask with the corresponding title from the newSubtasks array.
 * @param {*} title as string.
 */
function removeSubtask(title) {
    newSubtasks = newSubtasks.filter(subtask => subtask.title != title);
    updateSubtaskList();
}