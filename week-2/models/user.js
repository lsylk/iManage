module.exports = class User {
  constructor(name, surname, position, tasks = [], projects = []) {
    this.id = User.counter++;
    this.name = name;
    this.surname = surname;
    this.position = position;
    this.projects = projects;
    this.tasks = tasks;
  }
  static counter = 0;


  addTask(task) {
    this.task.add(task);
  }

  updateTask(task) {
    this.tasks.forEach(existingTask => {
      if (existingTask.id === task.id) {
        existingTask = task;
      }
    });
  }

  deleteTask(task) {
    this.tasks.forEach(existingTask => {
      if (existingTask.id === task.id) {
        this.tasks.delete(task);
      }
    });
  }

  addProject(project) {
    this.projects.add(project);
  }

  updateProject(project) {
    this.projects.forEach(existingProjects => {
      if (existingProjects.id === project.id) {
        existingProjects = project;
      }
    });
  }

  deleteProject(project) {
    this.projects.forEach(existingProjects => {
      if (existingProjects.id === project.id) {
        this.projects.delete(project);
      }
    });
  }
};
