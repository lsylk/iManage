const express = require("express");
const router = express.Router();

const UserService = require("./../services/user-service");
const ProjectService = require("./../services/project-service");
const BacklogService = require("./../services/backlog-service");
const SprintService = require("./../services/sprint-service");
const TaskService = require("./../services/task-service");

router.put("/sprint/:sprintId", async (req, res) => {
  const sprintId = req.params.sprintId;

  res.send(user);
});

router.delete("/sprint/:sprintId", async (req, res) => {
  const sprint = await SprintService.del(req.params.sprintId);
  res.send(sprint);
});

router.delete("/sprint/:sprintId/task/:taskId", async (req, res) => {
  const project = await TaskService.del(req.params.taskId);
  res.send(project);
});

module.exports = router;
