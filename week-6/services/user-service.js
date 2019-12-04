const BaseService = require("./base-service");
const UserModel = require("../models/user");

class UserService extends BaseService {
  model = UserModel;
}

UserService.prototype.addTask = BaseService.addEntity("tasks");
UserService.prototype.deleteTask = BaseService.deleteEntity("tasks");

UserService.prototype.addProject = BaseService.addEntity("projects");
UserService.prototype.deleteProject = BaseService.deleteEntity("projects");

module.exports = new UserService();
