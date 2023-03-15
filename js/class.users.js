class User {
    id = "user" + new Date().getTime();
    name;
    email;
    password;
    session;
    remembered = 0;

    constructor(name, email, password, session) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.session = session;
    }
}