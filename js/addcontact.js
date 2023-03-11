const addForm = document.getElementById('formAddcontact');
const addContactname = document.getElementById('addcontactInputName');
const addEmail = document.getElementById('addcontactInputEmail');
const addPhone = document.getElementById('addcontactInputPhone');


addForm.addEventListener('submit', e => {
    e.preventDefault();
    validateAddInputs();
});


const setAddError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setAddSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidNewEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidNewPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}

const validateAddInputs = () => {
    const nameValue = addContactname.value.trim();
    const emailValue = addEmail.value.trim();
    const phoneValue = addPhone.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPhone = false;

    if (nameValue === '') {
        setAddError(addContactname, 'Name is required');
        correctName = false;
    } else {
        setAddSuccess(addContactname);
        correctName = true;
    }

    if (emailValue === '') {
        setAddError(addEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidNewEmail(emailValue)) {
        setAddError(addEmail, 'Only valid email formats allowed with @ and ending ".xy(z)"');
        correctMail = false;
    } else {
        setAddSuccess(addEmail);
        correctMail = true;
    }

    if (phoneValue === '') {
        setAddError(addPhone, 'Phone number is required');
        correctPhone = false;
    } else if (!isValidNewPhone(phoneValue)) {
        setAddError(addPhone, 'Only numbers allowed with min 8 and max 10 digits');
        correctPhone = false;
    } else {
        setAddSuccess(addPhone);
        correctPhone = true;
    }

    if (correctName & correctMail & correctPhone) {
        saveNewContact();
    }
};


function saveNewContact() {
    let contact = {
        id: "contact"+contacts.length,
        color: colors[contacts.length],
        name: document.getElementById('addcontactInputName').value,
        email: document.getElementById('addcontactInputEmail').value,
        phone: document.getElementById('addcontactInputPhone').value
    };
    contacts.push(contact);
    saveLocalStorage('contacts');
    closeOverlay();
    init();
    showContact(contact.id);
    clearNewcontactInputfields();
}


function clearNewcontactInputfields() {
    document.getElementById('addcontactInputName').value = "";
    document.getElementById('addcontactInputEmail').value = "";
    document.getElementById('addcontactInputPhone').value = "";
}