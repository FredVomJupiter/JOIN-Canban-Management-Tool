# JOIN-Kanban-Management-Tool

JOIN is a team-oriented kanban board that helps you keep track of your and your team's tasks.
This app is divided into five sections: login, summary, board, add task and contacts.

It is connected to a Django Restful API written by me. Login with basic authentication and tokens.

All accounts can see all todos, categories, subtasks and contacts. However, updating or deleting of other account's data is prohibited.

*** A guest login is provided ***

2) The summary gives you an overview of how many tasks are on board, in progress, awaiting feedback, to-do, done as well as the upcoming deadlines for urgent tasks.

3) The board contains the actual kanban board with tasks attached like sticky notes. Here you can view, drag and drop, create new, delete, edit and search tasks (CRUD).

4) In the add task section, you can add new tasks without using the board-overlay.

5) Finally, the contacts page gives you an overview of existing contacts. Here you can add new and edit existing contacts. Deleting contacts is not possible.
