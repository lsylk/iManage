const BaseService = require("./base-service");
const TaskModel = require("../models/task");

class TaskService extends BaseService {
  model = TaskModel;
}

TaskService.prototype.addUser = BaseService.addEntity("users");
TaskService.prototype.deleteUser = BaseService.deleteEntity("users");


module.exports = new TaskService();
