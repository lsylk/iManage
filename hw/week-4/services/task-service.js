const BaseService = require("./base-service");
const TaskModel = require("../models/task");

class TaskService extends BaseService {
  constructor() {
    super(TaskModel, `${__dirname}/../data/task-database.json`);
  }
}

module.exports = new TaskService();
