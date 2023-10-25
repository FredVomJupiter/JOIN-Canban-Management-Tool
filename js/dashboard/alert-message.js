// Global trigger variable for alert messages.
let alertTriggered = false;

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