function editCard(cardId) {
    isNewTask = false;
    openAddtaskOverlay();
    newTask.id = cardId;
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
        let finalList = [];
        assignedPersons.forEach(person => {
            finalList.push([person, `<div class="addtask-leftcontainer-assigned-circle" style="background:${contacts.filter(contact => contact.id == person)[0].color}">${returnInitials(contacts.filter(contact => contact.id == person)[0].name)}</div>`]);
        });
        assigned = finalList;
        drawAssigned('overlay');
    }
}


function setEditTaskSubtasks(cardId) {
    let listOfSubtasks = cards.filter(card => card.id == cardId)[0].subtask;
    subtasks = listOfSubtasks;
    for (let i = 0; i < subtasks.length; i++) { subtasks[i].id = `subtask${i}`; }
    drawAllSubtasks('overlay');
}


function changeButton() {
    let submitButton = document.getElementById('overlaySubmit');
    submitButton.value = "Save";
}


function saveEditedTask() {
    newTask.group = cards.filter(card => card.id === newTask.id)[0].group;
    cards.splice(cards.findIndex(card => card.id === newTask.id), 1);
    cards.push(newTask);
    saveLocalStorage('cards');
    closeOverlay();
    clearOverlay();
    clearAddtaskMenu();
    if (cards.length > 0) {
        renderCards();
    }
    updateCounters();
    initNewTask('To do');
}