/*
    CLASS RELATIONSHIPS

    - Users have tasks and projects.
    - A Project has a backlog and multiple sprints.
    - A Backlog has tasks.
    - A Sprint has tasks.
*/

class User {
  constructor(name, surname, position, tasks = [], projects = []) {
    this.id = User.counter++;
    this.name = name;
    this.surname = surname;
    this.position = position;
    this.projects = projects;
    this.tasks = tasks;
  }

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
}

class Project {
  constructor(name, backlog = [], sprints = []) {
    this.id = Project.counter++
    this.name = name;
    this.backlog = backlog;
    this.sprints = sprints;
  }
}

class Backlog {
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
    this.tasks.forEach(existingTask => {
      if (existingTask.id === task.id) {
        this.tasks.delete(task);
      }
    });
  }
}

class Sprint extends Backlog {
  constructor(deadline, tasks) {
    this.deadline = deadline;
    this.tasks = tasks;
  }

  updateDeadline(deadline) {
    this.deadline = deadline;
  }
}

class Task {
  constructor(
    description,
    type = "",
    notes = "",
    comments = [],
    users = [],
    status = "new"
  ) {
    this.id = Task.counter++;
    this.description = description;
    this.status = status;
    this.notes = notes;
    this.comments = comments;
    this.users = users;
    this.type = type;
  }
}

User.counter = 0;
Project.counter = 0;
Task.counter = 0;
task1 = new Task("Create Classes and Methods", "feature");
task2 = new Task("Separate Classes into different files", "feature");
task3 = new Task("Review Classes", "review");

taskTrackerBacklog = new Backlog([task1, task2, task3])
taskTracker = new Project("Task Tracker", taskTrackerBacklog);

marco = new User("marco", "smith", "developer", [task1, task2], [taskTracker]);

// console.log(task1);
// console.log(task2);
// console.log(task3);
// console.log(taskTracker);
// console.log(marco.projects[0].backlog);
