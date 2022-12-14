# Jello

Try out **Jello** [here](https://friendly-rabanadas-95dae4.netlify.app/)!

Jello is a productivity app with a mobile first design inspired by Trello. After using Trello for many of my previous projects, I decided to see what it takes to build a web-based app like Trello. Users can create task boards that are fully drag and droppable and invite other users to their workspace to edit boards they've created. 

## Table of Contents
* [Technologies](#technologies)
* [Usage](#usage)
* [Authentication](#authentication)
* [Task Board](#task-board)
* [Profile Page](#profile-page)
* [Screenshots](#screenshots)


## Technologies
* React 18.2.0 (w/ React Router Dom 6.3.0)
* npm 8.11
* JavaScript
* CSS
* Firebase
* Netlify

## Usage
No installation is required, Jello is deployed [here](https://friendly-rabanadas-95dae4.netlify.app/). You can use the test account or create your own
* Test Account:
    - Login: chicken@ga.co
    - Password: chicken

## Authentication
Accounts created are stored on in the firebase authentication database. Auth.js checks if the user logged-in is present in firebase and logs you into an auth session until you log-out.

## Task Board
The board data is stored in the firebase database, you can see a sample board in the initial-data.js document. The drag and drop feature allows you to move tasks between lists using [react beautiful dnd](https://github.com/atlassian/react-beautiful-dnd). Tasks can be moved by dragging the handle box and clicking the task allows you to edit and view more information about the task. List can be generated by adding press list and the name of the list can be edited by double-clicking the list name.

## Workspaces
Workspaces utilize modals to trigger prompts for the user. A workspace can be made and deleted by workspace members. You can add members to your workspace, where you'll be prompted to search for users in the database. If you completely backspace the search field, a list of 10 users in the database will be shown.

## Profile Page
Workspace invitations are shown here, where users can accept or decline workspace invites. In-addition a notification icon in the nav shows your current pending invites when you log-in. 

## Screenshots
![Login](/public/screenshots/Login.png)
![Workspace](/public/screenshots/Workspace1.png)
![TaskBoard](/public/screenshots/TaskBoard.png)
![TaskInfo](/public/screenshots/TaskDescription.png)
![Dashboard](/public/screenshots/Dashboard.png)
![InviteSearch](/public/screenshots/InviteSearch.png)
![AcceptedBoard](/public/screenshots/AcceptedBoard.png)
![Mobile](/public/screenshots/MobileWorkspace.png)




## Resources
* [Firebase Documentation](https://firebase.google.com/docs)
* [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
* [React Bootstrap](https://react-bootstrap.github.io/)
