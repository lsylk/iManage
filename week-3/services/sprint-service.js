const BaseService = require("./base-service");
const SprintModel = require("../models/sprint");

class SprintService extends BaseService {
  constructor() {
    super(SprintModel, `${__dirname}/../data/sprint-database.json`);
  }
}

module.exports = new SprintService();
