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


let newTask = {};

let assigned = [];

let subtasks = [];

let isNewTask = true;


/**
 * Everytime user creates a new task, this init will be called => setting standard values for newTask
 * */
function initNewTask() {
    newTask = {
        id: "card"+cards.length,
        category: "General",
        color: "#FF7A00",
        group: "To do",
        title: "",
        text: "",
        date: "",
        priority: "low",
        assigned: [],
        subtask: []
    };
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
    renderCards();
    closeOverlay();
    clearOverlay();
    clearAddtaskMenu();
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
        prio.innerHTML = templateOverlayUrgent();
        newTask.priority = 'urgent';
    }
    if (type === 'medium') {
        prio.innerHTML = "";
        prio.innerHTML = templateOverlayMedium();
        newTask.priority = 'medium';
    }
    if (type === 'low') {
        prio.innerHTML = "";
        prio.innerHTML = templateOverlayLow();
        newTask.priority = 'low';
    }
}


function setMenuPrio(type) {

    const prio = document.getElementById('addtaskMenuPrio');

    if (type === 'urgent'){
        prio.innerHTML = "";
        prio.innerHTML = templateMenuUrgent();
        newTask.priority = 'urgent';
    }
    if (type === 'medium') {
        prio.innerHTML = "";
        prio.innerHTML = templateMenuMedium();
        newTask.priority = 'medium';
    }
    if (type === 'low') {
        prio.innerHTML = "";
        prio.innerHTML = templateOverlayLow();
        newTask.priority = 'low';
    }
}


function templateOverlayUrgent() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh_white.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('overlay', 'low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function templateOverlayMedium() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline orangebackground" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium_white.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('overlay', 'low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function templateOverlayLow() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline greenbackground" style="width: 136px;" onclick="setPriority('overlay', 'low')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow_white.svg">
        </div>
    `;
}


function templateMenuUrgent() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh_white.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('menu', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('menu', 'low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function templateMenuMedium() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline orangebackground" style="width: 130px;" onclick="setPriority('menu', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium_white.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('menu', 'low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function templateMenuLow() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('menu', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline greenbackground" style="width: 136px;" onclick="setPriority('menu', 'low')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow_white.svg">
        </div>
    `;
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
    menu.innerHTML = templateCategoryHeader('overlay');
    categories.forEach(category => {
        menu.innerHTML += templateCategories(category, 'overlay');
    });
}


function expandMenuCategories() {
    const menu = document.getElementById('addtaskMenuCategory');

    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = templateCategoryHeader('menu');
    categories.forEach(category => {
        menu.innerHTML += templateCategories(category, 'menu');
    });
}


function templateCategoryHeader(location) {
    return `
        <div class="addtask-leftcontainer-selection fixed" onclick="foldCategories('${location}')">
            <span class="addtask-leftcontainer-categorytext">Select task category</span>
            <img style="margin-left:140px" src="./assets/img/dropdown.svg">
        </div>
    `;
}


function templateCategories(category, location) {
    return `
        <div class="addtask-leftcontainer-selection relative" onclick="selectCategory('${category.name}', '${category.color}', '${location}')">
            <span class="addtask-leftcontainer-categorytext">${category.name}</span>
            <div class="addtask-leftcontainer-circle" style="background:${category.color}"></div>
        </div>
    `;
}


function foldCategories(location) {
    location === 'overlay' ? foldOverlayCategories() : foldMenuCategories();
}


function foldOverlayCategories() {
    let menu = document.getElementById('addtaskOverlayCategory');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.outerHTML = resetOverlayCategory();
}


function foldMenuCategories() {
    let menu = document.getElementById('addtaskMenuCategory');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.outerHTML = resetMenuCategory();
}


function resetOverlayCategory() {
    return `
        <div class="addtask-leftcontainer-categoryfield" id="addtaskOverlayCategory" onclick="expandCategories('overlay')">Select task category
        </div>
    `;
}


function resetMenuCategory() {
    return `
        <div class="addtask-leftcontainer-categoryfield" id="addtaskMenuCategory" onclick="expandCategories('menu')">Select task category
        </div>
    `;
}


function selectCategory(categoryName, categoryColor, location) {
    foldCategories(location);
    let menu = (location === 'overlay' ?  document.getElementById('addtaskOverlayCategory') : document.getElementById('addtaskMenuCategory'));
    menu.innerHTML = categoryName + `<div class="addtask-leftcontainer-circle" style="background:${categoryColor}"></div>`;
    newTask.category = categoryName;
    newTask.color = categoryColor;
}

// assignments

function expandAssigned(location) {
    location === 'overlay' ? expandOverlayAssigned() : expandMenuAssigned();
}


function expandOverlayAssigned() {
    const menu = document.getElementById('addtaskOverlayAssigned');
    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = templateAssignedHeader('overlay');
    contacts.forEach(contact => {
        menu.innerHTML += templateAssigned(contact, 'overlay');
    });
    checkBoxes();
}


function expandMenuAssigned() {
    const menu = document.getElementById('addtaskMenuAssigned');
    menu.onclick = "";
    menu.parentElement.classList.add('grow');
    menu.classList.add('field-grow');
    menu.innerHTML = "";
    menu.innerHTML = templateAssignedHeader('menu');
    contacts.forEach(contact => {
        menu.innerHTML += templateAssigned(contact, 'menu');
    });
    checkBoxes();
}


function templateAssignedHeader(location) {
    return `
        <div class="addtask-leftcontainer-selection fixed" onclick="foldAssigned('${location}')">
            <span class="addtask-leftcontainer-assignedtext">Select contacts to assign</span>
            <img style="margin-left:100px" src="./assets/img/dropdown.svg">
        </div>
    `;
}


function templateAssigned(contact, location) {
    return `
        <div class="addtask-leftcontainer-selection">
            <span class="addtask-leftcontainer-assignedtext">${contact.name}</span>
            <input class="addtask-rightcontainer-subtask-checkbox" id="${contact.id}" type="checkbox" onclick="selectAssigned('${contact.id}', '${contact.name}', '${contact.color}', '${location}')">
        </div>
    `;
}


function foldAssigned(location) {
    location === 'overlay' ? foldOverlayAssigned() : foldMenuAssigned();
}


function foldOverlayAssigned() {
    let menu = document.getElementById('addtaskOverlayAssigned');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.outerHTML = resetOverlayAssigned();
}


function foldMenuAssigned() {
    let menu = document.getElementById('addtaskMenuAssigned');
    menu.parentElement.classList.remove('grow');
    menu.classList.remove('field-grow');
    menu.innerHTML = "";
    menu.outerHTML = resetMenuAssigned();
}


function resetOverlayAssigned() {
    return `
        <div class="addtask-leftcontainer-assignedfield" id="addtaskOverlayAssigned" onclick="expandAssigned('overlay')">Select contacts to assign
        </div>
    `;
}


function resetMenuAssigned() {
    return `
        <div class="addtask-leftcontainer-assignedfield" id="addtaskMenuAssigned" onclick="expandAssigned('menu')">Select contacts to assign
        </div>
    `;
}


function selectAssigned(contactId, contactName, contactColor, location) {
    let checkbox = document.getElementById(contactId);
    if (checkbox.checked) {
        let assignedPerson = [contactId, `<div class="addtask-leftcontainer-assigned-circle" style="background:${contactColor}">${returnInitials(contactName)}</div>`]
        assigned.push(assignedPerson);
        drawAssigned(location);
    }
    if (!checkbox.checked) {
        assigned.forEach(element => {
            if (element[0] === contactId) {
                assigned.splice(assigned.indexOf(element), 1);
            }
        });
        drawAssigned(location);
    }
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
        subtasks.push({name: subtaskName.value, status: 0, id: `subtask${subtasks.length}`});
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
            subtaskBox.innerHTML +=  templateSubtask(subtask, location);
        });
    }
}


function getSubtaskBox(location) {
    return (location === 'overlay' ? document.getElementById('addtaskOverlaySubbox') : document.getElementById('addtaskMenuSubbox'));
}


function templateSubtask(subtask, location) {
    if (subtask.status == 0) {
        return `
            <div class="addtask-rightcontainer-subtask-wrap">
                <input class="addtask-rightcontainer-subtask-checkbox" id="${subtask.id}" type="checkbox" onclick="setSubStatus('${subtask.id}')">
                <span class="addtask-rightcontainer-subtask-checkboxtext">${subtask.name}</span>
                <div class="delete" onclick="deleteSubtask('${subtask.id}', '${location}')">X</div>
            </div>
        `;
    } 
    if (subtask.status == 1) {
        return `
        <div class="addtask-rightcontainer-subtask-wrap">
            <input class="addtask-rightcontainer-subtask-checkbox" id="${subtask.id}" type="checkbox" onclick="setSubStatus('${subtask.id}')" checked>
            <span class="addtask-rightcontainer-subtask-checkboxtext">${subtask.name}</span>
            <div class="delete" onclick="deleteSubtask('${subtask.id}', '${location}')">X</div>
        </div>
    `;
    }
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
        subtasks.forEach(subtask => {
            if (subtask.id === subtaskId) {
                subtask.status = 1;
            }
        });
    }
    if (!checkbox.checked) {
        subtasks.forEach(subtask => {
            if (subtask.id === subtaskId) {
                subtask.status = 0;
            }
        });
    }
}


function copySubtasks() {
    let subtaskWithoutId = [];
    subtasks.forEach(subtask => {
        subtaskWithoutId.push({name: subtask.name, status: subtask.status});
    });
    return subtaskWithoutId;
}


function clearOverlay() {
    initNewTask();
    assigned = [];
    subtasks = [];
    taskOverlayTitle.value = "";
    taskOverlayDescription.value = "";
    taskOverlayDate.value = "";
    foldCategories('overlay');
    foldAssigned('overlay');
    drawAssigned('overlay');
    drawAllSubtasks('overlay');
    let prio = document.getElementById('addtaskOverlayPrio');
    prio.innerHTML = "";
    prio.innerHTML = drawUnsetOverlayPrio();
}


function clearAddtaskMenu() {
    initNewTask();
    assigned = [];
    subtasks = [];
    taskMenuTitle.value = "";
    taskMenuDescription.value = "";
    taskMenuDate.value = "";
    foldCategories('menu');
    foldAssigned('menu');
    drawAssigned('menu');
    drawAllSubtasks('menu');
    let prio = document.getElementById('addtaskMenuPrio');
    prio.innerHTML = "";
    prio.innerHTML = drawUnsetMenuPrio();
}


function drawUnsetOverlayPrio() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('overlay', 'low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function drawUnsetMenuPrio() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('menu', 'medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('menu', 'low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}