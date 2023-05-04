# JOIN-Kanban-Management-Tool

JOIN is a team-oriented kanban board that helps you keep track of your and your team's tasks.
This app is divided into five sections: login, summary, board, add task and contacts.

1) Login and signup are connected to a mini-backend (no security layer) written by Junus Ergin (Developer Akademie). The signup and login is SHA256 encrypted to prevent passwords being displayed as plain text in the console dev-tools or in the database. Although salt has been added, it is not randomly generated but a hard coded variable for demonstration purposes.

*** A guest login is provided ***

2) The summary gives you an overview of how many tasks are on board, in progress, awaiting feedback, to-do, done as well as the upcoming deadlines for urgent tasks.

3) The board contains the actual kanban board with tasks attached like sticky notes. Here you can view, drag and drop, create new, delete, edit and search tasks (CRUD).

4) In the add task section, you can add new tasks without using the board-overlay.

5) Finally, the contacts page gives you an overview of existing contacts. Here you can add new and edit existing contacts. Deleting contacts is not possible.
