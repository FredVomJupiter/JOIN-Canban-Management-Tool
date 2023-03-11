let theCard;

function dragstart(event, cardId) {
    theCard = cardId;
}


function dragend(event, group) {
    cards.forEach(card => {
        if (card.id === theCard) {
            card.group = group;
        }
    });
    saveLocalStorage('cards');
    insertIntoDatabase();
    renderCards();
}


function dragover(event) {
    event.preventDefault();
}


function dragenter(event, zone) {
    event.preventDefault();
    let dropzone = document.getElementById(zone);
    dropzone.style.border = "2px dotted black";
}


function dragleave(event, zone) {
    event.preventDefault();
    let dropzone = document.getElementById(zone);
    dropzone.style.border = "unset";
}