// Edit existing task starts here

function editCard(cardId) {
    isNewTask = false;
    openAddtaskOverlay();
    newTask.id = cardId; // Overwriting the newTask with an existing one
    taskOverlayTitle.value = getEdittaskTitle(cardId);
    taskOverlayDescription.value = getEdittaskDescription(cardId);
    taskOverlayDate.value = getEdittaskDate(cardId);
    setEditTaskPrio(cardId);
    setEditTaskCategory(cardId);
    setEditTaskAssigned(cardId);
    setEditTaskSubtasks(cardId);
    changeButton();
}


function getEdittaskTitle(cardId) {
    return cards.filter(card => card.id == cardId)[0].title;
}


function getEdittaskDescription(cardId) {
    return cards.filter(card => card.id == cardId)[0].text;
}


function getEdittaskDate(cardId) {
    return formatDate(new Date(cards.filter(card => card.id == cardId)[0].date));
}


function formatDate(date) {
    let day = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    let year = date.getFullYear();

    // Adding 0 in front of single-digit day/month otherwise date-input field does not accept date value
    if (day.length < 2) {
        day = "0" + day;
    }
    if (month.length < 2) {
        month = "0" + month;
    }
    return [year, month, day].join('-');
}


function setEditTaskPrio(cardId) {
    if (cards.filter(card => card.id == cardId)[0].priority === 'urgent') {
        setPriority('overlay', 'urgent');
    }
    if (cards.filter(card => card.id == cardId)[0].priority === 'medium') {
        setPriority('overlay', 'medium');
    }
    if (cards.filter(card => card.id == cardId)[0].priority === 'low') {
        setPriority('overlay', 'low');
    }
}


function setEditTaskCategory(cardId) {
    if (cards.filter(card => card.id == cardId)[0].category != "General") {
        let categoryName = cards.filter(card => card.id == cardId)[0].category;
        let categoryColor = categories.filter(category => category.name == categoryName)[0].color;
        selectCategory(categoryName, categoryColor, 'overlay');
    }
}


function setEditTaskAssigned(cardId) {
    let assignedPersons = cards.filter(card => card.id == cardId)[0].assigned;
    if (assignedPersons.length >= 1) {
        createListOfAssignedPersons(assignedPersons);
        drawAssigned('overlay');
    }
}


function createListOfAssignedPersons(assignedPersons) {
    let finalList = [];
        assignedPersons.forEach(person => {
            finalList.push([person, taskTemplate.getAssignedPersonEdit(person)]);
        });
        assigned = finalList;
}


function setEditTaskSubtasks(cardId) {
    let listOfSubtasks = cards.filter(card => card.id == cardId)[0].subtask;
    subtasks = listOfSubtasks;
    for (let i = 0; i < subtasks.length; i++) { subtasks[i].id = `subtask${i}`; }
    drawAllSubtasks('overlay');
}

/**
 * Changing the overlay button from addtask "create task" to edit task "save".
 */
function changeButton() {
    let submitButton = document.getElementById('overlaySubmit');
    submitButton.value = "Save";
}