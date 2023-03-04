let contacts = [
    {
        id: "contact0",
        color: "#FF7A00",
        name: "Anton Mayer",
        email: "anton@gmail.com",
        phone: "+49 1111 111 111"
    },
    {
        id: "contact1",
        color: "#FF7A00",
        name: "Anja Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 2222 222 222"
    },
    {
        id: "contact2",
        color: "#FF7A00",
        name: "Horst Buddler",
        email: "horsti@gmx.de",
        phone: "+49 3333 333 333"
    },
    {
        id: "contact3",
        color: "#FF7A00",
        name: "Tefaldine Erigalosimischilli",
        email: "t.erigalosimischilli@aol.com",
        phone: "+49 4444 444 444"
    },
    {
        id: "contact4",
        color: "#FF7A00",
        name: "Vino Jedentag",
        email: "holladiewaldfee@mail.de",
        phone: "+49 5555 555 555"
    },
    {
        id: "contact5",
        color: "#FF7A00",
        name: "Ibrahimovic Zoltan",
        email: "zoltan.derschlingel@hotmail.com",
        phone: "+49 6666 666 666"
    },
    {
        id: "contact6",
        color: "#FF7A00",
        name: "Der Mitdemlangennamenwiekrass",
        email: "der.mitderlangenemailadresse@gmail.de",
        phone: "+49 7777 777 777"
    }
];

let cards = [
    {
        id: "card0",
        group: "To do",
        color: "#FF7A00",
        category: "Design",
        title: "Website redesign",
        text: "Modify the contents of the main website...",
        date: "",
        priority: "low",
        assigned: ["contact0", "contact1", "contact4", "contact5"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 0 }]
    },
    {
        id: "card1",
        group: "In Progress",
        color: "#9327FF",
        category: "Sales",
        title: "Call potential clients with a bananaphone",
        text: "Make the product presentation to prospective buyers while maintaining calm and drink a coup of tea with the boys from next door. Cheers mate!",
        date: new Date("08/07/2023"),
        priority: "urgent",
        assigned: ["contact0", "contact3", "contact6"],
        subtask: []
    },
    {
        id: "card2",
        group: "Awaiting Feedback",
        color: "#4E963D",
        category: "Backoffice",
        title: "Accounting invoices",
        text: "Write open invoices for customer",
        date: new Date("07.07.2023"),
        priority: "urgent",
        assigned: ["contact0", "contact2", "contact6"],
        subtask: []
    },
    {
        id: "card3",
        group: "Awaiting Feedback",
        color: "#29ABE2",
        category: "Media",
        title: "Video cut",
        text: "Edit the new company video",
        date: new Date("07.08.2022"),
        priority: "medium",
        assigned: ["contact0"],
        subtask: []
    },
    {
        id: "card4",
        group: "Done",
        color: "#29ABE2",
        category: "Media",
        title: "Video cut 2",
        text: "Reedit the video",
        date: new Date("06.10.2022"),
        priority: "medium",
        assigned: ["contact0"],
        subtask: []
    },
    {
        id: "card5",
        group: "Done",
        color: "#ff0051",
        category: "Marketing",
        title: "Social media strategy",
        text: "Develop an ad campaign for brand positioning",
        date: new Date("06.07.2022"),
        priority: "low",
        assigned: ["contact0", "contact1"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 1 }, { text: "subtask 3", status: 1 }]
    }
];

let categories = [
    {
        name: "Design",
        color: "#FF7A00"
    },
    {
        name: "Marketing",
        color: "#ff0051"
    },
    {
        name: "Media",
        color: "#29ABE2"
    },
    {
        name: "Backoffice",
        color: "#4E963D"
    },
    {
        name: "Sales",
        color: "#9327FF"
    }
];

//const Datastore = require('nedb');

//const database = new Datastore('https://www.frederic-rieg.developerakademie.net/JOIN/database.db');
//database.loadDatabase();