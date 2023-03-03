let editContactname;
let editEmail;
let editPhone;

let contactId = "";

function initEditDOM() {
    const editForm = document.getElementById('formEditcontact');
    editContactname = document.getElementById('editcontactInputName');
    editEmail = document.getElementById('editcontactInputEmail');
    editPhone = document.getElementById('editcontactInputPhone');

    editForm.addEventListener('submit', e => {
        e.preventDefault();
        validateEditcontactInputs();
    });
}


const setEditError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setEditSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEditEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidEditPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}

const validateEditcontactInputs = () => {
    const nameValue = editContactname.value.trim();
    const emailValue = editEmail.value.trim();
    const phoneValue = editPhone.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPhone = false;

    if (nameValue === '') {
        setEditError(editContactname, 'Name is required');
        correctName = false;
    } else {
        setEditSuccess(editContactname);
        correctName = true;
    }

    if (emailValue === '') {
        setEditError(editEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidEditEmail(emailValue)) {
        setEditError(editEmail, 'Only valid email formats allowed with @ and ending ".xy(z)"');
        correctMail = false;
    } else {
        setEditSuccess(editEmail);
        correctMail = true;
    }

    if (phoneValue === '') {
        setEditError(editPhone, 'Phone number is required');
        correctPhone = false;
    } else if (!isValidEditPhone(phoneValue)) {
        setEditError(editPhone, 'Only numbers allowed with min 8 and max 10 digits');
        correctPhone = false;
    } else {
        setEditSuccess(editPhone);
        correctPhone = true;
    }

    if (correctName & correctMail & correctPhone) {
        saveEditedContact();
    }
};


function saveEditedContact() {
    contacts.forEach(contact => {
        if (contact.id == contactId) {
            contact.name = document.getElementById('editcontactInputName').value;
            contact.email = document.getElementById('editcontactInputEmail').value;
            contact.phone = document.getElementById('editcontactInputPhone').value;
        }
    });
    closeOverlay();
    renderContactList();
    showContact(contactId);
    renderCards();
}