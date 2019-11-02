module.exports = class Project {
  constructor(name, backlog = [], sprints = [], id = undefined) {
    this.name = name;
    this.backlog = backlog;
    this.sprints = sprints;
    this.id = id || Project.counter++;
  }

  static counter = 0;

  static create({ name, backlog, sprints, id }) {
    return new Project(name, backlog, sprints, id);
  }
};
