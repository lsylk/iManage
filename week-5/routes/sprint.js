const express = require("express");
const router = express.Router();

const SprintService = require("./../services/sprint-service");
const TaskService = require("./../services/task-service");

router.put("/sprint/:sprintId", async (req, res) => {
  const sprintId = req.params.sprintId;
  const sprint = await SprintService.find(sprintId);
  await SprintService.update(sprint, req.body)
  res.send(sprint);
});

router.delete("/sprint/:sprintId", async (req, res) => {
  const sprint = await SprintService.del(req.params.sprintId);
  res.send(`${sprint.name} was deleted`);
});

router.post("/sprint/:sprintId/task", async (req, res) => {
  const sprintId = req.params.sprintId;
  const sprint = await SprintService.find(sprintId);
  const task = await TaskService.create(req.body);
  await SprintService.addTask(sprint, task);
  res.send(task);
});

router.delete("/sprint/:sprintId/task/:taskId", async (req, res) => {
  const sprintId = req.params.sprintId;
  const sprint = await SprintService.find(sprintId);
  await SprintService.deleteTask(sprint, {_id: req.params.taskId})
  res.send(sprint);
});

module.exports = router;
