function init() {
    renderCards();
    saveJSON();
}

function saveJSON() {
    const data = fs.readFileSync('database.json', 'utf-8');

    if(data.length !== 0){
        var parsedData = JSON.parse(data);
    }
    else{
        parsedData = [];
    }


    parsedData.push(data);

    const NewData = JSON.stringify(parsedData, null, 4);

    // Write new data to accounts.json
    fs.writeFileSync('database.json', NewData);
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
        <div class="bc-cardshadow" id="${card.id}" onclick="showCardDetails('${card.id}')">
            <div class="bc-cardbackground">
                <div class="bc-cardinner">
                    <div class="bc-cardcategory" style="background:${card.color}">${card.group}</div>
                    <div class="bc-cardtext-wrap">
                        <div class="bc-cardtext-inner">
                            <span class="bc-cardtitle">${card.title}</span>
                            <span class="bc-cardtext">${card.text}</span>
                        </div>
                    </div>
                    ${templateProgressbarHtml(card)}
                    <div class="bc-cardbottom-wrap">
                        <div class="bc-assignments">
                            ${templateAssignmentsHtml(card)}
                        </div>
                        <div class="bc-prio-wrap">
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
            <div class="bc-progressbar-wrap">
                <div class="bc-progressbar-outer">
                    <div class="bc-progressbar-inner" style="width: calc(138px * ${calculateProgressFactor(card)})"></div>
                </div>
                <span class="bc-progressbar-text">${countFinishedSubtasks(card)}/${card.subtask.length} Done</span>
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
            <div class="bc-circleleft">
                <span class="bc-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
        `
}


function returnTwoCircles(card) {
    return `
            <div class="bc-circleleft">
                <span class="bc-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="bc-circlemiddle">
                <span class="bc-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
        `
}


function returnThreeCircles(card) {
    return `
            <div class="bc-circleleft">
                <span class="bc-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="bc-circlemiddle">
                <span class="bc-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
            <div class="bc-circleright">
                <span class="bc-circle-text">${returnInitials(card.assigned[2])}</span>
            </div>
        `
}


function returnMoreCircles(card) {
    return `
            <div class="bc-circleleft">
                <span class="bc-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="bc-circlemiddle">
                <span class="bc-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
            <div class="bc-circleright">
                <span class="bc-circle-text">+${card.assigned.length - 2}</span>
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
            <img class="bc-prio-icon" src="/assets/img/priohigh.svg">
        `
    }
    if (card.priority == "medium") {
        return `
            <img class="bc-prio-icon" src="/assets/img/priomedium.svg">
        `
    } else {
        return `
            <img class="bc-prio-icon" src="/assets/img/priolow.svg">
        `
    }
}


function showCardDetails(cardId) {
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
    renderOverlayCard(cardId)
}


function closeTaskOverlay () {
    let overlay = document.getElementById("overlay");
    overlay.classList.add("d-none");
}


function renderOverlayCard(cardId) {
    let overlayCard = document.getElementById('overlayCard');
    overlayCard.innerHTML = "";
    overlayCard.innerHTML += templateOverlayCardHtml(cardId);
}


function templateOverlayCardHtml(cardId) {
    // .filter returns an array, therefore (although only one card per id exists) card[0] must be called, to acces the key-values
    let card = cards.filter(card => card.id == cardId);
    return `
        <div class="bc-taskoverlay-category" style="background:${card[0].color}">${card[0].group}</div>
    `
}