// All months for the summary board (urgent) date calculation and visualization.
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Fixed color sets for contacts.
let colors = [
    "#BDB76B", "#2E8B57", "#20B2AA", "#5F9EA0", "#00BFFF", "#DAA520", "#F4A460", "#A52A2A", "#DA70D6", "#9932CC", "#708090", "#00008B", "#48D1CC", "#9ACD32", "#FFE4B5", "#FF6347", "#FF7A00"
];

// First contact is the user itself.
let contacts = [
    {
        id: "contact0",
        color: colors[0],
        name: "Your Self",
        email: "standard@mail.com",
        phone: "12345678"
    }
];

let cards = [
    
];

// Fixed color sets for categories.
let categories = [
    {
        id: "category0",
        name: "Design",
        color: "#FF7A00"
    },
    {
        id: "category1",
        name: "Marketing",
        color: "#ff0051"
    },
    {
        id: "category2",
        name: "Media",
        color: "#29ABE2"
    },
    {
        id: "category3",
        name: "Backoffice",
        color: "#4E963D"
    },
    {
        id: "category4",
        name: "Sales",
        color: "#9327FF"
    }
];

/**
 * Saving to mini backand similar to local storage.
 * @param {*} what as string 'cards', 'contacts' or 'categories'.
 */
function saveLocalStorage(what) {
    if (what === 'cards') {
        let cards_serialized = JSON.stringify(cards);
        backend.setItem("cards", cards_serialized);
    }
    if (what === 'contacts') {
        let contacts_serialized = JSON.stringify(contacts);
        backend.setItem("contacts", contacts_serialized);
    }
    if (what === 'categories') {
        let categories_serialized = JSON.stringify(categories);
        backend.setItem("categories", categories_serialized);
    }
}

/**
 * Loading from mini backend similar to local storage.
 * @param {*} what as string 'cards', 'contacts' or 'categories'.
 */
async function loadLocalStorage(what) {
    if (what === 'cards') {
        cards_deserialized = JSON.parse(backend.getItem("cards"));
        if (cards_deserialized != null) {
            cards = cards_deserialized;
        }
    }
    if (what === 'contacts') {
        contacts_deserialized = JSON.parse(backend.getItem("contacts"));
        if (contacts_deserialized != null) {
            contacts = contacts_deserialized;
        }
    }
    if (what === 'categories') {
        categories_deserialized = JSON.parse(backend.getItem("categories"));
        if (categories_deserialized != null) {
            categories = categories_deserialized;
        }
    }
    if (what === 'users') {
        users_deserialized = JSON.parse(backend.getItem("users"));
        if (users_deserialized != null) {
            users = users_deserialized;
        }
    }
}