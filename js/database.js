let colors = [
    "#BDB76B", "#2E8B57", "#20B2AA", "#5F9EA0", "#00BFFF", "#DAA520", "#F4A460", "#A52A2A", "#DA70D6", "#9932CC", "#708090", "#00008B", "#48D1CC", "#9ACD32", "#FFE4B5", "#FF6347", "#FF7A00"
];

let contacts = [
    {
        id: "contact0",
        color: colors[0],
        name: "Anton Mayer",
        email: "anton@gmail.com",
        phone: "+49 1111 111 111"
    },
    {
        id: "contact1",
        color: colors[1],
        name: "Anja Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 2222 222 222"
    },
    {
        id: "contact2",
        color: colors[2],
        name: "Horst Buddler",
        email: "horsti@gmx.de",
        phone: "+49 3333 333 333"
    },
    {
        id: "contact3",
        color: colors[3],
        name: "Tefaldine Erigalosimischilli",
        email: "t.erigalosimischilli@aol.com",
        phone: "+49 4444 444 444"
    },
    {
        id: "contact4",
        color: colors[4],
        name: "Vino Jedentag",
        email: "holladiewaldfee@mail.de",
        phone: "+49 5555 555 555"
    },
    {
        id: "contact5",
        color: colors[5],
        name: "Ibrahimovic Zoltan",
        email: "zoltan.derschlingel@hotmail.com",
        phone: "+49 6666 666 666"
    },
    {
        id: "contact6",
        color: colors[6],
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
        subtask: [{ name: "Start here", status: 1 }, { name: "Then do banana", status: 0 }]
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
        subtask: [{ name: "Develop donkey", status: 1 }, { name: "Make wow", status: 1 }, { name: "Be super", status: 1 }]
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