const BaseService = require("./base-service");
const ProjectModel = require("../models/project");

class ProjectService extends BaseService {
  constructor() {
    super(ProjectModel, `${__dirname}/../data/project-database.json`);
  }
}

module.exports = new ProjectService();
