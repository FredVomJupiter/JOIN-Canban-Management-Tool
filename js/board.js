const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


function init() {
    renderCards();
    updateCounters();
    renderContactList();
}


// Render Process for Board Page
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


function filterCards() {
    let searchField = document.getElementById('searchField').value.toLowerCase();
    let filteredList = [];
    cards.forEach(card => {
        if((card.title.toLowerCase()).includes(searchField) || (card.text.toLowerCase()).includes(searchField)) {
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
    let todoCards = filteredList.filter(card => card.category == "To do");
    todoCards.forEach(card => {
        todo.innerHTML += templateCardHtml(card);
    });
}


function renderFilteredProgress(filteredList) {
    let progress = document.getElementById("progress-canvas");
    progress.innerHTML = "";
    let progressCards = filteredList.filter(card => card.category == "In Progress");
    progressCards.forEach(card => {
        progress.innerHTML += templateCardHtml(card);
    });
}


function renderFilteredFeedback(filteredList) {
    let feedback = document.getElementById("feedback-canvas");
    feedback.innerHTML = "";
    let feedbackCards = filteredList.filter(card => card.category == "Awaiting Feedback");
    feedbackCards.forEach(card => {
        feedback.innerHTML += templateCardHtml(card);
    });
}


function renderFilteredDone(filteredList) {
    let done = document.getElementById("done-canvas");
    done.innerHTML = "";
    let doneCards = filteredList.filter(card => card.category == "Done");
    doneCards.forEach(card => {
        done.innerHTML += templateCardHtml(card);
    });
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
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
            </div>
        `
}


function returnTwoCircles(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
            </div>
            <div class="board-circlemiddle">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[1])[0].name)}</span>
            </div>
        `
}


function returnThreeCircles(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
            </div>
            <div class="board-circlemiddle">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[1])[0].name)}</span>
            </div>
            <div class="board-circleright">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[2])[0].name)}</span>
            </div>
        `
}


function returnMoreCircles(card) {
    return `
            <div class="board-circleleft">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
            </div>
            <div class="board-circlemiddle">
                <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[1])[0].name)}</span>
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

// End Board Render Process


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
    let addcontact = document.getElementById('addcontactOverlay');
    addcontact.classList.add('d-none');
    let editcontact = document.getElementById('editcontactOverlay');
    editcontact.classList.add('d-none');
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
        <div class="board-taskoverlay-close-btn" onclick="closeOverlay()"></div>
        <div class="board-taskoverlay-category" style="background:${card[0].color}">${card[0].group}</div>
        <span class="board-taskoverlay-title">${card[0].title}</span>
        <span class="board-taskoverlay-text">${card[0].text}</span>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Due date:</span><span class="board-taskoverlay-value">${returnFormatedDate(card[0].date)}</span></div>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Priority:</span>${getPriorityForOverlay(card[0].priority)}</div>
        <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Assigned to:</span></div>
        ${getAssignedForOverlay(card[0].assigned)}
        <div class="board-taskoverlay-edit"></div>
    `
}


function returnFormatedDate(date) {
    if (date) {
        return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    } else {
        return "No date specified"
    }
    
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
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == person)[0].name)}</span>
                </div>
                <span class="board-taskoverlay-value">${contacts.filter(contact => contact.id == person)[0].name}</span>
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
    initNewTask();
}

// Functions for Summary Page

function updateCounters() {
    countTasks();
    countProgress();
    countFeedback();
    countUrgent();
    showUpcomingDeadline();
    countToDo();
    countDone();
}


function countTasks() {
    let tasksCounter = document.getElementById('tasksCounter');
    tasksCounter.innerHTML = "";
    tasksCounter.innerHTML = cards.length;
}


function countProgress() {
    let progressCounter = document.getElementById('progressCounter');
    progressCounter.innerHTML = "";
    progressCounter.innerHTML = cards.filter(card => card.category == "In Progress").length;
}


function countFeedback() {
    let feedbackCounter = document.getElementById('feedbackCounter');
    feedbackCounter.innerHTML = "";
    feedbackCounter.innerHTML = cards.filter(card => card.category == "Awaiting Feedback").length;
}


function countUrgent() {
    let urgentCounter = document.getElementById('urgentCounter');
    urgentCounter.innerHTML = "";
    urgentCounter.innerHTML = cards.filter(card => card.priority == "urgent").length;
}


function showUpcomingDeadline() {
    let urgentDate = document.getElementById('urgentDate');
    urgentDate.innerHTML = "";
    urgentDate.innerHTML = returnDeadline();
}


/**
 * This functon filters cards with prority "urgent" and if more than 1
 * urgent card exists, it hands over the list of cards to the "mostUrgentDeadline()"
 * function.
 * @returns String containing month, day and year.
 */
function returnDeadline() {
    let urgentDeadlines = cards.filter(card => card.priority == "urgent");
    if (urgentDeadlines.length >= 1) {
        let month = mostUrgentDeadline(urgentDeadlines).getMonth();
        let day = mostUrgentDeadline(urgentDeadlines).getDate();
        let year = mostUrgentDeadline(urgentDeadlines).getFullYear();
        return monthNames[month] + " " + day + ", " + year;
    }
    if (urgentDeadlines.length == 0) {
        return "No urgent";
    }
}


/**
 * 
 * @param {array} urgentDeadlines containing filtered cards with priority "urgent".
 * @returns the first date of a ascending sorted list of dates.
 */
function mostUrgentDeadline(urgentDeadlines) {
    let urgentDatesList = [];
    urgentDeadlines.forEach(urgent => {
        urgentDatesList.push(urgent.date);
    });
    urgentDatesList.sort((a, b) => a - b);
    return urgentDatesList[0];
}


function countToDo() {
    let todoCounter = document.getElementById('todoCounter');
    todoCounter.innerHTML = "";
    todoCounter.innerHTML = cards.filter(card => card.category == "To do").length;
}


function countDone() {
    let doneCounter = document.getElementById('doneCounter');
    doneCounter.innerHTML = "";
    doneCounter.innerHTML = cards.filter(card => card.category == "Done").length;
}
// End Functions for Summary Page

// Functions for Contacts Page
function openAddcontactOverlay() {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let addcontact = document.getElementById('addcontactOverlay');
    addcontact.classList.remove('d-none');
}


function openEditcontactOverlay(name) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let editcontact = document.getElementById('editcontactOverlay');
    editcontact.classList.remove('d-none');
    editcontact.innerHTML = "";
    let filtered = contacts.filter(contact => contact.name == name);
    editcontact.innerHTML = renderEditcontactOverlay(filtered[0].name, filtered[0].email, filtered[0].phone);
    contactId = filtered[0].id;
    initEditDOM();
}


function renderEditcontactOverlay(name, email, phone) {
    return `
        <img class="editcontact-task-close" src="./assets/img/clear.svg" onclick="closeOverlay()">
        <div class="editcontact-title-container">
            <img src="./assets/img/logo_white.svg" alt="logo">
            <div class="editcontact-title">Edit contact</div>
            <div class="editcontact-subtitle">Tasks are better with a team</div>
            <img src="./assets/img/horizontal_blue_line.svg">
        </div>
        <div class="editcontact-form">
            <div class="editcontact-user-badge">
                <img src="./assets/img/user_guest.svg">
            </div>
            <form class="editcontact-form-right" id="formEditcontact">
                <div class="editcontact-form-container">
                    <input class="editcontact-input-profile" type="text" placeholder="Name" id="editcontactInputName" value="${name}">
                    <div class="error"></div>
                </div>
                <div class="editcontact-form-container">
                    <input class="editcontact-input-email" type="text" placeholder="Email" id="editcontactInputEmail" value="${email}">
                    <div class="error"></div>
                </div>
                <div class="editcontact-form-container">
                    <input class="editcontact-input-phone" type="text" placeholder="Phone" id="editcontactInputPhone" value="${phone}">
                    <div class="error"></div>
                </div>
                <div class="editcontact-submit-btns">
                    <input class="editcontact-create-btn" type="submit" value="Save">
                </div>
            </form>
        </div>
    `;
}


function renderContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = "";
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Other"];
    alphabet.forEach(letter => {
        if (filterContactByLetter(contacts, letter).length > 0) {
            let filteredContacts = filterContactByLetter(contacts, letter);
            contactList.innerHTML += templateContactLetter(letter);
            filteredContacts.forEach(contact => {
                contactList.innerHTML += templateContactListHtml(contact);
            });
        }
    });
}


function filterContactByLetter(contacts, letter) {
    return contacts.filter(contact => contact.name.charAt(0) == letter);
}


function templateContactListHtml(contact) {
    return `
        <div class="contact-template-wrap" id="${contact.id}wrap" onclick="showContact('${contact.id}')">
            <div class="contact-template-circle">
                ${returnInitials(contact.name)}
            </div>
            <div class="contact-template-textwrap">
                <span class="contact-template-name" id="${contact.id}name">${contact.name}</span>
                <span class="contact-template-email">${contact.email}</span>
            </div>
        </div>
    `;
}


function templateContactLetter(letter) {
    return `
        <div class="contact-alphabet-wrap">
            <span class="contact-alphabet-text">${letter}</span>
        </div>
        <div class="contact-line-container">
            <div class="contact-line"></div>
        </div>
    `;
}


function showContact(id) {
    let contact = contacts.filter(contact => contact.id == id);
    let contactCanvas = document.getElementById('contactCanvas');
    markSelectedContact(contact[0].id);
    contactCanvas.innerHTML = "";
    contactCanvas.innerHTML = templateContactDetailsHtml(contact[0].name, contact[0].email, contact[0].phone);
}


function markSelectedContact(id) {
    renderContactList();
    let wrapper = document.getElementById(`${id}wrap`);
    wrapper.classList.remove('contact-template-wrap');
    wrapper.classList.add('contact-template-wrap-dark');
    let name = document.getElementById(`${id}name`);
    name.classList.remove('contact-template-name');
    name.classList.add('contact-template-name-light');
}


function templateContactDetailsHtml(name, email, phone) {
    return `
        <div class="contact-canvas-titlewrap">
            <div class="contact-canvas-circlewrap">
                <div class="contact-canvas-circleorange">
                    <span class="contact-canvas-circletext">${returnInitials(name)}</span>
                </div>
            </div>
            <div class="contact-canvas-namewrap">
                <span class="contact-canvas-name">${name}</span>
                <div class="contact-canvas-addtaskwrap" onclick="openAddtaskOverlay()">
                    <img class="contact-canvas-addtask-icon" src="./assets/img/addtask_blue.svg">
                    <span class="contact-canvas-addtast-text">Add task</span>
                </div>
            </div>
        </div>

        <div class="contact-canvas-infowrap">
            <span class="contact-canvas-info-text">Contact Information</span>
            <div class="contact-canvas-info-editwrap" onclick="openEditcontactOverlay('${name}')">
                <img src="./assets/img/black_pencil.svg">
                <span class="contact-canvas-info-edittext">Edit Contact</span>
            </div>
        </div>

        <div class="contact-canvas-detailswrap">
            <div class="contact-canvas-innerwrap">
                <span class="contact-canvas-innertitle">Email</span>
                <span class="contact-canvas-email">${email}</span>
            </div>
            <div class="contact-canvas-innerwrap">
                <span class="contact-canvas-innertitle">Phone</span>
                <span class="contact-canvas-phone">${phone}</span>
            </div>
        </div>
    `;
}