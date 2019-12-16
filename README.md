# iManage

iManage is a task manager for agile software development.

**Technology used:** 
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Ava and NYC.
- **Frontend:** Javascript, VueJS, Vuex, VueRouter, VueDraggable, Vue Material, Jest, Cypress.

## **Backend:**

### **API Endpoints**

### *User Routes*
- **Fetch user by id**
 `GET:`
	 ```
	/user/:userId
	```
- **Fetch all users**
 `GET:`
	 ```
	/user/show/all
	```
- **Fetch all projects from user**
 `GET:`
	 ```
	/user/:userId/projects/all
	```

- **Fetch all tasks from user**
 `GET:`
	 ```
	/user/:userId/projects/all
	```
- **Create new user**
 `POST:`
	 ```
	/user
	```
- **Add project to user**
 `POST:`
	 ```
	/user/:userId/project/:projectId
	```
- **Create new task for user**
 `POST:`
	 ```
	/user/:userId/task
	```
- **Update user**
 `PUT:`
	 ```
	/user/:userId
	```
- **Delete user**
 `DELETE:`
	 ```
	/user/:userId
	```
- **Delete task from user**
 `DELETE:`
	 ```
	/user/:userId/task/:taskId
	```
### *Project Routes*
- **Fetch user by id**
 `GET:`
	 ```
	/user/:userId
	```

### *Project Routes*
- **Fetch project by id**
 `GET:`
	 ```
	/project/:projectId
	```
- **Fetch all projects**
 `GET:`
	 ```
	/project/show/all
	```
- **Create new project**
 `POST:`
	 ```
	/project
	```
- **Create new sprint for a project**
 `POST:`
	 ```
	/project/:projectId/sprint
	```
- **Add a task in project's backlog**
 `POST:`
	 ```
	/project/:projectId/backlog/task
	```
- **Update project**
 `PUT:`
	 ```
	/project/:projectId
	```
- **Delete project**
 `DELETE:`
	 ```
	/project/:projectId
	 ```
- **Clear project's backlog**
 `DELETE:`
	 ```
	/project/:projectId/backlog
	 ```
- **Delete task from project's backlog**
 `DELETE:`
	 ```
	/project/:projectId/backlog/task/:taskId
	 ``` 