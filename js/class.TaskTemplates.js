class TaskTemplate {

    constructor() {

    }

    // Methods for miniature task cards on board

    getBoardTask(card) {
        return `
            <div class="board-cardshadow" id="${card.id}" draggable="true" onclick="showCardDetails('${card.id}')" ondragstart="dragstart(event, '${card.id}')">
                <div class="board-cardbackground">
                    <div class="board-cardinner">
                        <div class="board-cardcategory" style="background:${card.color}">${card.category}</div>
                        <div class="board-cardtext-wrap">
                            <div class="board-cardtext-inner">
                                <span class="board-cardtitle">${card.title}</span>
                                <span class="board-cardtext">${card.text}</span>
                            </div>
                        </div>
                        ${this.getProgressbar(card)}
                        <div class="board-cardbottom-wrap">
                            <div class="board-assignments">
                                ${this.getAssignments(card)}
                            </div>
                            <div class="board-prio-wrap">
                                ${this.getPriority(card)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }


    getProgressbar(card) {
        if (card.subtask.length > 0) {
            return `
                <div class="board-progressbar-wrap">
                    <div class="board-progressbar-outer">
                        <div class="board-progressbar-inner" style="width: calc(138px * ${this.calculateProgressFactor(card)})"></div>
                    </div>
                    <span class="board-progressbar-text">${this.countFinishedSubtasks(card)}/${card.subtask.length} Done</span>
                </div>
            `
        } else {
            return "";
        }
    }


    calculateProgressFactor(card) {
        return this.countFinishedSubtasks(card) / card.subtask.length;
    }


    /**
     * 
     * @param {object} card 
     * @returns integer as number of subtasks with status 1.
     */
    countFinishedSubtasks(card) {
        return card.subtask.filter(task => task.status > 0).length;
    }


    /**
 * 
 * @param {object} card 
 * @returns html template of circles with initials from Name & Surname of assigned persons
 */
    getAssignments(card) {

        if (card.assigned.length == 1) {
            return this.getOneCircle(card);
        }
        else if (card.assigned.length == 2) {
            return this.getTwoCircles(card);
        }
        else if (card.assigned.length == 3) {
            return this.getThreeCircles(card);
        }
        else if (card.assigned.length > 3) {
            return this.getMoreCircles(card);
        }
        else {
            return "";
        }
    }


    getOneCircle(card) {
        return `
                <div class="board-circleleft" style="background:${contacts.filter(contact => contact.id == card.assigned[0])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
                </div>
            `
    }


    getTwoCircles(card) {
        return `
                <div class="board-circleleft" style="background:${contacts.filter(contact => contact.id == card.assigned[0])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
                </div>
                <div class="board-circlemiddle" style="background:${contacts.filter(contact => contact.id == card.assigned[1])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[1])[0].name)}</span>
                </div>
            `
    }


    getThreeCircles(card) {
        return `
                <div class="board-circleleft" style="background:${contacts.filter(contact => contact.id == card.assigned[0])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
                </div>
                <div class="board-circlemiddle" style="background:${contacts.filter(contact => contact.id == card.assigned[1])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[1])[0].name)}</span>
                </div>
                <div class="board-circleright" style="background:${contacts.filter(contact => contact.id == card.assigned[2])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[2])[0].name)}</span>
                </div>
            `
    }


    getMoreCircles(card) {
        return `
                <div class="board-circleleft" style="background:${contacts.filter(contact => contact.id == card.assigned[0])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[0])[0].name)}</span>
                </div>
                <div class="board-circlemiddle" style="background:${contacts.filter(contact => contact.id == card.assigned[1])[0].color}">
                    <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == card.assigned[1])[0].name)}</span>
                </div>
                <div class="board-circleright">
                    <span class="board-circle-text">+${card.assigned.length - 2}</span>
                </div>
            `
    }


    getPriority(card) {
        if (card.priority == "urgent") {
            return `
                <img class="board-prio-icon" src="./assets/img/priohigh.svg">
            `
        }
        else if (card.priority == "medium") {
            return `
                <img class="board-prio-icon" src="./assets/img/priomedium.svg">
            `
        } else {
            return `
                <img class="board-prio-icon" src="./assets/img/priolow.svg">
            `
        }
    }


    getDropzone(location) {
        if (location === "todo") {
            return `<div class="dropzone" id="dropZoneTodo" ondrop="dragend(event, '${'To do'}')" ondragover="dragover(event)" ondragenter="dragenter(event, 'dropZoneTodo')" ondragleave="dragleave(event, 'dropZoneTodo')"></div>`;
        }
        if (location === "progress") {
            return `<div class="dropzone" id="dropZoneProgress" ondrop="dragend(event, '${'In Progress'}')" ondragover="dragover(event)" ondragenter="dragenter(event, 'dropZoneProgress')" ondragleave="dragleave(event, 'dropZoneProgress')"></div>`;
        }
        if (location === "feedback") {
            return `<div class="dropzone" id="dropZoneFeedback" ondrop="dragend(event, '${'Awaiting Feedback'}')" ondragover="dragover(event)" ondragenter="dragenter(event, 'dropZoneFeedback')" ondragleave="dragleave(event, 'dropZoneFeedback')"></div>`;
        }
        if (location === "done") {
            return `<div class="dropzone" id="dropZoneDone" ondrop="dragend(event, '${'Done'}')" ondragover="dragover(event)" ondragenter="dragenter(event, 'dropZoneDone')" ondragleave="dragleave(event, 'dropZoneDone')"></div>`;
        }
    }

    // Methods for detailed overlay-view of each task on board

    getOverlayTask(cardId) {
        // .filter returns an array, therefore (although only one card per id exists) card[0] must be called, to acces the key-values
        let card = cards.filter(card => card.id == cardId);
        return `
            <div class="board-taskoverlay-close-btn" onclick="closeOverlay()"></div>
            <div class="board-taskoverlay-category" style="background:${card[0].color}">${card[0].category}</div>
            <span class="board-taskoverlay-title">${card[0].title}</span>
            <span class="board-taskoverlay-text">${card[0].text}</span>
            <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Due date:</span><span class="board-taskoverlay-value">${returnFormatedDate(new Date(card[0].date))}</span></div>
            <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Priority:</span>${this.getPriority(card[0])}</div>
            <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Subtasks:</span>${this.getOverlaySubtasksPercentage(card[0])}</div>
            ${this.getOverlaySubtasks(card[0])}
            <div class="board-taskoverlay-line"><span class="board-taskoverlay-subtitle">Assigned to:</span></div>
            ${this.getOverlayAssigned(card[0].assigned)}
            <div class="board-taskoverlay-btnwrap">
                <div class="board-taskoverlay-move" onclick="showMoveList()"></div>
                <div class="board-taskoverlay-edit" onclick="editCard('${cardId}')"></div>
                <div class="board-taskoverlay-moveMenu d-none" id="moveList">
                    <span onclick="moveCard('${cardId}', 'To do')">to do</span>
                    <span onclick="moveCard('${cardId}', 'In Progress')">progressing</span>
                    <span onclick="moveCard('${cardId}', 'Awaiting Feedback')">needs feedback</span>
                    <span onclick="moveCard('${cardId}', 'Done')">done</span>
                </div>
                
            </div>
            
        `
    }

    
    getOverlaySubtasksPercentage(card) {
        if (card.subtask.length > 0) {
            return `
                <div class="board-taskoverlay-percentage">
                    <div class="board-taskoverlay-percentage-inner-gray">
                        <div class="board-taskoverlay-percentage-inner-blue" style="width: calc(200px * ${this.calculateProgressFactor(card)})"></div>
                    </div>
                    <span class="board-taskoverlay-percetage-text">${this.countFinishedSubtasks(card)}/${card.subtask.length} Done</span>
                </div>
            `;
        } else {
            return ""
        }
    }


    getOverlaySubtasks(card) {
        if (card.subtask.length > 0) {
            let lines = "";
            card.subtask.forEach(task => {
                lines += `<span class="board-taskoverlay-value">
                        ${task.status == 1 ? this.placeOverlayCheckbox(1, card.id, card.subtask.indexOf(task)) : this.placeOverlayCheckbox(0, card.id, card.subtask.indexOf(task))} ${task.name}
                        </span>
                    `;
            });
            return lines;
        } else {
            return `<span class="board-taskoverlay-value">none</span>`;
        }
    }


    placeOverlayCheckbox(check, cardId, taskIndex) {
        if (check === 1) {
            return `<input type="checkbox" id="${cardId + taskIndex}" checked onclick="checkOverlayCheckbox('${cardId}', '${taskIndex}')">`;
        } else {
            return `<input type="checkbox" id="${cardId + taskIndex}" onclick="checkOverlayCheckbox('${cardId}', '${taskIndex}')">`;
        }
    }


    getOverlayAssigned(assigned) {
        let lines = `<div class="board-taskoverlay-box">`;
        assigned.forEach(person => {
            lines += `
                <div class="board-taskoverlay-line">
                    <div class="board-circleleft" style="background:${contacts.filter(contact => contact.id == person)[0].color}">
                        <span class="board-circle-text">${returnInitials(contacts.filter(contact => contact.id == person)[0].name)}</span>
                    </div>
                    <span class="board-taskoverlay-value">${contacts.filter(contact => contact.id == person)[0].name}</span>
                </div>
            `;
        });
        lines += `</div>`;
        return lines;
    }

    // Methods for addtask overlay / menu page

    setOverlayUrgent() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh_white.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('overlay', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    setOverlayMedium() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline orangebackground" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium_white.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('overlay', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    setOverlayLow() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline greenbackground" style="width: 136px;" onclick="setPriority('overlay', 'low')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow_white.svg">
            </div>
        `;
    }


    setMenuUrgent() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh_white.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('menu', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('menu', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    setMenuMedium() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline orangebackground" style="width: 130px;" onclick="setPriority('menu', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium_white.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('menu', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    setMenuLow() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('menu', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline greenbackground" style="width: 136px;" onclick="setPriority('menu', 'low')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow_white.svg">
            </div>
        `;
    }


    setCategoryHeader(location) {
        return `
            <div class="addtask-leftcontainer-selection fixed" onclick="foldCategories('${location}')">
                <span class="addtask-leftcontainer-categorytext">Select task category</span>
                <img class="category-icon" src="./assets/img/dropdown.svg">
            </div>
            <div class="addtask-leftcontainer-selection relative" onclick="createNewCategory('${location}')">
                <span class="addtask-leftcontainer-categorytext">New category</span>
            </div>
        `;
    }


    setCategories(category, location) {
        return `
            <div class="addtask-leftcontainer-selection relative" onclick="selectCategory('${category.name}', '${category.color}', '${location}')">
                <span class="addtask-leftcontainer-categorytext">${category.name}</span>
                <div class="addtask-leftcontainer-circle" style="background:${category.color}"></div>
            </div>
        `;
    }


    resetOverlayCategory() {
        return `
            <div class="addtask-leftcontainer-category">
                <span class="addtask-leftcontainer-categorytext">Category</span>
                <div class="addtask-leftcontainer-categoryfield" id="addtaskOverlayCategory" onclick="expandCategories('overlay')">Select task category
                </div>
            </div>
        `;
    }


    resetMenuCategory() {
        return `
            <div class="addtask-leftcontainer-category">
                <span class="addtask-leftcontainer-categorytext">Category</span>
                <div class="addtask-leftcontainer-categoryfield" id="addtaskMenuCategory" onclick="expandCategories('menu')">Select task category
                </div>
            </div>
        `;
    }


    setNewCategory(categoryName, categoryColor) {
        return categoryName + `<div class="addtask-leftcontainer-circle" style="background:${categoryColor}"></div>`;
    }


    setNewCategoryUserinput(location, newCategory) {
        if (location === "menu") {
            return `
                <input class="addtask-leftcontainer-newcategory" id="newCategoryNameMenu" placeholder="New category Name">
                <div class="addtask-leftcontainer-circle" style="background:${newCategory.color}" id="newCategoryMenu"></div>
                <img src="./assets/img/clear.svg" onclick="foldCategories('menu')">
                <div style="height: 20px; width:0px; border: 1px solid black"></div>
                <img src="./assets/img/check_black.svg" onclick="saveNewCategory('menu')">
            `;
        } else {
            return `
                <input class="addtask-leftcontainer-newcategory" id="newCategoryNameOverlay" placeholder="New category Name">
                <div class="addtask-leftcontainer-circle" style="background:${newCategory.color}" id="newCategoryOverlay"></div>
                <img src="./assets/img/clear.svg" onclick="foldCategories('overlay')">
                <div style="height: 20px; width:0px; border: 1px solid black"></div>
                <img src="./assets/img/check_black.svg" onclick="saveNewCategory('overlay')">
            `;
        }

    }


    setNewCategoryColorbar(location) {
        return `
                <div style="display: flex; flex-direction: row; gap: 10px;">
                    <div class="addtask-leftcontainer-circle" style="background:${colors[2]}; cursor: pointer" onclick="selectNewCategoryColor('${colors[2]}', '${location}')"></div>
                    <div class="addtask-leftcontainer-circle" style="background:${colors[5]}; cursor: pointer" onclick="selectNewCategoryColor('${colors[5]}', '${location}')"></div>
                    <div class="addtask-leftcontainer-circle" style="background:${colors[8]}; cursor: pointer" onclick="selectNewCategoryColor('${colors[8]}', '${location}')"></div>
                    <div class="addtask-leftcontainer-circle" style="background:${colors[12]}; cursor: pointer" onclick="selectNewCategoryColor('${colors[12]}', '${location}')"></div>
                    <div class="addtask-leftcontainer-circle" style="background:${colors[15]}; cursor: pointer" onclick="selectNewCategoryColor('${colors[15]}', '${location}')"></div>
                    <div class="addtask-leftcontainer-circle" style="background:${colors[16]}; cursor: pointer" onclick="selectNewCategoryColor('${colors[16]}', '${location}')"></div>
                </div>
            `;
    }


    setCategoryColor(location, color) {
        if (location === "menu") {
            return `
                <div class="addtask-leftcontainer-circle" style="background:${color}" id="newCategoryMenu"></div>
            `;
        } else {
            return `
                <div class="addtask-leftcontainer-circle" style="background:${color}" id="newCategoryOverlay"></div>
            `;
        }
    }


    setAssignedHeader(location) {
        return `
            <div class="addtask-leftcontainer-selection fixed" onclick="foldAssigned('${location}')">
                <span class="addtask-leftcontainer-assignedtext">Select contacts to assign</span>
                <img class="assigned-icon" src="./assets/img/dropdown.svg">
            </div>
        `;
    }


    setAssigned(contact, location) {
        return `
            <div class="addtask-leftcontainer-selection">
                <span class="addtask-leftcontainer-assignedtext">${contact.name}</span>
                <input class="addtask-rightcontainer-subtask-checkbox" id="${contact.id}" type="checkbox" onclick="selectAssigned('${contact.id}', '${contact.name}', '${contact.color}', '${location}')">
            </div>
        `;
    }


    resetOverlayAssigned() {
        return `
            <div class="addtask-leftcontainer-assignedfield" id="addtaskOverlayAssigned" onclick="expandAssigned('overlay')">Select contacts to assign
            </div>
        `;
    }


    resetMenuAssigned() {
        return `
            <div class="addtask-leftcontainer-assignedfield" id="addtaskMenuAssigned" onclick="expandAssigned('menu')">Select contacts to assign
            </div>
        `;
    }


    getAssignedPerson(contactId, contactName, contactColor) {
        return [contactId, `<div class="addtask-leftcontainer-assigned-circle" style="background:${contactColor}">${returnInitials(contactName)}</div>`];
    }


    getSubtask(subtask, location) {
        if (subtask.status == 0) {
            return `
                <div class="addtask-rightcontainer-subtask-wrap">
                    <input class="addtask-rightcontainer-subtask-checkbox" id="${subtask.id}" type="checkbox" onclick="setSubStatus('${subtask.id}')">
                    <span class="addtask-rightcontainer-subtask-checkboxtext">${subtask.name}</span>
                    <div class="delete" onclick="deleteSubtask('${subtask.id}', '${location}')">X</div>
                </div>
            `;
        }
        if (subtask.status == 1) {
            return `
            <div class="addtask-rightcontainer-subtask-wrap">
                <input class="addtask-rightcontainer-subtask-checkbox" id="${subtask.id}" type="checkbox" onclick="setSubStatus('${subtask.id}')" checked>
                <span class="addtask-rightcontainer-subtask-checkboxtext">${subtask.name}</span>
                <div class="delete" onclick="deleteSubtask('${subtask.id}', '${location}')">X</div>
            </div>
        `;
        }
    }


    resetOverlayPrio() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('overlay', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('overlay', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('overlay', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    resetMenuPrio() {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('menu', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('menu', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('menu', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    getAssignedPersonEdit(person) {
        return `
            <div class="addtask-leftcontainer-assigned-circle" style="background:
            ${contacts.filter(contact => contact.id == person)[0].color}">
            ${returnInitials(contacts.filter(contact => contact.id == person)[0].name)}
            </div>
        `
    }
}