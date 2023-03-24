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
    const taskOverlayCategory = document.getElementById('addtaskOverlayCategory');
    const taskOverlayAssigned = document.getElementById('addtaskOverlayAssigned');
    const taskOverlayAssignedDisplay = document.getElementById('displayOverlayAssigned');
    const categoryValue = taskOverlayCategory.innerText;

    let correctTitle = validateOverlayTitle(titleValue);
    let correctDescription = validateOverlayDescription(descriptionValue);
    let correctDate = validateOverlayDate(dateValue);
    let correctCategory = validateCategory(categoryValue, taskOverlayCategory);
    let correctAssigned = validateAssigned(taskOverlayAssigned, taskOverlayAssignedDisplay);

    // In overlay both new tasks can be created and existing edited => therefore, two saving options.
    if (correctTitle & correctDescription & correctDate & correctCategory & correctAssigned & isNewTask) {
        transferDataToTemporaryStorage("new", titleValue, descriptionValue, dateValue);
        saveNewTask();
    }
    if (correctTitle & correctDescription & correctDate & correctCategory & correctAssigned & !isNewTask) {
        transferDataToTemporaryStorage("edited", titleValue, descriptionValue, dateValue);
        saveEditedTask();
    }
}


function validateOverlayTitle(titleValue) {
    if (titleValue === '') {
        setTaskError(taskOverlayTitle, 'Title is required');
        return false;
    } else {
        setTaskSuccess(taskOverlayTitle);
        return true;
    }
}


function validateOverlayDescription(descriptionValue) {
    if (descriptionValue === '') {
        setTaskError(taskOverlayDescription, 'Description is required');
        return false;
    } else {
        setTaskSuccess(taskOverlayDescription);
        return true;
    }
}


function validateOverlayDate(dateValue) {
    if (dateValue === '') {
        setTaskError(taskOverlayDate, 'Date is required dd.mm.yyyy');
        return false;
    } else {
        setTaskSuccess(taskOverlayDate);
        return true;
    }
}


function validateCategory(categoryValue, category) {
    if (categoryValue === 'Select task category' || categoryValue === 'Required!') {
        category.innerText = "Required!";
        category.style.borderColor = "red";
        return false;
    } else {
        return true;
    }
}


function validateAssigned(assigned, displayAssigned) {
    if (displayAssigned.innerHTML === "") {
        assigned.innerText = "Required!";
        assigned.style.borderColor = "red";
        return false;
    } else {
        return true;
    }
}


function menuValidation() {
    const titleValue = taskMenuTitle.value.trim();
    const descriptionValue = taskMenuDescription.value.trim();
    const dateValue = taskMenuDate.value;
    const taskMenuCategory = document.getElementById('addtaskMenuCategory');
    const taskMenuAssigned = document.getElementById('addtaskMenuAssigned');
    const taskMenuAssignedDisplay = document.getElementById('displayMenuAssigned');
    const categoryValue = taskMenuCategory.innerText;

    let correctTitle = validateMenuTitle(titleValue);
    let correctDescription = validateMenuDescription(descriptionValue);
    let correctDate = validateMenuDate(dateValue);
    let correctCategory = validateCategory(categoryValue, taskMenuCategory);
    let correctAssigned = validateAssigned(taskMenuAssigned, taskMenuAssignedDisplay);

    // In menu only new tasks can be created => therefore, only new tasks can be saved.
    if (correctTitle & correctDescription & correctDate & correctCategory & correctAssigned) {
        transferDataToTemporaryStorage("new", titleValue, descriptionValue, dateValue);
        saveNewTask();
    }
}


function validateMenuTitle(titleValue) {
    if (titleValue === '') {
        setTaskError(taskMenuTitle, 'Title is required');
        return false;
    } else {
        setTaskSuccess(taskMenuTitle);
        return true;
    }
}


function validateMenuDescription(descriptionValue) {
    if (descriptionValue === '') {
        setTaskError(taskMenuDescription, 'Description is required');
        return false;
    } else {
        setTaskSuccess(taskMenuDescription);
        return true;
    }

}


function validateMenuDate(dateValue) {
    if (dateValue === '') {
        setTaskError(taskMenuDate, 'Date is required dd.mm.yyyy');
        return false;
    } else {
        setTaskSuccess(taskMenuDate);
        return true;
    }
}


function transferDataToTemporaryStorage(type, titleValue, descriptionValue, dateValue) {
    newTask.title = titleValue;
    newTask.text = descriptionValue;
    newTask.date = new Date(dateValue);
    newTask.assigned = copyAssigned();
    newTask.subtask = copySubtasks();
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