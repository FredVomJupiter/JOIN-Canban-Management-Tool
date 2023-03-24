let newTask;

let assigned = [];

let subtasks = [];

let isNewTask = true;

// For creating a new category in category-dropdown menu: data storing temporarily here.
let newCategory = {
    name: "",
    color: "",
};


function initNewTask() {
    // Empty new task template with standard values for group, color and priority
    newTask = new Task("", "", "General", "To do", "#FF7A00", "", "low", [], []);
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

/**
 * Removes the dropdown category-menu and replaces it with a user input and color selection.
 */
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

/**
 * Removes the dropdown category-menu and replaces it with a user input and color selection.
 */
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
        saveCategoryInput(location);
    }
    if (locationOverlay(location)) {
        saveCategoryInput(location);
    }
}


function locationMenu(location) {
    return location === "menu" && returnCategoryFieldId().value != "";
}


function locationOverlay(location) {
    return location === "overlay" && returnCategoryFieldId().value != "";
}


function saveCategoryInput(location) {
    newCategory.name = returnCategoryFieldId().value;
    selectCategory(newCategory.name, newCategory.color, location);
    categories.push(newCategory);
    selectCategory(newCategory.name, newCategory.color, location); // Selecting new category and folding dropdown
    saveLocalStorage('categories');
}

/**
 * Returns either the 'menu' or the 'overlay' id from the category-input.
 */
function returnCategoryFieldId() {
    return location === 'menu' ? document.getElementById('newCategoryNameMenu') : document.getElementById('newCategoryNameOverlay');
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

/**
 * Dedicated for task-detail overlay subtask-checkboxes before editing task.
 * @param {*} cardId as string
 * @param {*} taskIndex as string
 */
function checkOverlayCheckbox(cardId, taskIndex) {
    let checkbox = document.getElementById(cardId + taskIndex);
    let card = cards.filter(card => card.id == cardId)[0];
    validateCheckboxStatus(checkbox, card, taskIndex);
    saveLocalStorage('cards');
    renderCards();
    renderOverlayCard(cardId);
}


function validateCheckboxStatus(checkbox, card, taskIndex) {
    if (checkbox.checked) {
        card.subtask[taskIndex].status = 1;
    } else {
        card.subtask[taskIndex].status = 0;
    }
}

/**
 * Cleas all input fields of the addtask overlay
 * and sets values to default.
 */
function clearOverlay() {
    initNewTask();
    resetValues('overlay');
    foldCategories('overlay');
    foldAssigned('overlay');
    drawAssigned('overlay');
    drawAllSubtasks('overlay');
    resetPrio('overlay');
}

/**
 * Cleas all input fields of the addtask menu area
 * and sets values to default.
 */
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
        prio.innerHTML = taskTemplate.resetPrio(location);
    } else {
        let prio = document.getElementById('addtaskMenuPrio');
        prio.innerHTML = "";
        prio.innerHTML = taskTemplate.resetPrio(location);
    }
}