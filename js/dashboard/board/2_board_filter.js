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