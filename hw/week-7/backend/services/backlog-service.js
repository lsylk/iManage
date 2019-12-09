const BaseService = require("./base-service");
const BacklogModel = require("../models/backlog");

class BacklogService extends BaseService {
  model = BacklogModel;

  async cleanBacklog(backlog) {
    backlog.tasks = [];
    return backlog.save();
  }
}

BacklogService.prototype.addTask = BaseService.addEntity("tasks");
BacklogService.prototype.deleteTask = BaseService.deleteEntity("tasks");

module.exports = new BacklogService();
