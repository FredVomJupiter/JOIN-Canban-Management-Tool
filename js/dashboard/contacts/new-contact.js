function openContactForm() {
    let contactCanvas = document.getElementById('contactCanvas');
    contactCanvas.classList.add('d-none');
    let contactList = document.getElementById('contactsInner');
    contactList.classList.add('d-none');
    let contactForm = document.getElementById('contactForm');
    contactForm.classList.remove('d-none');
    clearContactFormInput();
    newContact = new Contact(null, null, null, null);
}


function closeContactForm() {
    let contactList = document.getElementById('contactsInner');
    contactList.classList.remove('d-none');
    let contactForm = document.getElementById('contactForm');
    contactForm.classList.add('d-none');
}


function clearContactFormInput() {
    document.getElementById('contactFormName').value = "";
    document.getElementById('contactFormEmail').value = "";
    document.getElementById('contactFormPhone').value = "";
    document.getElementById('contactFormColor').value = "";
}


async function collectAndSendContact(type) {
    let contactName = document.getElementById('contactFormName').value.trim();
    let contactEmail = document.getElementById('contactFormEmail').value.trim();
    let contactPhone = document.getElementById('contactFormPhone').value.trim();
    let contactColor = document.getElementById('contactFormColor').value.trim();

    if (contactName === "" || contactEmail === "" || contactPhone === "" || contactColor === "") {
        showAlert("Please fill in all fields!");
        return;
    }

    if (!isValidEmail(contactEmail)) {
        showAlert("Email not valid! example@here.com");
        return;
    }

    if (!isValidPhone(contactPhone)) {
        showAlert("Phone number not valid: 8-10 digits.");
        return;
    }

    newContact = new Contact(contactName, contactEmail, contactPhone, contactColor);

    closeContactForm();

    if (type === 'create') {
        await createContact(newContact);
        showAlert("Contact created successfully.");
    } else {
        await setContact(newContact);
        showAlert("Contact updated successfully.");
    }
}

/**
 * Email must contain a prefix, @ and a domain.
 * @param {*} email as string.
 * @returns true if email is valid.
 */
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Phone must contain 8-10 digits.
 * @param {*} phone as string.
 * @returns true if phone is valid.
 */
const isValidPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}