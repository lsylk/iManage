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
  let task = await TaskService.create(req.body);
  await SprintService.addTask(sprint, task);
  task = await TaskService.find(task._id);
  res.send(task);
});

router.delete("/:sprintId/tasks", async (req, res) => {
  const sprintId = req.params.sprintId;
  let sprint = await SprintService.find(sprintId);
  if (!sprint) res.status(404);
  await SprintService.cleanSprint(sprint);
  res.send(`All tasks from ${sprint.name} were deleted`);
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
