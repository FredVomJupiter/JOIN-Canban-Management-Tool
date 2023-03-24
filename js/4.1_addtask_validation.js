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
