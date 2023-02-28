let cards = [
    {
        id: "card0",
        category: "To do",
        color: "#FF7A00",
        group: "Design",
        title: "Website redesign",
        text: "Modify the contents of the main website...",
        date: 05 - 08 - 2022,
        priority: "low",
        assigned: ["Anton Mayer", "Horst Buddler", "Ibrahimovic Zoltan", "Dieter Müller"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 0 }]
    },
    {
        id: "card1",
        category: "In Progress",
        color: "#9327FF",
        group: "Sales",
        title: "Call potential clients with a bananaphone",
        text: "Make the product presentation to prospective buyers",
        date: 06 - 07 - 2022,
        priority: "urgent",
        assigned: ["Anton Mayer", "Horst Buddler", "Ibrahimovic Zoltan"],
        subtask: []
    },
    {
        id: "card2",
        category: "Awaiting Feedback",
        color: "#4E963D",
        group: "Backoffice",
        title: "Accounting invoices",
        text: "Write open invoices for customer",
        date: 22 - 07 - 2022,
        priority: "medium",
        assigned: ["Anton Mayer", "Horst Buddler", "Ibrahimovic Zoltan"],
        subtask: []
    },
    {
        id: "card3",
        category: "Awaiting Feedback",
        color: "#29ABE2",
        group: "Media",
        title: "Video cut",
        text: "Edit the new company video",
        date: 06 - 09 - 2022,
        priority: "medium",
        assigned: ["Anton Mayer"],
        subtask: []
    },
    {
        id: "card4",
        category: "Awaiting Feedback",
        color: "#29ABE2",
        group: "Media",
        title: "Video cut 2",
        text: "Reedit the video",
        date: 06 - 10 - 2022,
        priority: "medium",
        assigned: ["Anton Mayer"],
        subtask: []
    },
    {
        id: "card5",
        category: "Done",
        color: "#ff0051",
        group: "Marketing",
        title: "Social media strategy",
        text: "Develop an ad campaign for brand positioning",
        date: 06 - 07 - 2022,
        priority: "low",
        assigned: ["Anton Mayer", "Horst Buddler"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 0 }, { text: "subtask 3", status: 0 }]
    }
];

//const Datastore = require('nedb');

//const database = new Datastore('https://www.frederic-rieg.developerakademie.net/JOIN/database.db');
//database.loadDatabase();