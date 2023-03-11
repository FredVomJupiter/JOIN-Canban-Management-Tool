const Datastore = require('nedb');

const databaseCards = new Datastore('cards.db');
const databaseContacts = new Datastore('contacts.db');
const databaseCategories = new Datastore('categories.db');


function loadDatabases() {
    databaseCards.loadDatabase();
    databaseContacts.loadDatabase();
    databaseCategories.loadDatabase();
}


function insertIntoDatabase() {
    // Clear old entries
    clearDatabase();
    // Add new entries
    databaseCards.insert(cards);
    databaseContacts.insert(contacts);
    databaseCategories.insert(categories);
}


function clearDatabase() {
    databaseCards.remove({}, { multi: true }, function (err, numRemoved) {
    });
    databaseContacts.remove({}, { multi: true }, function (err, numRemoved) {
    });
    databaseCategories.remove({}, { multi: true }, function (err, numRemoved) {
    });
}