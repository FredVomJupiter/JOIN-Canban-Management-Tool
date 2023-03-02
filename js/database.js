let cards = [
    {
        id: "card0",
        category: "To do",
        color: "#FF7A00",
        group: "Design",
        title: "Website redesign",
        text: "Modify the contents of the main website...",
        date: new Date("05.08.2022"),
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
        date: new Date("08/07/2023"),
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
        date: new Date("07.07.2023"),
        priority: "urgent",
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
        date: new Date("07.08.2022"),
        priority: "medium",
        assigned: ["Anton Mayer"],
        subtask: []
    },
    {
        id: "card4",
        category: "Done",
        color: "#29ABE2",
        group: "Media",
        title: "Video cut 2",
        text: "Reedit the video",
        date: new Date("06.10.2022"),
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
        date: new Date("06.07.2022"),
        priority: "low",
        assigned: ["Anton Mayer", "Horst Buddler"],
        subtask: [{ text: "subtask 1", status: 1 }, { text: "subtask 2", status: 1 }, { text: "subtask 3", status: 1 }]
    }
];

let contacts = [
    {
        id: "contact0",
        name: "Anton Mayer",
        email: "anton@gmail.com",
        phone: "+49 1111 111 111"
    },
    {
        id: "contact1",
        name: "Anja Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 2222 222 222"
    },
    {
        id: "contact2",
        name: "Horst Buddler",
        email: "horsti@gmx.de",
        phone: "+49 3333 333 333"
    },
    {
        id: "contact3",
        name: "Tefaldine Erigalosimischilli",
        email: "t.erigalosimischilli@aol.com",
        phone: "+49 4444 444 444"
    },
    {
        id: "contact4",
        name: "Vino Jedentag",
        email: "holladiewaldfee@mail.de",
        phone: "+49 5555 555 555"
    },
    {
        id: "contact5",
        name: "Ibrahimovic Zoltan",
        email: "zoltan.derschlingel@hotmail.com",
        phone: "+49 6666 666 666"
    },
    {
        id: "contact6",
        name: "Der Mitdemlangennamenwiekrass",
        email: "der.mitderlangenemailadresse@gmail.de",
        phone: "+49 7777 777 777"
    },
];

//const Datastore = require('nedb');

//const database = new Datastore('https://www.frederic-rieg.developerakademie.net/JOIN/database.db');
//database.loadDatabase();