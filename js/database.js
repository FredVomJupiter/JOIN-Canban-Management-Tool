let cards = [
    {
        id: "card0",
        category: "To do",
        group: "Design",
        title: "Website redesign",
        text: "Modify the contents of the main website...",
        date: 05 - 08 - 2022,
        priority: "low",
        assigned: ["Anton Mayer", "Horst Buddler", "Ibrahimovic Zoltan", "Dieter Müller"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 0 }]
    },
    {
        id: "card1",
        category: "In Progress",
        group: "Sales",
        title: "Call potential clients with a bananaphone",
        text: "Make the product presentation to prospective buyers",
        date: 06 - 07 - 2022,
        priority: "urgent",
        assigned: ["Anton Mayer", "Horst Buddler", "Ibrahimovic Zoltan"],
        subtask: []
    },
    {
        id: "card2",
        category: "Awaiting Feedback",
        group: "Backoffice",
        title: "Accounting invoices",
        text: "Write open invoices for customer",
        date: 22 - 07 - 2022,
        priority: "medium",
        assigned: ["Anton Mayer", "Horst Buddler", "Ibrahimovic Zoltan"],
        subtask: []
    },
    {
        id: "card3",
        category: "Awaiting Feedback",
        group: "Media",
        title: "Video cut",
        text: "Edit the new company video",
        date: 06 - 09 - 2022,
        priority: "medium",
        assigned: ["Anton Mayer"],
        subtask: []
    },
    {
        id: "card4",
        category: "Awaiting Feedback",
        group: "Media",
        title: "Video cut 2",
        text: "Reedit the video",
        date: 06 - 10 - 2022,
        priority: "medium",
        assigned: ["Anton Mayer"],
        subtask: []
    },
    {
        id: "card5",
        category: "Done",
        group: "Marketing",
        title: "Social media strategy",
        text: "Develop an ad campaign for brand positioning",
        date: 06 - 07 - 2022,
        priority: "low",
        assigned: ["Anton Mayer", "Horst Buddler"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 0 }]
    }
];


function init() {
    renderCards();
}


// Render process
function renderCards() {
    let todo = document.getElementById("todo-canvas");
    todo.innerHTML = "";
    cards.forEach(card => {
        if (card.category == "To do") {
            todo.innerHTML += templateCardHtml(card);
        }
    });
}


function templateCardHtml(card) {
    return `
        <div class="bc-cardshadow" id="${card.id}">
            <div class="bc-cardbackground">
                <div class="bc-cardinner">
                    <div class="bc-cardcategory" style="background:#FF7A00">${card.group}</div>
                    <div class="bc-cardtext-wrap">
                        <div class="bc-cardtext-inner">
                            <span class="bc-cardtitle">${card.title}</span>
                            <span class="bc-cardtext">${card.text}</span>
                        </div>
                    </div>
                    <div class="bc-progressbar-wrap">
                        ${templateProgressbarHtml(card)}
                    </div>
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
    return `
        <div class="bc-progressbar-outer">
            <div class="bc-progressbar-inner" style="width: calc(138px * ${calculateProgressFactor(card)})"></div>
        </div>
        <span class="bc-progressbar-text">${countFinishedSubtasks(card)}/${card.subtask.length} Done</span>
    `
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


function templateAssignmentsHtml(card) {
    if (card.assigned.length == 1) {
        return `
            <div class="bc-circleleft">
                <span class="bc-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
        `
    }
    if (card.assigned.length == 2) {
        return `
            <div class="bc-circleleft">
                <span class="bc-circle-text">${returnInitials(card.assigned[0])}</span>
            </div>
            <div class="bc-circlemiddle">
                <span class="bc-circle-text">${returnInitials(card.assigned[1])}</span>
            </div>
        `
    }
    if (card.assigned.length == 3) {
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
    if (card.assigned.length > 3) {
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