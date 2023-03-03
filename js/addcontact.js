const form = document.getElementById('formAddcontact');
const contactname = document.getElementById('addcontactInputName');
const email = document.getElementById('addcontactInputEmail');
const phone = document.getElementById('addcontactInputPhone');


form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}

const validateInputs = () => {
    const nameValue = contactname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPhone = false;

    if (nameValue === '') {
        setError(contactname, 'Name is required');
        correctName = false;
    } else {
        setSuccess(contactname);
        correctName = true;
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        correctMail = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Only valid email formats allowed with @ and ending ".xy(z)"');
        correctMail = false;
    } else {
        setSuccess(email);
        correctMail = true;
    }

    if (phoneValue === '') {
        setError(phone, 'Phone number is required');
        correctPhone = false;
    } else if (!isValidPhone(phoneValue)) {
        setError(phone, 'Only numbers allowed with min 8 and max 10 digits');
        correctPhone = false;
    } else {
        setSuccess(phone);
        correctPhone = true;
    }

    if (correctName & correctMail & correctPhone) {
        saveNewContact();
    }
};


function saveNewContact() {
    let contact = {
        id: "contact"+contacts.length,
        name: document.getElementById('addcontactInputName').value,
        email: document.getElementById('addcontactInputEmail').value,
        phone: document.getElementById('addcontactInputPhone').value
    };
    contacts.push(contact);
    closeOverlay();
    renderContactList();
}


function clearNewContact() {
    document.getElementById('addcontactInputName').value = "";
    document.getElementById('addcontactInputEmail').value = "";
    document.getElementById('addcontactInputPhone').value = "";
}