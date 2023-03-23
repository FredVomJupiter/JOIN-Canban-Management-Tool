class ContactTemplate {


    constructor() {

    }


    getEditcontactOverlay(name, email, phone) {
        return `
            <img class="addcontact-task-close" src="./assets/img/clear.svg" onclick="closeOverlay()">
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
            <div class="contact-template-wrap" id="${contact.id}wrap" onclick="showContact('${contact.id}')">
                <div class="contact-template-circle" style="background:${contact.color}">
                    ${returnInitials(contact.name)}
                </div>
                <div class="contact-template-textwrap">
                    <span class="contact-template-name" id="${contact.id}name">${contact.name}</span>
                    <span class="contact-template-email">${contact.email}</span>
                </div>
            </div>
        `;
    }


    getContactLetter(letter) {
        return `
            <div class="contact-alphabet-wrap">
                <span class="contact-alphabet-text">${letter}</span>
            </div>
            <div class="contact-line-container">
                <div class="contact-line"></div>
            </div>
        `;
    }


    getContactDetails(name, email, phone, color) {
        return `
            <div class="contact-canvas-titlewrap">
                <div class="contact-canvas-circlewrap">
                    <div class="contact-canvas-circleorange" style="background:${color}">
                        <span class="contact-canvas-circletext">${returnInitials(name)}</span>
                    </div>
                </div>
                <div class="contact-canvas-namewrap">
                    <span class="contact-canvas-name">${name}</span>
                    <div class="contact-canvas-addtaskwrap" onclick="openAddtaskOverlay('To do')">
                        <img class="contact-canvas-addtask-icon" src="./assets/img/addtask_blue.svg">
                        <span class="contact-canvas-addtast-text">Add task</span>
                    </div>
                </div>
            </div>
    
            <div class="contact-canvas-infowrap">
                <span class="contact-canvas-info-text">Contact Information</span>
                <div class="contact-canvas-info-editwrap" onclick="openEditcontactOverlay('${name}')">
                    <img class="contact-canvas-edit-icon" src="./assets/img/black_pencil.svg">
                    <span class="contact-canvas-info-edittext">Edit Contact</span>
                </div>
            </div>
    
            <div class="contact-canvas-detailswrap">
                <div class="contact-canvas-innerwrap">
                    <span class="contact-canvas-innertitle">Email</span>
                    <span class="contact-canvas-email">${email}</span>
                </div>
                <div class="contact-canvas-innerwrap">
                    <span class="contact-canvas-innertitle">Phone</span>
                    <span class="contact-canvas-phone">${phone}</span>
                </div>
            </div>
        `;
    }
}