const BaseService = require("./base-service");
const UserModel = require("../models/user");

class UserService extends BaseService {
  constructor() {
    super(UserModel, `${__dirname}/../data/user-database.json`);
  }
}

module.exports = new UserService();
