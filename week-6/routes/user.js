const express = require("express");
const router = express.Router();

const UserService = require("../services/user-service");
const TaskService = require("../services/task-service");

router.get("/show/all", async (req, res) => {
  const users = await UserService.findAll();
  if (!users) res.status(404);
  res.send(users);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  res.send(user);
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

router.post("/:userId/task", async (req, res) => {
  const userId = req.params.userId;
  const user = UserService.find(userId);
  if (!user) res.status(404);
  const task = await TaskService.create(req.body);
  await UserService.addTask(user, task);
  res.send(task);
});

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  await UserService.update(user, req.body);
  res.send(user);
});

router.delete("/:userId", async (req, res) => {
  const user = await UserService.del(req.params.userId);
  res.send(`User: ${user.name} ${user.surname} was deleted`);
});

router.delete("/:userId/task/:taskId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  if (!user) res.status(404);
  await UserService.deleteTask(user, { _id: req.params.taskId });
  res.send(
    `Task: '${task.description}' was deleted from ${user.name} ${user.surname} tasks`
  );
});

module.exports = router;
