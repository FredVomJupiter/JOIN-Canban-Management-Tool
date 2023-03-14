class Task {
    id = "task"+ new Date().getTime();
    title;
    text;
    group;
    color;
    date;
    priority = "low";
    assigned = [];
    subtasks = [];

    constructor(title, text, group, color, date, priority, assigned, subtasks) {
        this.title = title;
        this.text = text;
        this.group = group;
        this.color = color;
        this.date = date;
        this.priority = priority;
        this.assigned = assigned;
        this.subtasks = subtasks;
    }
}