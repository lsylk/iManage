module.exports = class Project {
  constructor(name, backlog = [], sprints = []) {
    this.id = Project.counter++;
    this.name = name;
    this.backlog = backlog;
    this.sprints = sprints;
  }

  static counter = 0;

  static create({ name, backlog, sprints }) {
    return new Project(name, backlog, sprints);
  }
};
