class Contact {
    id = "contact" + new Date().getTime();
    name;
    email;
    phone;
    color;

    constructor(name, email, phone, color) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.color = color;
    }
}