module.exports = class Backlog {
  constructor(tasks) {
    this.tasks = tasks;
  }

  add(task) {
    this.tasks.add(task);
  }

  update(task) {
    this.tasks.forEach(existingTask => {
      if (existingTask.id === task.id) {
        existingTask = task;
      }
    });
  }

  delete(task) {
    this.tasks = this.tasks.filter(existingTask => existingTask.id !== task.id);
  }

  static create({ tasks }) {
    return new Backlog(tasks);
  }
};
