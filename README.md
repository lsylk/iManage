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