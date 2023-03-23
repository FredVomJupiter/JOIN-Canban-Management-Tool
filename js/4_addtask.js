// For all instances of addtask overlay
const taskOverlayForm = document.getElementById('addtaskOverlay');
const taskOverlayTitle = document.getElementById('addtaskOverlayTitle');
const taskOverlayDescription = document.getElementById('addtaskOverlayDescription');
const taskOverlayDate = document.getElementById('addtaskOverlayDate');

// For the addtask in menu only
const taskMenuForm = document.getElementById('addtaskMenu');
const taskMenuTitle = document.getElementById('addtaskMenuTitle');
const taskMenuDescription = document.getElementById('addtaskMenuDescription');
const taskMenuDate = document.getElementById('addtaskMenuDate');


let newTask;

let assigned = [];

let subtasks = [];

let isNewTask = true;

let newCategory = {
    name: "",
    color: "",
};


function initNewTask() {
    // Empty new task template with standard values for group, color and priority
    newTask = new Task("", "", "General", "To do", "#FF7A00", "", "low", [], []);

}


taskOverlayForm.addEventListener('submit', e => {
    e.preventDefault();
    validateTaskInputs('overlay');
});


taskMenuForm.addEventListener('submit', e => {
    e.preventDefault();
    validateTaskInputs('menu');
});


const setTaskError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}


const setTaskSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


const validateTaskInputs = (where) => {
    if (where === 'overlay') {
        overlayValidation();
    }

    if (where === 'menu') {
        menuValidation();
    }
};


function overlayValidation() {
    const titleValue = taskOverlayTitle.value.trim();
    const descriptionValue = taskOverlayDescription.value.trim();
    const dateValue = taskOverlayDate.value;

    let correctTitle = false;
    let correctDescription = false;
    let correctDate = false;

    if (titleValue === '') {
        setTaskError(taskOverlayTitle, 'Title is required');
        correctTitle = false;
    } else {
        setTaskSuccess(taskOverlayTitle);
        correctTitle = true;
    }

    if (descriptionValue === '') {
        setTaskError(taskOverlayDescription, 'Description is required');
        correctDescription = false;
    } else {
        setTaskSuccess(taskOverlayDescription);
        correctDescription = true;
    }

    if (dateValue === '') {
        setTaskError(taskOverlayDate, 'Date is required dd.mm.yyyy');
        correctDate = false;
    } else {
        setTaskSuccess(taskOverlayDate);
        correctDate = true;
    }

    if (correctTitle & correctDescription & correctDate & isNewTask) {
        newTask.title = titleValue;
        newTask.text = descriptionValue;
        newTask.date = new Date(dateValue);
        newTask.assigned = copyAssigned();
        newTask.subtask = copySubtasks();
        saveNewTask();
    }
    if (correctTitle & correctDescription & correctDate & !isNewTask) {
        newTask.title = titleValue;
        newTask.text = descriptionValue;
        newTask.date = new Date(dateValue);
        newTask.assigned = copyAssigned();
        newTask.subtask = copySubtasks();
        saveEditedTask();
    }
}


function menuValidation() {
    const titleValue = taskMenuTitle.value.trim();
    const descriptionValue = taskMenuDescription.value.trim();
    const dateValue = taskMenuDate.value;

    let correctTitle = false;
    let correctDescription = false;
    let correctDate = false;

    if (titleValue === '') {
        setTaskError(taskMenuTitle, 'Title is required');
        correctTitle = false;
    } else {
        setTaskSuccess(taskMenuTitle);
        correctTitle = true;
    }

    if (descriptionValue === '') {
        setTaskError(taskMenuDescription, 'Description is required');
        correctDescription = false;
    } else {
        setTaskSuccess(taskMenuDescription);
        correctDescription = true;
    }

    if (dateValue === '') {
        setTaskError(taskMenuDate, 'Date is required dd.mm.yyyy');
        correctDate = false;
    } else {
        setTaskSuccess(taskMenuDate);
        correctDate = true;
    }

    if (correctTitle & correctDescription & correctDate) {
        newTask.title = titleValue;
        newTask.text = descriptionValue;
        newTask.date = new Date(dateValue);
        newTask.assigned = copyAssigned();
        newTask.subtask = copySubtasks();
        saveNewTask();
    }
}


function saveNewTask() {
    cards.push(newTask);
    saveLocalStorage('cards');
    closeOverlay();
    clearOverlay();
    clearAddtaskMenu();
    if (cards.length > 0) {
        renderCards();
    }
    updateCounters();
    initNewTask();
}


// Non-validated inputs handled here:

// prio

function setPriority(location, type) {
    location === 'overlay' ? setOverlayPrio(type) : setMenuPrio(type);
}


function setOverlayPrio(type) {

    const prio = document.getElementById('addtaskOverlayPrio');

    if (type === 'urgent') {
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.setOverlayUrgent();
        newTask.priority = 'urgent';
    }
    if (type === 'medium') {
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.setOverlayMedium();
        newTask.priority = 'medium';
    }
    if (type === 'low') {
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.setOverlayLow();
        newTask.priority = 'low';
    }
}


function setMenuPrio(type) {

    const prio = document.getElementById('addtaskMenuPrio');

    if (type === 'urgent') {
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.setMenuUrgent();
        newTask.priority = 'urgent';
    }
    if (type === 'medium') {
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.setMenuMedium();
        newTask.priority = 'medium';
    }
    if (type === 'low') {
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.setMenuLow();
        newTask.priority = 'low';
    }
}

// categories

function expandCategories(location) {
    location === 'overlay' ? expandOverlayCategories() : expandMenuCategories();
}


function expandOverlayCategories() {
    const menu = document.getElementById('addtaskOverlayCategory');

    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = taskTemplate.setCategoryHeader('overlay');
    categories.forEach(category => {
        menu.innerHTML += taskTemplate.setCategories(category, 'overlay');
    });
}


function expandMenuCategories() {
    const menu = document.getElementById('addtaskMenuCategory');

    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = taskTemplate.setCategoryHeader('menu');
    categories.forEach(category => {
        menu.innerHTML += taskTemplate.setCategories(category, 'menu');
    });
}


function foldCategories(location) {
    location === 'overlay' ? foldOverlayCategories() : foldMenuCategories();
}


function foldOverlayCategories() {
    let menu = document.getElementById('addtaskOverlayCategory');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.parentElement.outerHTML = taskTemplate.resetOverlayCategory();
}


function foldMenuCategories() {
    let menu = document.getElementById('addtaskMenuCategory');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.parentElement.outerHTML = taskTemplate.resetMenuCategory();
}


function selectCategory(categoryName, categoryColor, location) {
    foldCategories(location);
    let menu = (location === 'overlay' ? document.getElementById('addtaskOverlayCategory') : document.getElementById('addtaskMenuCategory'));
    menu.innerHTML = taskTemplate.setNewCategory(categoryName, categoryColor);
    newTask.category = categoryName;
    newTask.color = categoryColor;
}


function createNewCategory(location) {
    newCategory.color = colors[16]; // Default color
    newCategory.name = "";
    if (location === "menu") {
        prepareMenu();

    } else {
        prepareOverlay();
    }
}


function prepareMenu() {
    const menu = document.getElementById('addtaskMenuCategory');
    menu.removeAttribute("onclick");
    menu.innerHTML = "";
    menu.classList.remove('field-grow');
    menu.style.background = "none";
    menu.style.background = "#FFFFFF";
    menu.innerHTML = taskTemplate.setNewCategoryUserinput('menu', newCategory);
    menu.parentElement.innerHTML += taskTemplate.setNewCategoryColorbar('menu');
}


function prepareOverlay() {
    const overlay = document.getElementById('addtaskOverlayCategory');
    overlay.removeAttribute("onclick");
    overlay.innerHTML = "";
    overlay.classList.remove('field-grow');
    overlay.style.background = "none";
    overlay.style.background = "#FFFFFF";
    overlay.innerHTML = taskTemplate.setNewCategoryUserinput('overlay', newCategory);
    overlay.parentElement.innerHTML += taskTemplate.setNewCategoryColorbar('overlay');
}


function selectNewCategoryColor(color, location) {
    newCategory.color = color;

    if (location === "menu") {
        let menu = document.getElementById('newCategoryMenu');
        menu.outerHTML = taskTemplate.setCategoryColor('menu', color);
    } else {
        let overlay = document.getElementById('newCategoryOverlay');
        overlay.outerHTML = taskTemplate.setCategoryColor('overlay', color);
    }
}


function saveNewCategory(location) {
    if (locationMenu(location)) {
        saveMenuCategoryInput();
    }
    if (locationOverlay(location)) {
        saveOverlayCategoryInput();
    }
}


function locationMenu(location) {
    return location === "menu" && document.getElementById('newCategoryNameMenu').value != "";
}


function saveMenuCategoryInput() {
    newCategory.name = document.getElementById('newCategoryNameMenu').value;
    selectCategory(newCategory.name, newCategory.color, location);
    categories.push(newCategory);
    saveLocalStorage('categories');
}


function locationOverlay(location) {
    return location === "overlay" && document.getElementById('newCategoryNameOverlay').value != "";
}


function saveOverlayCategoryInput() {
    newCategory.name = document.getElementById('newCategoryNameOverlay').value;
    selectCategory(newCategory.name, newCategory.color, location);
    categories.push(newCategory);
    saveLocalStorage('categories');
}


// assignments

function expandAssigned(location) {
    location === 'overlay' ? expandOverlayAssigned() : expandMenuAssigned();
}


function expandOverlayAssigned() {
    const menu = document.getElementById('addtaskOverlayAssigned');
    prepareOverlayAssigned(menu);
    contacts.forEach(contact => {
        menu.innerHTML += taskTemplate.setAssigned(contact, 'overlay');
    });
    checkBoxes();
}


function prepareOverlayAssigned(menu) {
    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = taskTemplate.setAssignedHeader('overlay');
}


function expandMenuAssigned() {
    const menu = document.getElementById('addtaskMenuAssigned');
    prepareMenuAssigned(menu);
    contacts.forEach(contact => {
        menu.innerHTML += taskTemplate.setAssigned(contact, 'menu');
    });
    checkBoxes();
}


function prepareMenuAssigned(menu) {
    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = taskTemplate.setAssignedHeader('menu');
}


function foldAssigned(location) {
    location === 'overlay' ? foldOverlayAssigned() : foldMenuAssigned();
}


function foldOverlayAssigned() {
    let menu = document.getElementById('addtaskOverlayAssigned');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.outerHTML = taskTemplate.resetOverlayAssigned();
}


function foldMenuAssigned() {
    let menu = document.getElementById('addtaskMenuAssigned');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.outerHTML = taskTemplate.resetMenuAssigned();
}


function selectAssigned(contactId, contactName, contactColor, location) {
    let checkbox = document.getElementById(contactId);
    if (checkbox.checked) {
        addSelectedPerson(contactId, contactName, contactColor);
        drawAssigned(location);
    } else {
        removeDisselectedPerson(contactId);
        drawAssigned(location);
    }
}


function addSelectedPerson(contactId, contactName, contactColor) {
    let assignedPerson = taskTemplate.getAssignedPerson(contactId, contactName, contactColor);
    assigned.push(assignedPerson);
}


function removeDisselectedPerson(contactId) {
    assigned.forEach(element => {
        if (element[0] === contactId) {
            assigned.splice(assigned.indexOf(element), 1);
        }
    });
}


function drawAssigned(location) {
    let display = getDisplay(location);
    display.innerHTML = "";
    if (assigned.length > 0) {
        assigned.forEach(element => {
            display.innerHTML += element[1];
        });
    }
}


function getDisplay(location) {
    return (location === 'overlay' ? document.getElementById('displayOverlayAssigned') : document.getElementById('displayMenuAssigned'));
}


/**
 * Checkboxes become checked if allready assigned by user previously, otherwise the splice function when unchecking
 * will not delete the assigned person correctly.
 */
function checkBoxes() {
    assigned.forEach(element => {
        let checkbox = document.getElementById(element[0]);
        checkbox.checked = true;
    });
}


/**
 * ids of assigned persones without the html template
 * @returns ids as list of strings
 */
function copyAssigned() {
    let ids = [];
    assigned.forEach(element => {
        ids.push(element[0]);
    });
    return ids;
}


// subtasks

function addSubtask(location) {
    let subtaskName = getSubtaskName(location);
    if (subtaskName.value != "") {
        subtasks.push({ name: subtaskName.value, status: 0, id: `subtask${subtasks.length}` });
        drawAllSubtasks(location);
        subtaskName.value = "";
    }
}


function getSubtaskName(location) {
    return (location === 'overlay' ? document.getElementById('addtaskOverlaySub') : document.getElementById('addtaskMenuSub'));
}


function drawAllSubtasks(location) {
    let subtaskBox = getSubtaskBox(location);
    subtaskBox.innerHTML = "";
    if (subtasks.length > 0) {
        subtasks.forEach(subtask => {
            subtaskBox.innerHTML += taskTemplate.getSubtask(subtask, location);
        });
    }
}


function getSubtaskBox(location) {
    return (location === 'overlay' ? document.getElementById('addtaskOverlaySubbox') : document.getElementById('addtaskMenuSubbox'));
}


function deleteSubtask(subtaskId, location) {
    subtasks.forEach(subtask => {
        if (subtask.id === subtaskId) {
            subtasks.splice(subtasks.indexOf(subtask), 1);
        }
    });
    drawAllSubtasks(location);
}


function setSubStatus(subtaskId) {
    let checkbox = document.getElementById(subtaskId);
    if (checkbox.checked) {
        setSubStatusDone(subtaskId);
    } else {
        setSubStatusTodo(subtaskId);
    }
}


function setSubStatusDone(subtaskId) {
    subtasks.forEach(subtask => {
        if (subtask.id === subtaskId) {
            subtask.status = 1;
        }
    });
}


function setSubStatusTodo(subtaskId) {
    subtasks.forEach(subtask => {
        if (subtask.id === subtaskId) {
            subtask.status = 0;
        }
    });
}


function copySubtasks() {
    let subtaskWithoutId = [];
    subtasks.forEach(subtask => {
        subtaskWithoutId.push({ name: subtask.name, status: subtask.status });
    });
    return subtaskWithoutId;
}


function clearOverlay() {
    initNewTask();
    resetValues('overlay');
    foldCategories('overlay');
    foldAssigned('overlay');
    drawAssigned('overlay');
    drawAllSubtasks('overlay');

}


function clearAddtaskMenu() {
    initNewTask();
    resetValues('menu')
    foldCategories('menu');
    foldAssigned('menu');
    drawAssigned('menu');
    drawAllSubtasks('menu');
    resetPrio('menu');
}


function resetValues(location) {
    assigned = [];
    subtasks = [];
    if (location === 'overlay') {
        taskOverlayTitle.value = "";
        taskOverlayDescription.value = "";
        taskOverlayDate.value = "";
    } else {
        taskMenuTitle.value = "";
        taskMenuDescription.value = "";
        taskMenuDate.value = "";
    }
}


function resetPrio(location) {
    if (location === 'overlay') {
        let prio = document.getElementById('addtaskOverlayPrio');
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.resetOverlayPrio();
    } else {
        let prio = document.getElementById('addtaskMenuPrio');
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.resetMenuPrio();
    }
}


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


function saveEditedTask() {
    newTask.group = cards.filter(card => card.id === newTask.id)[0].group;
    cards.splice(cards.findIndex(card => card.id === newTask.id), 1); //removing old card
    cards.push(newTask); // adding new card
    saveLocalStorage('cards');
    closeOverlay();
    clearOverlay();
    clearAddtaskMenu();
    if (cards.length > 0) {
        renderCards();
    }
    updateCounters();
    initNewTask();
}