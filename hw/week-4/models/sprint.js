const Backlog = require("./backlog");

module.exports = class Sprint extends Backlog {
  constructor(deadline, tasks) {
    this.deadline = deadline;
    this.tasks = tasks;
  }

  updateDeadline(deadline) {
    this.deadline = deadline;
  }

  static create({ deadline, tasks }) {
    return new Sprint(deadline, tasks);
  }
};
