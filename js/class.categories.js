class Categories {
    id = "category" + new Date().getTime();
    name;
    color;

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}