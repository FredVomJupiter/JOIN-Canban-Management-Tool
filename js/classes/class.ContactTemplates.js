class ContactTemplate {


    constructor() {

    }


    getEditcontactOverlay(name, email, phone) {
        return `
            <img class="addcontact-task-close" src="./assets/img/clear.svg" onclick="null">
            <div class="addcontact-title-container">
                <img class="addcontact-logo" src="./assets/img/logo_white.svg" alt="logo">
                <div class="addcontact-title">Edit contact</div>
                <div class="addcontact-subtitle">Tasks are better with a team</div>
                <img src="./assets/img/horizontal_blue_line.svg">
            </div>
            <div class="addcontact-form">
                <div class="addcontact-user-badge">
                    <img src="./assets/img/user_guest.svg">
                </div>
                <form class="addcontact-form-right" id="formEditcontact">
                    <div class="addcontact-form-container">
                        <input class="addcontact-input-profile" type="text" placeholder="Name" id="editcontactInputName" value="${name}">
                        <div class="error"></div>
                    </div>
                    <div class="addcontact-form-container">
                        <input class="addcontact-input-email" type="text" placeholder="Email" id="editcontactInputEmail" value="${email}">
                        <div class="error"></div>
                    </div>
                    <div class="addcontact-form-container">
                        <input class="addcontact-input-phone" type="text" placeholder="Phone" id="editcontactInputPhone" value="${phone}">
                        <div class="error"></div>
                    </div>
                    <div class="addcontact-submit-btns">
                        <input class="addcontact-create-btn" type="submit" value="Save">
                    </div>
                </form>
            </div>
        `;
    }


    getContactList(contact) {
        return `
            <div class="flex-row padding-20 cursor-pointer gap-25 contact width-100 border-box align-left" id="${contact.id}wrap" onclick="showContact('${contact.id}')">
                <div class="flex-row flex-center contact-circle icon-medium" style="background:${contact.color}">
                    ${returnInitials(contact.name)}
                </div>
                <div class="flex-column align-left">
                    <span class="title-tiny color-primary" id="${contact.id}name">${contact.name}</span>
                    <span class="text-blue">${contact.email}</span>
                </div>
            </div>
        `;
    }


    getContactLetter(letter) {
        return `
            <div class="flex-column flex-center">
                <span class="title-tiny">${letter}</span>
            </div>
            <div class="width-100 flex-column align-left margin-bottom-20">
                <div class="contact-line"></div>
            </div>
        `;
    }


    getContactDetails(name, email, phone, color) {
        return `
            <div class="cursor-pointer flex-row self-start margin-bottom-20 contact-back" onclick="hideContact()"><- back</div>
            <div class="flex-row gap-25 margin-bottom-20">
                <div class="flex-row flex-center contact-circle icon-large" style="background:${color}">
                    <span class="title-tiny text-white">${returnInitials(name)}</span>
                </div>
                <div class="flex-column gap-10">
                    <span class="title-tiny">${name}</span>
                    <div class="flex-row gap-10 cursor-pointer" onclick="openAddtaskOverlay('To do')">
                        <img class="icon-very-small" src="./assets/img/addtask_blue.svg">
                        <span class="text-normal text-blue">Add task</span>
                    </div>
                </div>
            </div>
    
            <div class="flex-column flex-start gap-25 margin-bottom-20">
                <span class="text-larger">Contact Information</span>
                <div class="flex-row cursor-pointer gap-10" onclick="openEditcontactOverlay('${name}')">
                    <img class="icon-very-small" src="./assets/img/black_pencil.svg">
                    <span class="text-normal">Edit Contact</span>
                </div>

                <span class="text-normal text-bold">Email</span>
                <span class="text-normal text-blue">${email}</span>
                <span class="text-normal text-bold">Phone</span>
                <span class="text-normal">${phone}</span>
            </div>
        `;
    }
}