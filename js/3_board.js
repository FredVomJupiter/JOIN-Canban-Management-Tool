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
 * @returns the initial letters of Name and Surname.
 */
function returnInitials(name) {
    return name.charAt(0) + name.charAt(name.indexOf(" ") + 1);
}


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


function closeOverlay() {
    isNewTask = true;
    let background = document.getElementById("overlayBackground");
    background.classList.add("d-none");
    let overlayCard = document.getElementById('overlayCard');
    overlayCard.classList.add('d-none');
    let taskoverlay = document.getElementById('addtaskOverlay');
    taskoverlay.classList.add('d-none');
    taskoverlay.classList.add('hidden');
    let addcontact = document.getElementById('addcontactOverlay');
    addcontact.classList.add('d-none');
    let editcontact = document.getElementById('editcontactOverlay');
    editcontact.classList.add('d-none');
    // This clears the addtask overlay fields
    clearOverlay();
}


function renderOverlayCard(cardId) {
    let overlayCard = document.getElementById('overlayCard');
    overlayCard.classList.remove('d-none');
    overlayCard.innerHTML = "";
    overlayCard.innerHTML += taskTemplate.getOverlayTask(cardId);
}


function stopPropagation(event) {
    event.stopPropagation();
}


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