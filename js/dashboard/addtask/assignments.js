let step = 0;


function getInputValueAssign() {
    return document.getElementById('addtaskCreateContactInput').value.trim();
}

/**
 * Renders the assignments as options in the add task section.
 */
function renderAssignments() {
    let assignmentList = document.getElementById('addtaskMenuAssigned');
    resetAssignmentsList(assignmentList);
    contacts.forEach(contact => {
        if (loggedUser.id != contact.user.id) {
            return;
        }
        let option = document.createElement('option');
        option.value = contact.id;
        option.text = contact.name + " (" + contact.color + ")";
        assignmentList.appendChild(option);
    });
}

/**
 * Sets the select options of the select field to default.
 * @param {*} assignmentList as HTML element.
 */
function resetAssignmentsList(assignmentList) {
    assignmentList.innerHTML = "";
    assignmentList.innerHTML = `
        <option value="" class="text-small">Select (command or alt + left mouse click)</option>
        <option value="">Create new contact</option>
        `;
}

/**
 * Highlichts selected contacts in the input field and displays the user badges (circles) below.
 */
function showSelectedContacts() {
    let selected = document.getElementById('addtaskMenuAssigned');
    const selectedOptions = [];

    for (const option of selected.options) {
        if (option.selected) {
            selectedOptions.push(option.value)
        }
    }
    let displayMenuAssigned = document.getElementById('displayMenuAssigned');
    displayMenuAssigned.innerHTML = "";
    if (selectedOptions.length == 0 || selectedOptions == "") {
        displayMenuAssigned.innerHTML = "No one assigned yet";
    } else {
        selectedOptions.forEach(contact => {
            let contactName = contacts.find(c => c.id == contact).name;
            let contactColor = contacts.find(c => c.id == contact).color;
            displayMenuAssigned.innerHTML += `<span class="board-circle text-white" style='background:${contactColor}'>${returnInitials(contactName)}</span>`;
        });
    }
}


function checkAssignedSelection() {
    let selected = document.getElementById('addtaskMenuAssigned');
    if (selected.options.selectedIndex == 1) {
        showCreateContact();
    } else if (selected.options.selectedIndex == 0) {
        showSelectedContacts();
    } else {
        showSelectedContacts();
    }
}

/**
 * Toggles the display of the create contact form.
 */
function showCreateContact() {
    document.getElementById('addtaskMenuAssigned').classList.add('d-none');
    document.getElementById('addtaskCreateContact').classList.remove('d-none');
    let progress = document.getElementById('assignedStatus');
    progress.innerHTML = "";
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("last");
}

/**
 * Cancels the creation of a new contact. Resets the form and hides the form.
 */
function cancelCreateContact() {
    step = 0;
    document.getElementById('addtaskCreateContactInput').value = "";
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Name');
    document.getElementById('addtaskMenuAssigned').classList.remove('d-none');
    document.getElementById('addtaskCreateContact').classList.add('d-none');
}

/**
 * Procedure for creating a new contact.
 */
function nextStepContact() {
    step++;
    step === 1 ? collectName() : null;
    step === 2 ? collectEmail() : null;
    step === 3 ? collectPhone() : null;
    step === 4 ? collectColor() : null;
    step === 5 ? createContactInAddtask() : null;
}


function collectName() {
    if (hasNoInputValue() || getInputValueAssign() < 3) {
        showAlert("Please enter min 3 characters.");
        step--;
        return;
    }
    newContact.name = getInputValueAssign();
    newContact.user = loggedUser;
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Enter contact email');
    document.getElementById('addtaskCreateContactInput').value = "";
    let progress = document.getElementById('assignedStatus');
    progress.innerHTML = "";
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("last");
}


function collectEmail() {
    if (hasNoInputValue() || !isValidEmail(getInputValueAssign())) {
        showAlert("Please enter a valid email example@this.com");
        step--;
        return;
    }
    newContact.email = getInputValueAssign();
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Enter contact phone');
    document.getElementById('addtaskCreateContactInput').value = "";
    let progress = document.getElementById('assignedStatus');
    progress.innerHTML = "";
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawTodo("middle");
    progress.innerHTML += drawTodo("last");
}


function collectPhone() {
    if (hasNoInputValue() || !isValidPhone(getInputValueAssign())) {
        showAlert("Please enter a 8-10 digit phone number.");
        step--;
        return;
    }
    newContact.phone = getInputValueAssign();
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Enter contact color');
    document.getElementById('addtaskCreateContactInput').value = "";
    let progress = document.getElementById('assignedStatus');
    progress.innerHTML = "";
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawProgress();
    progress.innerHTML += drawTodo("last");
}


function collectColor() {
    if (hasNoInputValue() || invalidColor(getInputValueAssign())) {
        showAlert("Please enter a valid color (e.g. red).");
        step--;
        return;
    }
    newContact.color = getInputValueAssign();
    createContactInAddtask();
}

/**
 * Checks wether the input value is empty or not.
 * @returns true if input value is empty
 */
function hasNoInputValue() {
    return getInputValueAssign() == "" ? true : false;
}

/**
 * Checks user input for a valid color with a dummy div element.
 * If the color is invalid, the div element will have the color white.
 * @returns true if the color is invalid
 */
function invalidColor(color) {
    let test = document.createElement('div');
    test.style.color = "white";
    test.style.color = color;
    return test.style.color == "white" ? true : false;
}

/**
 * Calls the api to create a new contact and then calls the api to get all contacts.
 * Thereafter, the assignments are rendered and the create contact form is hidden.
 */
async function createContactInAddtask() {
    await createContact(newContact);
    await getContacts();
    showAlert("Contact created successfully.");
    renderAssignments();
    cancelCreateContact();
}