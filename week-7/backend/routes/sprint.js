const express = require("express");
const router = express.Router();

const SprintService = require("./../services/sprint-service");
const TaskService = require("./../services/task-service");

router.get("/:sprintId", async (req, res) => {
  const sprintId = req.params.sprintId;
  const sprint = await SprintService.find(sprintId);
  if (!sprint) res.status(404);
  res.send(sprint);
});

router.put("/:sprintId", async (req, res) => {
  const sprintId = req.params.sprintId;
  let sprint = await SprintService.find(sprintId);
  if (!sprint) res.status(404);
  await SprintService.update(sprint, req.body);
  sprint = await SprintService.find(sprintId);
  res.send(sprint);
});

router.delete("/:sprintId", async (req, res) => {
  const sprint = await SprintService.del(req.params.sprintId);
  res.send(`${sprint.name} was deleted`);
});

router.post("/:sprintId/task", async (req, res) => {
  const sprintId = req.params.sprintId;
  const sprint = await SprintService.find(sprintId);
  if (!sprint) res.status(404);
  const task = await TaskService.create(req.body);
  await SprintService.addTask(sprint, task);
  res.send(task);
});

router.delete("/:sprintId/task/:taskId", async (req, res) => {
  const sprintId = req.params.sprintId;
  let sprint = await SprintService.find(sprintId);
  if (!sprint) res.status(404);
  await SprintService.deleteTask(sprint, { _id: req.params.taskId });
  sprint = await SprintService.find(sprintId);
  res.send(sprint);
});

module.exports = router;