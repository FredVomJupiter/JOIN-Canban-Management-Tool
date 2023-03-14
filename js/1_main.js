let taskTemplate = new TaskTemplate();
let contactTemplate = new ContactTemplate();


async function init() {
    // Loading from backend
    setURL('https://www.frederic-rieg.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadLocalStorage('cards');
    await loadLocalStorage('contacts')
    await loadLocalStorage('categories');
    // Updating Board, Summary and Contact pages
    if (cards.length > 0) {
        renderCards();
    }
    updateCounters();
    renderContactList();
    initNewTask();
}