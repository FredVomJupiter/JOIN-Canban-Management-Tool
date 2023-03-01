function init() {
    renderCards();
    updateCounters()
}


// Render process
function renderCards() {
    renderTodo();
    renderProgress();
    renderFeedback();
    renderDone();
}


function renderTodo() {
    let todo = document.getElementById("todo-canvas");
    todo.innerHTML = "";
    let todoCards = cards.filter(card => card.category == "To do");
    todoCards.forEach(card => {
        todo.innerHTML += templateCardHtml(card);
    });
}


function renderProgress() {
    let progress = document.getElementById("progress-canvas");
    progress.innerHTML = "";
    let progressCards = cards.filter(card => card.category == "In Progress");
    progressCards.forEach(card => {
        progress.innerHTML += templateCardHtml(card);
    });
}


function renderFeedback() {
    let feedback = document.getElementById("feedback-canvas");
    feedback.innerHTML = "";
    let feedbackCards = cards.filter(card => card.category == "Awaiting Feedback");
    feedbackCards.forEach(card => {
        feedback.innerHTML += templateCardHtml(card);
    });
}


function renderDone() {
    let done = document.getElementById("done-canvas");
    done.innerHTML = "";
    let doneCards = cards.filter(card => card.category == "Done");
    doneCards.forEach(card => {
        done.innerHTML += templateCardHtml(card);
    });
}


function templateCardHtml(card) {
    return `
        <div class="board-cardshadow" id="${card.id}" onclick="showCardDetails('${card.id}')">
            <div class="board-cardbackground">
                <div class="board-cardinner">
                    <div class="board-cardcategory" style="background:${card.color}">${card.group}</div>
                    <div class="board-cardtext-wrap">
                        <div class="board-cardtext-inner">
                            <span class="board-cardtitle">${card.title}</span>
                            <span class="board-cardtext">${card.text}</span>
                        </div>
                    </div>
                    ${templateProgressbarHtml(card)}
                    <div class="board-cardbottom-wrap">
                        <div class="board-assignments">
                            ${templateAssignmentsHtml(card)}
                        </div>
                        <div class="board-prio-wrap">
                            ${templatePriorityHtml(card)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}


function templateProgressbarHtml(card) {
    if (card.subtask.length > 0) {
        return `
            <div class="board-progressbar-wrap">
                <div class="board-progressbar-outer">
                    <div class="board-progressbar-inner" style="width: calc(138px * ${calculateProgressFactor(card)})"></div>
                </div>
                <span class="board-progressbar-text">${countFinishedSubtasks(card)}/${card.subtask.length} Done</span>
            </div>
        `
    } else {
        return "";
    }
}


function calculateProgressFactor(card) {
    return countFinishedSubtasks(card) / card.subtask.length;
}


/**
 * 
 * @param {object} card 
 * @returns integer as number of subtasks with status 1.
 */
function countFinishedSubtasks(card) {
    return counter = card.subtask.filter(task => task.status > 0).length;
}


/**
 * 
 * @param {object} card 
 * @returns html template of circles with initials from Name & Surname of assigned persons
 */
function templateAssignmentsHtml(card) {
    if (card.assigned.length == 1) {
        return returnOneCircle(card);
    }
    if (card.assigned.length == 2) {
        return returnTwoCircles(card);
    }
    if (card.assigned.length == 3) {
        return returnThreeCircles(card);
    }
    if (card.assigned.length > 3) {
        return returnMoreCircles(card);
    }
}


function returnOneCircle(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
        `
}


function returnTwoCircles(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="board-circlemiddle">
                <span class="board-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
        `
}


function returnThreeCircles(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="board-circlemiddle">
                <span class="board-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
            <div class="board-circleright">
                <span class="board-circle-text">${returnInitials(card.assigned[2])}</span>
            </div>
        `
}


function returnMoreCircles(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="board-circlemiddle">
                <span class="board-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
            <div class="board-circleright">
                <span class="board-circle-text">+${card.assigned.length - 2}</span>
            </div>
        `
}


/**
 * 
 * @param {string} name
 * @returns the initial letters of Name and Surname.
 */
function returnInitials(name) {
    return name.charAt(0) + name.charAt(name.indexOf(" ") + 1);
}


function templatePriorityHtml(card) {
    if (card.priority == "urgent") {
        return `
            <img class="board-prio-icon" src="./assets/img/priohigh.svg">
        `
    }
    if (card.priority == "medium") {
        return `
            <img class="board-prio-icon" src="./assets/img/priomedium.svg">
        `
    } else {
        return `
            <img class="board-prio-icon" src="./assets/img/priolow.svg">
        `
    }
}


function showCardDetails(cardId) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    renderOverlayCard(cardId);
}


function closeOverlay() {
    let background = document.getElementById("overlayBackground");
    background.classList.add("d-none");
    let overlayCard = document.getElementById('overlayCard');
    overlayCard.classList.add('d-none');
    let taskoverlay = document.getElementById('addtaskOverlay');
    taskoverlay.classList.add('d-none');
    taskoverlay.classList.add('hidden');
}


function renderOverlayCard(cardId) {
    let overlayCard = document.getElementById('overlayCard');
    overlayCard.classList.remove('d-none');
    overlayCard.innerHTML = "";
    overlayCard.innerHTML += templateOverlayCardHtml(cardId);
}


function stopPropagation(event) {
    event.stopPropagation();
}


function templateOverlayCardHtml(cardId) {
    // .filter returns an array, therefore (although only one card per id exists) card[0] must be called, to acces the key-values
    let card = cards.filter(card => card.id == cardId);
    return `
        <div class="board-taskoverlay-close-btn" onclick="closeOverlay()">X</div>
        <div class="board-taskoverlay-category" style="background:${card[0].color}">${card[0].group}</div>
        <span class="board-taskoverlay-title">${card[0].title}</span>
        <span class="board-taskoverlay-text">${card[0].text}</span>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Due date:</span><span class="board-taskoverlay-value">${card[0].date}</span></div>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Priority:</span>${getPriorityForOverlay(card[0].priority)}</div>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Subtasks:</span><div class="board-overlay-subtasks">${getSubtasksForOverlay(card[0].subtask)}</div></div>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Assigned to:</span></div>
        ${getAssignedForOverlay(card[0].assigned)}
    `
}


function getPriorityForOverlay(prio) {
    if (prio == "urgent") {
        return '<img src="./assets/img/prio_overlay_urgent.svg"></img>';
    } 
    if (prio == "medium") {
        return '<img src="./assets/img/prio_overlay_medium.svg"></img>';
    } else {
        return '<img src="./assets/img/prio_overlay_low.svg"></img>';
    }
}


function getSubtasksForOverlay(subtask) {
    if (subtask.length > 0) {
        let lines = "";
        subtask.forEach(task => {
            lines += `<span class="board-taskoverlay-value">${task.text} ${task.status == 1 ? "(Done)" : "(To Do)"}</span>`;
        });
        return lines;
    } else {
        return `<span class="board-taskoverlay-value">none</span>`;
    }
}


function getAssignedForOverlay(assigned) {
    let lines = `<div class="board-taskoverlay-box">`;
    assigned.forEach(person => {
        lines += `
            <div class="board-taskoverlay-line">
                <div class="board-circleleft">
                    <span class="board-circle-text">${returnInitials(person)}</span>
                </div>
                <span class="board-taskoverlay-value">${person}</span>
            </div>
        `;
    });
    lines += `</div>`;
    return lines;
}


function openAddtaskOverlay() {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let taskoverlay = document.getElementById('addtaskOverlay');
    taskoverlay.classList.remove('d-none');
    taskoverlay.classList.remove('hidden');
}


function updateCounters() {
    let tasksCounter = document.getElementById('tasksCounter');
    tasksCounter.innerHTML = "";
    tasksCounter.innerHTML = cards.length;

    let progressCounter = document.getElementById('progressCounter');
    progressCounter.innerHTML = "";
    progressCounter.innerHTML = cards.filter(card => card.category == "In Progress").length;

    let feedbackCounter = document.getElementById('feedbackCounter');
    feedbackCounter.innerHTML = "";
    feedbackCounter.innerHTML = cards.filter(card => card.category == "Awaiting Feedback").length
}