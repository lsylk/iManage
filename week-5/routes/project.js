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
  res.render("user", { project });
});

router.post("/project", async (req, res) => {
  const project = await ProjectService.add(req.body);
  res.send(project);
});

router.post("/project/:projectId/sprint", async (req, res) => {
  const projectId = req.params.projectId;
  const sprint = await SprintService.add(req.body);
  res.send(sprint);
});

router.post("/project/:projectId/backlog/task", async (req, res) => {
  const projectId = req.params.projectId;
  const task = await TaskService.add(req.body);
  res.send(task);
});

router.post("/project/:projectId/sprint/:sprintId/task", async (req, res) => {
  const projectId = req.params.projectId;
  const sprintId = req.params.sprintId;
  const task = await TaskService.add(req.body);
  res.send(task);
});

router.put("/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  res.send(user);
});

router.delete("/project/:projectId", async (req, res) => {
  const project = await ProjectService.del(req.params.projectId);
  res.send(project);
});

router.delete("/project/:projectId/backlog", async (req, res) => {
  const backlog = await BacklogService.del(req.params.backlogId);
  res.send(backlog);
});

router.delete("/project/:projectId/backlog/task/:taskId", async (req, res) => {
  const project = await TaskService.del(req.params.taskId);
  res.send(project);
});

module.exports = router;
