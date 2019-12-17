const BaseService = require("./base-service");
const SprintModel = require("../models/sprint");

class SprintService extends BaseService {
  model = SprintModel;

  async cleanSprint(sprint) {
    sprint.tasks = [];
    return sprint.save();
  }
}

SprintService.prototype.addTask = BaseService.addEntity("tasks");
SprintService.prototype.deleteTask = BaseService.deleteEntity("tasks");

module.exports = new SprintService();
