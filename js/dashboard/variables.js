// Local instances of the database collected from the server.
let contacts = [];
let categories = [];
let subtasks = [];
let tasks = [];
let loggedUser = {};


// Local instances of data to be sent to the server.
let newContact = new Contact(null, null, null, null);
let newCategory = new Category(null, null);
let newSubtasks = [];
let newTask = new Task(null, null, null, "Todo", null, "Low", [], []);