// Render process for Board page
function renderCards() {
    renderTodo();
    renderProgress();
    renderFeedback();
    renderDone();
}


function renderTodo() {
    let todo = document.getElementById("todo-canvas");
    todo.innerHTML = "";
    let todoCards = cards.filter(card => card.group == "To do");
    todoCards.forEach(card => {
        todo.innerHTML += taskTemplate.getBoardTask(card);
    });
    todo.innerHTML += taskTemplate.getDropzone('todo');
}


function renderProgress() {
    let progress = document.getElementById("progress-canvas");
    progress.innerHTML = "";
    let progressCards = cards.filter(card => card.group == "In Progress");
    progressCards.forEach(card => {
        progress.innerHTML += taskTemplate.getBoardTask(card);
    });
    progress.innerHTML += taskTemplate.getDropzone('progress');
}


function renderFeedback() {
    let feedback = document.getElementById("feedback-canvas");
    feedback.innerHTML = "";
    let feedbackCards = cards.filter(card => card.group == "Awaiting Feedback");
    feedbackCards.forEach(card => {
        feedback.innerHTML += taskTemplate.getBoardTask(card);
    });
    feedback.innerHTML += taskTemplate.getDropzone('feedback');
}


function renderDone() {
    let done = document.getElementById("done-canvas");
    done.innerHTML = "";
    let doneCards = cards.filter(card => card.group == "Done");
    doneCards.forEach(card => {
        done.innerHTML += taskTemplate.getBoardTask(card);
    });
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
    renderFilteredTodo(filteredList);
    renderFilteredProgress(filteredList);
    renderFilteredFeedback(filteredList);
    renderFilteredDone(filteredList);
}


function renderFilteredTodo(filteredList) {
    let todo = document.getElementById("todo-canvas");
    todo.innerHTML = "";
    let todoCards = filteredList.filter(card => card.group == "To do");
    todoCards.forEach(card => {
        todo.innerHTML += taskTemplate.getBoardCard(card);
    });
    todo.innerHTML += taskTemplate.getDropzone('todo');
}


function renderFilteredProgress(filteredList) {
    let progress = document.getElementById("progress-canvas");
    progress.innerHTML = "";
    let progressCards = filteredList.filter(card => card.group == "In Progress");
    progressCards.forEach(card => {
        progress.innerHTML += taskTemplate.getBoardTask(card);
    });
    progress.innerHTML += taskTemplate.getDropzone('progress');
}


function renderFilteredFeedback(filteredList) {
    let feedback = document.getElementById("feedback-canvas");
    feedback.innerHTML = "";
    let feedbackCards = filteredList.filter(card => card.group == "Awaiting Feedback");
    feedbackCards.forEach(card => {
        feedback.innerHTML += taskTemplate.getBoardTask(card);
    });
    feedback.innerHTML += taskTemplate.getDropzone('feedback');
}


function renderFilteredDone(filteredList) {
    let done = document.getElementById("done-canvas");
    done.innerHTML = "";
    let doneCards = filteredList.filter(card => card.group == "Done");
    doneCards.forEach(card => {
        done.innerHTML += taskTemplate.getBoardTask(card);
    });
    done.innerHTML += taskTemplate.getDropzone('done');
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