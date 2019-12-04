const express = require("express");
const router = express.Router();

const ProjectService = require("./../services/project-service");
const BacklogService = require("./../services/backlog-service");
const SprintService = require("./../services/sprint-service");
const TaskService = require("./../services/task-service");

router.get("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  if (!project) res.status(404)
  res.send(project);
});

router.get("/show/all", async (req, res) => {
  const projects = await ProjectService.findAll();
  if (!projects) res.status(404);
  res.send(projects);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const backlog = await BacklogService.create({tasks:[]});
  data.backlog = backlog;
  const project = await ProjectService.create(data);
  res.send(project);
});

router.post("/:projectId/sprint", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  if (!project) res.status(404)
  const sprint = await SprintService.create(req.body);
  await ProjectService.addSprint(project, sprint);
  res.send(sprint);
});

router.post("/:projectId/backlog/task", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  if (!project) res.status(404)
  const task = await TaskService.create(req.body);
  await BacklogService.addTask(project.backlog, task);
  res.send(task);
});

router.put("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  let project = await ProjectService.find(projectId);
  if (!project) res.status(404)
  await ProjectService.update(project, req.body);
  project = await ProjectService.find(projectId);
  res.send(project);
});

router.delete("/:projectId", async (req, res) => {
  const project = await ProjectService.del(req.params.projectId);
  res.send(`${project.name} was deleted`);
});

router.delete("/:projectId/backlog", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  if (!project) res.status(404)
  await ProjectService.cleanBacklog(project);
  res.send(project);
});

router.delete("/:projectId/backlog/task/:taskId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await ProjectService.find(projectId);
  if (!project) res.status(404)
  await BacklogService.deleteTask(project.backlog, {_id: req.params.taskId})
  res.send(project);
});

module.exports = router;
