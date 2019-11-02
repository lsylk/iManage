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
    this.tasks.push(task);
    task.users.push(this);
  }

  updateTask(task) {
    this.tasks.forEach(existingTask => {
      if (existingTask.id === task.id) {
        existingTask = task;
      }
    });
  }

  deleteTask(task) {
    this.tasks = this.tasks.filter(existingTask => existingTask.id !== task.id);
  }

  addProject(project) {
    this.projects.add(project);
  }

  updateProject(project) {
    this.projects = this.projects.forEach(existingProjects => {
      if (existingProjects.id === project.id) {
        existingProjects = project;
      }
    });
  }

  deleteProject(project) {
    this.projects = this.projects.filter(
      existingProject => existingProject.id !== project.id
    );
  }

  static create({ name, surname, position, tasks, projects }) {
    return new User(name, surname, position, tasks, projects);
  }
};
