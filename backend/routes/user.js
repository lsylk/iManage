const express = require("express");
const router = express.Router();

const UserService = require("../services/user-service");
const ProjectService = require("../services/project-service");
const TaskService = require("../services/task-service");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  res.send(user);
});

router.get("/show/all", async (req, res) => {
  const users = await UserService.findAll();
  if (!users) res.status(404);
  res.send(users);
});

router.get("/:userId/projects/all", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  res.send(user.projects);
});

router.get("/:userId/tasks/all", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  res.send(user.tasks);
});

router.post("/", async (req, res) => {
  const user = await UserService.create(req.body);
  res.send(user);
});

router.post("/:userId/project/:projectId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  const project = await ProjectService.find(req.params.projectId);
  await UserService.addProject(user, project);
  await ProjectService.addUser(project, user);
  res.send(await UserService.find(userId));
});

router.post("/:userId/task", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  let task = await TaskService.create(req.body);
  await UserService.addTask(user, task);
  task = await TaskService.find(task._id);
  res.send(task);
});

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  let user = await UserService.find(userId);
  if (!user) res.status(404);
  await UserService.update(user, req.body);
  user = await UserService.find(userId);
  res.send(user);
});

router.delete("/:userId", async (req, res) => {
  const user = await UserService.del(req.params.userId);
  res.send(`User: ${user.name} ${user.surname} was deleted`);
});

router.delete("/:userId/task/:taskId", async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  const user = await UserService.find(userId);
  const task = await TaskService.find(taskId);
  if (!user || !task) res.status(404);
  await UserService.deleteTask(user, { _id: req.params.taskId });
  res.send(
    `Task: '${task.description}' was deleted from ${user.name} ${user.surname} tasks`
  );
});

module.exports = router;
