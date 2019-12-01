const BaseService = require("./base-service");
const ProjectModel = require("../models/project");

class ProjectService extends BaseService {
  model = ProjectModel;

  async cleanBacklog(project) {
    project.backlog = [];
    return project.save();
  }
}

ProjectService.prototype.addUser = BaseService.addEntity("users");
ProjectService.prototype.deleteUser = BaseService.deleteEntity("users");

ProjectService.prototype.addSprint = BaseService.addEntity("sprints");
ProjectService.prototype.deleteSprint = BaseService.deleteEntity("sprints");

module.exports = new ProjectService();
