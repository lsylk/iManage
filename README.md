# iManage

iManage is a task manager for agile software development.

- The user has a view to check out their tasks and projects and see all the existing projects in the team.
  ![](/frontend/src/assets/iManage-part1.gif)

- A project has a backlog and it can have multiple sprints with multiple tasks.
  ![](/frontend/src/assets/iManage-part2.gif)

- The tasks are dragable between backlog and sprints. The backlog and sprints can clear all the tasks at once. The Sprints are also deletable.
  ![](/frontend/src/assets/iManage-part3.gif)

**Technology used:**

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Ava and NYC.
- **Frontend:** Javascript, VueJS, Vuex, VueRouter, VueDraggable, Vue Material, Jest, Cypress.

## Requirements

This application relies heavily on ES6, and so either a recent version of Node or the browsers will be required.

## **🗄 Getting started in the Backend:**

To get the Node server running locally:

- Set up MongoDB locally. [Link](https://www.mongodb.com/download-center?jmp=nav#community) to get started (Click on 'Community Server' Tab to download).
  > If you have homebrew in your machine, use the following command in your Terminal: `brew install mongodb`. And then activate it with the command: `brew services start mongodb`.
- `npm install` to install all the dependencies.
- `nodemon index.js` to start the local server and database connection. (You will see logged in your console 'Server listening' and 'connected').
- View in browser at http://localhost:3000

### **API Endpoints**

### _User Routes_

- **Fetch user by id**
  `GET:`
  `/user/:userId`
- **Fetch all users**
  `GET:`
  `/user/show/all`
- **Fetch all projects from user**
  `GET:`
  `/user/:userId/projects/all`
- **Fetch all tasks from user**
  `GET:`
  `/user/:userId/projects/all`
- **Create new user**
  `POST:`
  `/user`
- **Add project to user**
  `POST:`
  `/user/:userId/project/:projectId`
- **Create new task for user**
  `POST:`
  `/user/:userId/task`
- **Update user**
  `PUT:`
  `/user/:userId`
- **Delete user**
  `DELETE:`
  `/user/:userId`
- **Delete task from user**
  `DELETE:`
  `/user/:userId/task/:taskId`

### _Project Routes_

- **Fetch project by id**
  `GET:`
  `/project/:projectId`
- **Fetch all projects**
  `GET:`
  `/project/show/all`
- **Create new project**
  `POST:`
  `/project`
- **Create new sprint for a project**
  `POST:`
  `/project/:projectId/sprint`
- **Add a task in project's backlog**
  `POST:`
  `/project/:projectId/backlog/task`
- **Update project**
  `PUT:`
  `/project/:projectId`
- **Delete project**
  `DELETE:`
  `/project/:projectId`
- **Clear project's backlog**
  `DELETE:`
  `/project/:projectId/backlog`
- **Delete task from project's backlog**
  `DELETE:`
  `/project/:projectId/backlog/task/:taskId`

### _Sprint Routes_

- **Fetch sprint by id**
  `GET:`
  `/sprint/:sprintId`
- **Update sprint**
  `PUT:`
  `/sprint/:sprintId`
- **Delete sprint**
  `DELETE:`
  `/sprint/:sprintId`
- **Add task to sprint**
  `POST:`
  `/sprint/:sprintId/task`
- **Delete task from sprint**
  `DELETE:`
  `/sprint/:sprintId/task/:taskId`
- **Clear all tasks from a sprint**
  `DELETE:`
  `/sprint/:sprintId/tasks`

### _Task Routes_

- **Fetch task by id**
  `GET:`
  `/task/:taskId`
- **Update task**
  `PUT:`
  `/task/:taskId`

### **Commands to run tests**

- `npm run test` to run AVA, which is a test runner for Node.js.
- `npm run test-coverage` to get the test coverage with NYC in the CLI.
- `nyc report --reporter=html` to get the test coverage report.

## **🖥 Getting started in the Frontend:**

- `npm install` to install all the dependencies.
- `npm run serve` to start running the application locally in your machine.
- View in browser at http://localhost:8080 (if your 8080 port is occupied, vue-cli-service will automatically run it in a different port).

### **Commands to run tests**

- `npm run test:e2e` to run cypress, which is an end to end testing framework.
- `npm run test:unit` to run unit tests written in jest.

## **To Do:**

- Add more tests on backend and frontend.
- Enable to update different entities in the frontend.
