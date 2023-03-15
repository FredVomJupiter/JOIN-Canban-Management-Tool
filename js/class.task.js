class Task {
    id = "task"+ new Date().getTime();
    title;
    text;
    category = "General";
    group;
    color;
    date;
    priority = "low";
    assigned = [];
    subtask = [];

    constructor(title, text, category, group, color, date, priority, assigned, subtask) {
        this.title = title;
        this.text = text;
        this.category = category;
        this.group = group;
        this.color = color;
        this.date = date;
        this.priority = priority;
        this.assigned = assigned;
        this.subtask = subtask;
    }
}