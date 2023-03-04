const taskOverlayForm = document.getElementById('addtaskOverlay');
const taskOverlayTitle = document.getElementById('addtaskOverlayTitle');
const taskOverlayDescription = document.getElementById('addtaskOverlayDescription');
const taskOverlayDate = document.getElementById('addtaskOverlayDate');

let newTask = {};


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
    validateTaskInputs();
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

const validateTaskInputs = () => {
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

    if (correctTitle & correctDescription & correctDate) {
        console.log(newTask);
        //saveNewTask();
    }
};


function saveNewTask() {
    newTask.category = "";
    newTask.title = document.getElementById('').value;
    newTask.text = document.getElementById('').value;
    newTask.date = document.getElementById('').value;
    cards.push(newTask);
    closeOverlay();
    clearNewtaskInputfields();
    initNewTask();
}


function clearNewtaskInputfields() {
    document.getElementById('').value = "";
}


// Non-validated inputs handled here:
function setPriority(type) {
    const prio = document.getElementById('addtaskOverlayPrio');
    if (type === 'urgent') {
        prio.innerHTML = "";
        prio.innerHTML = templateUrgent();
        newTask.priority = 'urgent';
    }
    if (type === 'medium') {
        prio.innerHTML = "";
        prio.innerHTML = templateMedium();
        newTask.priority = 'medium'
    }
    if (type === 'low') {
        prio.innerHTML = "";
        prio.innerHTML = templateLow();
        newTask.priority = 'low';
    }
}


function templateUrgent() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 141px;" onclick="setPriority('urgent')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh_white.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" id="addtaskPrioMedium" onclick="setPriority('medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" id="addtaskPrioLow" onclick="setPriority('low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function templateMedium() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 130px;" onclick="setPriority('medium')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium_white.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('low')">
            <span class="addtask-rightcontainer-priobtns-text">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
        </div>
    `;
}


function templateLow() {
    return `
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('urgent')">
            <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" id="addtaskPrioMedium" onclick="setPriority('medium')">
            <span class="addtask-rightcontainer-priobtns-text">Medium</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
        </div>
        <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 136px;" id="addtaskPrioLow" onclick="setPriority('low')">
            <span class="addtask-rightcontainer-priobtns-text whitetext">Low</span>
            <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow_white.svg">
        </div>
    `;
}


/**
 * 
 * TODO:
 * 
 * 1) Selection for Category
 * 2) Selection for Assignment
 * 3) Subtasks
 * 
 * 4) Saving the data
 * 
 * 5) the same for AddTask in Menu
 * 
 * 6) Edit Task button
 */


function expandCategories(location) {
    if (location === 'overlay') {
        let menu = document.getElementById('addtaskOverlayCategory');
        menu.onclick = "";
        menu.parentElement.classList.add('category-grow');
        menu.classList.add('categoryfield-grow');
        menu.innerHTML = "";
        menu.innerHTML = templateCategoryHeader();
        categories.forEach(category => {
            menu.innerHTML += templateCategories(category);
        });
    }
}


function templateCategoryHeader() {
    return `
        <div class="addtask-leftcontainer-selection" onclick="foldCategories('overlay')">
            <span class="addtask-leftcontainer-categorytext">Select task category</span>
            <img style="margin-left:140px" src="./assets/img/dropdown.svg">
        </div>
    `;
}


function templateCategories(category) {
    return `
        <div class="addtask-leftcontainer-selection">
            <span class="addtask-leftcontainer-categorytext">${category.name}</span>
            <div class="addtask-leftcontainer-circle" style="background:${category.color}"></div>
        </div>
    `;
}


function foldCategories(location) {
    if (location === 'overlay') {
        let menu = document.getElementById('addtaskOverlayCategory');
        menu.parentElement.classList.remove('category-grow');
        menu.classList.remove('categoryfield-grow');
        menu.innerHTML = "";
        menu.outerHTML = resetCategory();
    }
}


function resetCategory() {
    return `
        <div class="addtask-leftcontainer-categoryfield" id="addtaskOverlayCategory" onclick="expandCategories('overlay')">Select task category
        </div>
    `;
}