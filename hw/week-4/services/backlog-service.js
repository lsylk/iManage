const BaseService = require("./base-service");
const BacklogModel = require("../models/backlog");

class BacklogService extends BaseService {
  constructor() {
    super(BacklogModel, `${__dirname}/../data/backlog-database.json`);
  }
}

module.exports = new BacklogService();
