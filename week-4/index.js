const express = require("express");
const bodyParser = require('body-parser');
const UserService = require("./services/user-service");
const ProjectService = require("./services/project-service");
const BacklogService = require("./services/backlog-service");
const SprintService = require("./services/sprint-service");
const TaskService = require("./services/task-service");

const app = express();

app.listen(3000);
app.set('view engine', 'pug');
app.use(bodyParser.json())

app.get('/user/:userId/', async(req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.render('user', {user});
});

app.get('/user/all/', async(req, res) => {
  const users = await UserService.findAll();
  res.send(users);
});

app.get('/user/:userId/projects/all', async(req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.render('user', {user});  
});

app.get('/user/:userId/tasks/all', async(req, res) => {
  const tasks = await TaskService.findAll();
  res.render('tasks', {tasks});
});

app.get('/project/:projectId', async(req, res) => {
  const projectId = req.params.projectId;
  const project = await UserService.find(projectId);
  res.render('user', {project});
});

app.post('/user', async(req, res) => {
  const user = await UserService.add(req.body);
  res.render('user', {user, project});
})

app.post('/project', async (req, res) => {
  const project = await ProjectService.add(req.body)
  res.send(project);
})

// ------ TO DO: add methods to the following routes
app.post('/project/:projectId/sprint', async (req, res) => {
  const projectId = req.params.projectId;
  const sprint = await SprintService.add(req.body)
  res.send(sprint);
})

app.post('/user/:userId/task', async (req, res) => {
  const userId = req.params.userId;
  const task = await TaskService.add(req.body)
  res.send(task);
})

app.post('/project/:projectId/backlog/task', async (req, res) => {
  const projectId = req.params.projectId;
  const task = await TaskService.add(req.body)
  res.send(task);
})

app.post('/project/:projectId/sprint/:sprintId/task', async (req, res) => {
  const projectId = req.params.projectId;
  const sprintId = req.params.sprintId;
  const task = await TaskService.add(req.body)
  res.send(task);
})

app.put('user/:userId', async(req, res) => {
  const userId = req.params.userId;
 
  res.send(user)
})

app.put('/project/:projectId', async(req, res) => {
  const projectId = req.params.projectId;
 
  res.send(user)
})


app.put('/sprint/:sprintId', async(req, res) => {
  const sprintId = req.params.sprintId;
 
  res.send(user)
})

app.put('user/:userId/tasks/:taskId', async(req, res) => {
  const taskId = req.params.taskId;
 
  res.send(user)
})

// -----

app.delete('/user/:userId', async (req, res) => {
  const user = await UserService.del(req.params.userId)
  res.send(user)
})

app.delete('/project/:projectId', async (req, res) => {
  const project = await ProjectService.del(req.params.projectId)
  res.send(project)
})

app.delete('/project/:projectId/backlog', async (req, res) => {
  const backlog = await BacklogService.del(req.params.backlogId)
  res.send(backlog)
})

app.delete('/sprint/:sprintId', async (req, res) => {
  const sprint = await SprintService.del(req.params.sprintId)
  res.send(sprint)
})

app.delete('userId/:userId/task/:taskId', async (req, res) => {
  const project = await TaskService.del(req.params.taskId)
  res.send(project)
})

app.delete('projectId/:projectId/backlog/task/:taskId', async (req, res) => {
  const project = await TaskService.del(req.params.taskId)
  res.send(project)
})

app.delete('sprintId/:sprintId/task/:taskId', async (req, res) => {
  const project = await TaskService.del(req.params.taskId)
  res.send(project)
})




