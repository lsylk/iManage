const express = require("express");
const router = express.Router();

const UserService = require("./../services/user-service");
const TaskService = require("./../services/task-service");

router.get("/user/:userId/", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.send(user);
});

router.get("/user/all/", async (req, res) => {
  const users = await UserService.findAll();
  res.send(users);
});

router.get("/user/:userId/projects/all", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.send(user.projects);
});

router.get("/user/:userId/tasks/all", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.send(user.tasks);
});

router.post("/user", async (req, res) => {
  const user = await UserService.create(req.body);
  res.send(user);
});

router.post("/user/:userId/task", async (req, res) => {
  const userId = req.params.userId;
  const user = UserService.find(userId);
  const task = await TaskService.create(req.body);
  await UserService.addTask(user, task);
  res.send(task);
});

router.put("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  await UserService.update(user, req.body);
  res.send(user);
});

router.delete("/user/:userId", async (req, res) => {
  const user = await UserService.del(req.params.userId);
  res.send(`User: ${user.name} ${user.surname} was deleted`);
});

router.delete("/user/:userId/task/:taskId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  await UserService.deleteTask(user, {_id: req.params.taskId});
  res.send(`Task: '${task.description}' was deleted from ${user.name} ${user.surname} tasks`);
});

module.exports = router;
