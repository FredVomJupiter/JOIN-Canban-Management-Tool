class TaskDetailTemplates {

    constructor() {

    }

    // Detailed Task View on Board.

    /**
     * Returns a html template of the prio buttons for the overlay or the menu.
     * Whereas the user-selected button will be highlighted.
     * @param {*} location as string
     * @returns html template.
     */
    setPrioUrgent(location) {
        return `
            <div class="addtask-rightcontainer-priobtns-outline redbackground" style="width: 141px;" onclick="setPriority('${location}', 'High')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh_white.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('${location}', 'Medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('${location}', 'Low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }

    /**
     * Returns a html template of the prio buttons for the overlay or the menu.
     * Whereas the user-selected button will be highlighted.
     * @param {*} location as string
     * @returns html template.
     */
    setPrioMedium(location) {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('${location}', 'High')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline orangebackground" style="width: 130px;" onclick="setPriority('${location}', 'Medium')">
                <span class="addtask-rightcontainer-priobtns-text whitetext">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium_white.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('${location}', 'Low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }

    /**
     * Returns a html template of the prio buttons for the overlay or the menu.
     * Whereas the user-selected button will be highlighted.
     * @param {*} location as string
     * @returns html template.
     */
    setPrioLow(location) {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('${location}', 'High')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('${location}', 'Medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline greenbackground" style="width: 136px;" onclick="setPriority('${location}', 'Low')">
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


    resetPrio(location) {
        return `
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 141px;" onclick="setPriority('${location}', 'urgent')">
                <span class="addtask-rightcontainer-priobtns-text">Urgent</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priohigh.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 130px;" onclick="setPriority('${location}', 'medium')">
                <span class="addtask-rightcontainer-priobtns-text">Medium</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priomedium.svg">
            </div>
            <div class="addtask-rightcontainer-priobtns-outline" style="width: 136px;" onclick="setPriority('${location}', 'low')">
                <span class="addtask-rightcontainer-priobtns-text">Low</span>
                <img class="addtast-rightcontainer-priobtns-icon" src="./assets/img/priolow.svg">
            </div>
        `;
    }


    getAssignedPersonEdit(person) {
        return `
            <div class="addtask-leftcontainer-assigned-circle" style="background:
            ${contacts.find(contact => contact.id == person).color}">
            ${returnInitials(contacts.find(contact => contact.id == person).name)}
            </div>
        `
    }
}