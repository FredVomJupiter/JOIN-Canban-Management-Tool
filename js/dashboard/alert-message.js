// Global trigger variable for alert messages.
let alertTriggered = false;
let timeout;

/**
 * Packs a custom message into a div container, attaches it to the
 * document body, plays an animation and displays it for 3 seconds.
 * 
 * After 3 seconds the alert message is removed from the document body.
 * @param {*} message as string.
 * @returns alert message in div container.
 */
function showAlert(message) {
    if (alertTriggered) return;
    let alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = message;
    document.body.appendChild(alert);
    setTimeout(() => {
        document.querySelector(".alert").remove();
        alertTriggered = false;
    }, 3000);
}

/**
 * Promts the user to confirm account deletion that lasts for 20 seconds.
 * @returns alert message in div container.
 */
function showDeleteAlert(type, id) {
    if (alertTriggered) return;
    let alert = document.createElement("div");
    alert.classList.add("alert-delete");
    type == "task" ? alert.innerHTML = htmlTemplateDeleteTask(id) : alert.innerHTML = htmlTemplateDeleteAccount();
    document.body.appendChild(alert);
    timeout = setTimeout(() => {
        document.querySelector(".alert-delete").remove();
        alertTriggered = false;
    }, 20000);
}


function htmlTemplateDeleteAccount() {
    return `
        <div class="flex-column flex-center gap-10">
            <span class="text-normal">Are you sure you want to delete your account?</span>
            <div class="flex-row flex-center gap-25">
                <div class="btn-primary cursor-pointer" onclick="deleteUser();document.querySelector('.alert-delete').remove();clearTimeout(timeout);">Yes</div>
                <div class="btn-secondary cursor-pointer" onclick="document.querySelector('.alert-delete').remove(); clearTimeout(timeout);">No</div>
            </div>
        </div>
        `
}


function htmlTemplateDeleteTask(id) {
    console.log(id);
    return `
        <div class="flex-column flex-center gap-10">
            <span class="text-normal">Are you sure you want to delete this task?</span>
            <div class="flex-row flex-center gap-25">
                <div class="btn-primary cursor-pointer" onclick="deleteTask('${id}');document.querySelector('.alert-delete').remove();clearTimeout(timeout);">Yes</div>
                <div class="btn-secondary cursor-pointer" onclick="document.querySelector('.alert-delete').remove(); clearTimeout(timeout);">No</div>
            </div>
        </div>
        `
}