class Task {
    id;
    title;
    description;
    category;
    status = "Todo";
    color;
    due_date;
    priority = "Low";
    assigned_to = [];
    subtasks = [];

    constructor(title, description, category, status, color, due_date, priority, assigned_to, subtasks) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.color = color;
        this.due_date = due_date;
        this.priority = priority;
        this.assigned_to = assigned_to;
        this.subtasks = subtasks;
    }
}