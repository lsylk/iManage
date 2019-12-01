const express = require("express");
const router = express.Router();

const TaskService = require("./../services/task-service");

router.put("/tasks/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const task = await TaskService.find(taskId);
  await TaskService.update(task, req.body);
  res.send(task);
});

module.exports = router;
