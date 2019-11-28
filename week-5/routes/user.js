const express = require("express");
const router = express.Router();

const UserService = require("./../services/user-service");
const ProjectService = require("./../services/project-service");
const BacklogService = require("./../services/backlog-service");
const SprintService = require("./../services/sprint-service");
const TaskService = require("./../services/task-service");

router.get("/user/:userId/", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.render("user", { user });
});

router.get("/user/all/", async (req, res) => {
  const users = await UserService.findAll();
  res.send(users);
});

router.get("/user/:userId/projects/all", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.find(userId);
  res.render("user", { user });
});

router.get("/user/:userId/tasks/all", async (req, res) => {
  const tasks = await TaskService.findAll();
  res.render("tasks", { tasks });
});

router.post("/user", async (req, res) => {
  const user = await UserService.add(req.body);
  res.render("user", { user, project });
});

router.post("/user/:userId/task", async (req, res) => {
  const userId = req.params.userId;
  const task = await TaskService.add(req.body);
  res.send(task);
});

router.put("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  res.send(user);
});

router.put("/user/:userId/tasks/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  res.send(user);
});

router.delete("/user/:userId", async (req, res) => {
  const user = await UserService.del(req.params.userId);
  res.send(user);
});

router.delete("/user/:userId/task/:taskId", async (req, res) => {
  const project = await TaskService.del(req.params.taskId);
  res.send(project);
});

module.exports = router;
