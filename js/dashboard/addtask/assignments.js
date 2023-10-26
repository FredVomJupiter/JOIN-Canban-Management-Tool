let step = 0;

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
        option.setAttribute('onclick', 'showSelectedContacts()');
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
        <option value="" class="text-small" onclick="showSelectedContacts()">Select (command or alt + left mouse click)</option>
        <option value="" onclick="showCreateContact()">Create new contact</option>
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

/**
 * Toggles the display of the create contact form.
 */
function showCreateContact() {
    document.getElementById('addtaskMenuAssigned').classList.add('d-none');
    document.getElementById('addtaskCreateContact').classList.remove('d-none');
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
    if (hasNoInputValue()) {
        showAlert("Please enter a name.");
        step--;
        return;
    }
    let name = document.getElementById('addtaskCreateContactInput').value;
    newContact.name = name.trim();
    newContact.user = loggedUser;
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Enter contact email');
    document.getElementById('addtaskCreateContactInput').value = "";
}


function collectEmail() {
    if (hasNoInputValue()) {
        showAlert("Please enter an email.");
        step--;
        return;
    }
    let email = document.getElementById('addtaskCreateContactInput').value;
    newContact.email = email.trim();
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Enter contact phone');
    document.getElementById('addtaskCreateContactInput').value = "";
}


function collectPhone() {
    if (hasNoInputValue()) {
        showAlert("Please enter a phone number.");
        step--;
        return;
    }
    let phone = document.getElementById('addtaskCreateContactInput').value;
    newContact.phone = phone.trim();
    document.getElementById('addtaskCreateContactInput').setAttribute('placeholder', 'Enter contact color (e.g. red)');
    document.getElementById('addtaskCreateContactInput').value = "";
}


function collectColor() {
    if (hasNoInputValue()) {
        showAlert("Please enter a color.");
        step--;
        return;
    }
    let color = document.getElementById('addtaskCreateContactInput').value;
    newContact.color = color.trim();
    createContactInAddtask();
}

/**
 * Checks wether the input value is empty or not.
 * @returns true if input value is empty
 */
function hasNoInputValue() {
    return document.getElementById('addtaskCreateContactInput').value.trim() == "" ? true : false;
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