class ContactTemplate {


    constructor() {

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
            <div class="cursor-pointer flex-row self-start margin-bottom-20 contact-btn" onclick="showContactList()"><- back</div>
            <div class="flex-row gap-25 margin-bottom-20">
                <div class="flex-row flex-center contact-circle icon-large" style="background:${color}">
                    <span class="title-tiny text-white">${returnInitials(name)}</span>
                </div>
                <div class="flex-column gap-10">
                    <span class="title-tiny">${name}</span>
                    <div class="flex-row gap-10 cursor-pointer contact-btn" onclick="addtaskWithContact('${contacts.find(c => c.email == email).id}')">
                        <img class="icon-very-small" src="./assets/img/addtask_blue.svg">
                        <span class="text-normal text-blue">Add task</span>
                    </div>
                </div>
            </div>
    
            <div class="flex-column flex-start gap-25 margin-bottom-20">
                <span class="text-larger">Contact Information</span>

                <span class="text-normal text-bold">Email</span>
                <span class="text-normal text-blue">${email}</span>
                <span class="text-normal text-bold">Phone</span>
                <span class="text-normal">${phone}</span>

                <div class="flex-row cursor-pointer gap-10 contact-btn" onclick="showEditContact('${contacts.find(c => c.email == email).id}')">
                    <img class="icon-very-small" src="./assets/img/black_pencil.svg">
                    <span class="text-normal">Edit Contact</span>
                </div>
            </div>
        `;
    }
}