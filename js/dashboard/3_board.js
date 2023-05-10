const todo = document.getElementById("todo-canvas");
const progress = document.getElementById("progress-canvas");
const feedback = document.getElementById("feedback-canvas");
const done = document.getElementById("done-canvas");

// Render process for Board page
function renderCards() {
    clearBoardColumns();
    fillBoardColumns();
    addDropzones();
}


function clearBoardColumns() {
    todo.innerHTML = "";
    progress.innerHTML = "";
    feedback.innerHTML = "";
    done.innerHTML = "";
}


function fillBoardColumns() {
    cards.forEach(card => {
        card.group === 'To do' ? todo.innerHTML += taskTemplate.getBoardTask(card): "";
        card.group === "In Progress" ? progress.innerHTML += taskTemplate.getBoardTask(card) : "";
        card.group === "Awaiting Feedback" ? feedback.innerHTML += taskTemplate.getBoardTask(card) : "";
        card.group === "Done" ? done.innerHTML += taskTemplate.getBoardTask(card) : "";
    });
}


function addDropzones() {
    todo.innerHTML += taskTemplate.getDropzone('todo');
    progress.innerHTML += taskTemplate.getDropzone('progress');
    feedback.innerHTML += taskTemplate.getDropzone('feedback');
    done.innerHTML += taskTemplate.getDropzone('done');
}


function filterCards() {
    let searchField = document.getElementById('searchField').value.toLowerCase();
    let filteredList = [];
    cards.forEach(card => {
        if ((card.title.toLowerCase()).includes(searchField) || (card.text.toLowerCase()).includes(searchField)) {
            filteredList.push(card);
        }
    });
    renderFilteredCards(filteredList);
}


function renderFilteredCards(filteredList) {
    clearBoardColumns();
    fillBoardColumnsWithFilteredCards(filteredList);
    addDropzones();
}


function fillBoardColumnsWithFilteredCards(filteredList) {
    filteredList.forEach(card => {
        card.group === 'To do' ? todo.innerHTML += taskTemplate.getBoardTask(card): "";
        card.group === "In Progress" ? progress.innerHTML += taskTemplate.getBoardTask(card) : "";
        card.group === "Awaiting Feedback" ? feedback.innerHTML += taskTemplate.getBoardTask(card) : "";
        card.group === "Done" ? done.innerHTML += taskTemplate.getBoardTask(card) : "";
    });
}


/**
 * 
 * @param {string} name
 * @returns the initial letters of name and surname.
 */
function returnInitials(name) {
    return name.charAt(0) + name.charAt(name.indexOf(" ") + 1);
}

/**
 * Shows the task's details when user clicks on a small card on the Board.
 * @param {*} cardId as string.
 */
function showCardDetails(cardId) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    renderOverlayCard(cardId);
}


function showMoveList() {
    let moveList = document.getElementById("moveList");
    moveList.classList.contains('d-none') ? moveList.classList.remove('d-none') : moveList.classList.add('d-none');
}


function moveCard(cardId, group) {
    cards.forEach(card => {
        if (card.id === cardId) {
            card.group = group;
        }
    });
    showMoveList();
    saveLocalStorage('cards');
    renderCards();
}

/**
 * Hides the Overlay when user clicks on the background or the close button.
 */
function closeOverlay() {
    isNewTask = true; // Sets the logic to a new task.
    let domElementList = ['overlayBackground', 'overlayCard', 'addtaskOverlay', 'addcontactOverlay', 'editcontactOverlay', 'taskClearButton'];
    domElementList.forEach(element => {
        let domElement = document.getElementById(element);
        domElement.classList.add('d-none');
        element === 'addtaskOverlay' ? domElement.classList.add('hidden') : "";
        element === 'taskClearButton' ? domElement.classList.remove('d-none') : "";
    });
    clearOverlay();// This clears the addtask overlay fields.
}

/**
 * Rendering the html template. Called by showCardDetails(cardId).
 * @param {*} cardId as string.
 */
function renderOverlayCard(cardId) {
    let overlayCard = document.getElementById('overlayCard');
    overlayCard.classList.remove('d-none');
    overlayCard.innerHTML = "";
    overlayCard.innerHTML += taskTemplate.getOverlayTask(cardId);
}


function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * Returns a date as string. Whereas the month is plain text e.g "April".
 * The days have 2 digits (e.g. 01 or 21 etc.) and the year has 4 digits.
 * @param {*} date as Date-object.
 * @returns a formatted date as string.
 */
function returnFormatedDate(date) {
    if (date) {
        return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    } else {
        return "No date specified"
    }
}


function openAddtaskOverlay(group) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let taskoverlay = document.getElementById('addtaskOverlay');
    taskoverlay.classList.remove('d-none');
    taskoverlay.classList.remove('hidden');
    initNewTask();
    newTask.group = group;
}

// End render process for Board page