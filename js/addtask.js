const taskForm = document.getElementById('addtaskOverlay');
const taskTitle = document.getElementById('addtaskInputTitle');
const taskDescription = document.getElementById('addtaskInputDescription');
const taskDate = document.getElementById('addtaskInputDate');

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


taskForm.addEventListener('submit', e => {
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
    const titleValue = taskTitle.value.trim();
    const descriptionValue = taskDescription.value.trim();
    const dateValue = taskDate.value;

    let correctTitle = false;
    let correctDescription = false;
    let correctDate = false;

    if (titleValue === '') {
        setTaskError(taskTitle, 'Title is required');
        correctTitle = false;
    } else {
        setTaskSuccess(taskTitle);
        correctTitle = true;
    }

    if (descriptionValue === '') {
        setTaskError(taskDescription, 'Description is required');
        correctDescription = false;
    } else {
        setTaskSuccess(taskDescription);
        correctDescription = true;
    }

    if (dateValue === '') {
        setTaskError(taskDate, 'Date is required dd.mm.yyyy');
        correctDate = false;
    } else {
        setTaskSuccess(taskDate);
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