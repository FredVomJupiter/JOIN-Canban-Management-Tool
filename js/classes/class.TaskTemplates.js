class TaskTemplate {

    constructor() {

    }

    // Miniature tasks on the kanban board.

    /**
     * Returns html template for miniature tasks on the kanban board.
     * @param {*} task as object.
     * @returns html template.
     */
    getBoardTask(task) {
        let category = categories.find(cat => cat.id == task.category);
        return `
            <div class="board-task padding-20 gap-25 flex-column flex-start" id="${task.id}" draggable="true" onclick="showTaskDetails('${task.id}')" ondragstart="dragstart(event, '${task.id}')" ondrop="dragend(event, '${task.status}')" ondragover="dragover(event)">
                <div class="padding-816 text-normal text-white border-radius-8" style="background:${category.color}">${category.name}</div>
                <div>
                    <div class="flex-column gap-10">
                        <span class="text-bold">${task.title}</span>
                        <span class="text-grey overflow-anywhere max-height-375 overflow-y-hidden">${task.description}</span>
                    </div>
                </div>
                ${this.getProgressbar(task)}
                <div class="flex-row flex-space-between width-100">
                    <div class="flex-row flex-center">
                        ${this.getAssignments(task)}
                    </div>
                    <div class="flex-row">
                        ${this.getPriority(task)}
                    </div>
                </div>
                <div class="text-small">created by: ${returnOwner(task.user)} </div>
            </div>
        `
    }


    getProgressbar(task) {
        if (task.subtasks.length > 0) {
            return `
                <div class="board-progressbar-wrap">
                    <div class="board-progressbar-outer">
                        <div class="board-progressbar-inner" style="width: calc(138px * ${this.calculateProgressFactor(task)})"></div>
                    </div>
                    <span class="text-small">${this.countFinishedSubtasks(task)}/${task.subtasks.length} Done</span>
                </div>
            `
        } else {
            return "";
        }
    }


    calculateProgressFactor(task) {
        return this.countFinishedSubtasks(task) / task.subtasks.length;
    }


    /**
     * Counts the number of completed subtasks of a given task.
     * @param {object} task as object.
     * @returns total number of completed subtasks.
     */
    countFinishedSubtasks(task) {
        let completedSubtasks = 0;
        task.subtasks.forEach(sub => {
            if (subtasks.find(subtask => subtask.id == sub).completed == true) {
                completedSubtasks++;
            }
        });
        return completedSubtasks;
    }


    /**
     * Returns html template of circles with initials from Name & Surname of assigned persons.
     * @param {object} task as object.
     * @returns html template.
     */
    getAssignments(task) {

        if (task.assigned_to.length == 1) {
            return this.getOneCircle(task);
        }
        else if (task.assigned_to.length == 2) {
            return this.getTwoCircles(task);
        }
        else if (task.assigned_to.length == 3) {
            return this.getThreeCircles(task);
        }
        else if (task.assigned_to.length > 3) {
            return this.getMoreCircles(task);
        }
        else {
            return "";
        }
    }


    getOneCircle(task) {
        return `
                <div class="board-circle" style="background:${contacts.find(contact => contact.id == task.assigned_to[0]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[0]).name)}</span>
                </div>
            `
    }


    getTwoCircles(task) {
        return `
                <div class="board-circle" style="background:${contacts.find(contact => contact.id == task.assigned_to[0]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[0]).name)}</span>
                </div>
                <div class="board-circle board-circlemiddle" style="background:${contacts.find(contact => contact.id == task.assigned_to[1]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[1]).name)}</span>
                </div>
            `
    }


    getThreeCircles(task) {
        return `
                <div class="board-circle" style="background:${contacts.find(contact => contact.id == task.assigned_to[0]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[0]).name)}</span>
                </div>
                <div class="board-circle board-circlemiddle" style="background:${contacts.find(contact => contact.id == task.assigned_to[1]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[1]).name)}</span>
                </div>
                <div class="board-circle" style="background:${contacts.find(contact => contact.id == task.assigned_to[2]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[2]).name)}</span>
                </div>
            `
    }


    getMoreCircles(task) {
        return `
                <div class="board-circle" style="background:${contacts.find(contact => contact.id == task.assigned_to[0]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[0]).name)}</span>
                </div>
                <div class="board-circle board-circlemiddle" style="background:${contacts.find(contact => contact.id == task.assigned_to[1]).color}">
                    <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == task.assigned_to[1]).name)}</span>
                </div>
                <div class="board-circle">
                    <span class="text-small text-white">+${task.assigned_to.length - 2}</span>
                </div>
            `
    }


    getPriority(task) {
        if (task.priority == "High") {
            return `
                <img class="icon-small" src="./assets/img/priohigh.svg">
            `
        }
        else if (task.priority == "Medium") {
            return `
                <img class="icon-small" src="./assets/img/priomedium.svg">
            `
        } else {
            return `
                <img class="icon-small" src="./assets/img/priolow.svg">
            `
        }
    }


    getDropzone(location) {
        if (location === "todo") {
            return `<div class="dropzone" id="dropZoneTodo" ondrop="dragend(event, '${'Todo'}')" ondragover="dragover(event)" ondragenter="dragenter(event, 'dropZoneTodo')" ondragleave="dragleave(event, 'dropZoneTodo')"></div>`;
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

    /**
     * Returns html template showing details of task, if user clicks on a task-task on the board.
     * @param {*} taskId as string.
     * @returns html template.
     */
    getOverlayTask(taskId) {
        let task = tasks.find(task => task.id == taskId);
        let category = categories.find(cat => cat.id == task.category);
        if (task.user == loggedUser.id) {
            return `
            <div class="board-taskoverlay-close-btn" onclick="hideTaskDetails()"></div>
            <div class="board-taskoverlay-category" style="background:${category.color}">${category.name}</div>
            <span class="title-medium color-primary">${task.title}</span>
            <span class="color-primary overflow-anywhere">${task.description}</span>
            <div class="flex-center gap-25"><span class="title-tiny color-primary">Due date:</span><span class="board-taskoverlay-value">${returnFormatedDate(new Date(task.due_date))}</span></div>
            <div class="flex-center gap-25"><span class="title-tiny color-primary">Priority:</span>${task.priority} ${this.getPriority(task)}</div>
            <div class="flex-center"><span class="title-tiny color-primary">Assigned to:</span></div>
            ${this.getOverlayAssigned(task.assigned_to)}
            <div class="flex-center"><span class="title-tiny color-primary">Subtasks:</span></div>
            ${this.getOverlaySubtasksPercentage(task)}
            ${this.getOverlaySubtasks(task)}
            <div class="board-taskoverlay-btnwrap">
                <div class="board-taskoverlay-btn delete-icon" onclick="showDeleteAlert('task', '${taskId}')"></div>
                <div class="board-taskoverlay-btn move-icon" onclick="showMoveList()"></div>
                <div class="board-taskoverlay-btn edit-icon" onclick="prepareEditTask('${taskId}')"></div>
                <div class="board-taskoverlay-moveMenu flex-column cursor-pointer align-left border-box d-none" id="moveList">
                    <span class="moveItem moveItem-top" onclick="moveTask('${taskId}', 'Todo')">Todo</span>
                    <span class="moveItem moveItem-mid" onclick="moveTask('${taskId}', 'In Progress')">In Progres</span>
                    <span class="moveItem moveItem-mid" onclick="moveTask('${taskId}', 'Awaiting Feedback')">Awaiting Feedback</span>
                    <span class="moveItem moveItem-bot" onclick="moveTask('${taskId}', 'Done')">Done</span>
                </div>
            </div>
            `
        } else {
            return `
            <div class="board-taskoverlay-close-btn" onclick="hideTaskDetails()"></div>
            <div class="board-taskoverlay-category" style="background:${category.color}">${category.name}</div>
            <span class="title-medium color-primary">${task.title}</span>
            <span class="color-primary">${task.description}</span>
            <div class="flex-center gap-25"><span class="title-tiny color-primary">Due date:</span><span class="board-taskoverlay-value">${returnFormatedDate(new Date(task.due_date))}</span></div>
            <div class="flex-center gap-25"><span class="title-tiny color-primary">Priority:</span>${task.priority} ${this.getPriority(task)}</div>
            <div class="flex-center"><span class="title-tiny color-primary">Assigned to:</span></div>
            ${this.getOverlayAssigned(task.assigned_to)}
            <div class="flex-center"><span class="title-tiny color-primary">Subtasks:</span></div>
            ${this.getOverlaySubtasksPercentage(task)}
            ${this.getOverlaySubtasks(task)}
            `
        }
    }


    getOverlaySubtasksPercentage(task) {
        if (task.subtasks.length > 0) {
            return `
                <div class="flex-center gap-25">
                    <div class="board-taskoverlay-percentage-inner-gray">
                        <div class="board-taskoverlay-percentage-inner-blue" style="width: calc(200px * ${this.calculateProgressFactor(task)})"></div>
                    </div>
                    <span class="text-small">${this.countFinishedSubtasks(task)}/${task.subtasks.length} Done</span>
                </div>
            `;
        } else {
            return ""
        }
    }


    getOverlaySubtasks(task) {
        if (task.subtasks.length > 0) {
            let lines = "";
            task.subtasks.forEach(subtask => {
                let sub = subtasks.find(sub => sub.id == subtask);
                lines += `<span>
                        ${sub.completed == true ? this.placeOverlayCheckbox(true, sub) : this.placeOverlayCheckbox(false, sub)} ${sub.title}
                        </span>
                    `;
            });
            return lines;
        } else {
            return `<span>none</span>`;
        }
    }


    placeOverlayCheckbox(completed, subtask) {
        if (completed == true) {
            return `<input type="checkbox" id="sub${subtask.id}" disabled="disabled" checked>`;
        } else {
            return `<input type="checkbox" id="sub${subtask.id}" disabled="disabled">`;
        }
    }


    getOverlayAssigned(assigned) {
        let lines = `<div class="flex-column align-left gap-10">`;
        assigned.forEach(person => {
            lines += `
                <div class="flex-center gap-25">
                    <div class="board-circle" style="background:${contacts.find(contact => contact.id == person).color}">
                        <span class="text-small text-white">${returnInitials(contacts.find(contact => contact.id == person).name)}</span>
                    </div>
                    <span>${contacts.find(contact => contact.id == person).name}</span>
                </div>
            `;
        });
        lines += `</div>`;
        return lines;
    }
}