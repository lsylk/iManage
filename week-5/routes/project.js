const express = require("express");
const router = express.Router();

const UserService = require("./../services/user-service");
const ProjectService = require("./../services/project-service");
const BacklogService = require("./../services/backlog-service");
const SprintService = require("./../services/sprint-service");
const TaskService = require("./../services/task-service");

router.get("/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await UserService.find(projectId);
  res.send(project);
});

router.post("/project", async (req, res) => {
  const project = await ProjectService.create(req.body);
  res.send(project);
});

router.post("/project/:projectId/sprint", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  const sprint = await SprintService.create(req.body);
  await ProjectService.addSprint(project, sprint);
  res.send(sprint);
});

router.post("/project/:projectId/backlog/task", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  const task = await TaskService.create(req.body);
  await BacklogService.addTask(project.backlog, task);
  res.send(task);
});

router.put("/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  await ProjectService.update(project, req.body);
  res.send(project);
});

router.delete("/project/:projectId", async (req, res) => {
  const project = await ProjectService.del(req.params.projectId);
  res.send(`${project.name} was deleted`);
});

router.delete("/project/:projectId/backlog", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  await ProjectService.clearBacklog(project);Í
  res.send(project);
});

router.delete("/project/:projectId/backlog/task/:taskId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  await BacklogService.deleteTask(project.backlog, {_id: req.params.taskId})
  res.send(project);
});

module.exports = router;
