/*
    CLASS RELATIONSHIPS

    - Users have tasks and projects.
    - A Project has a backlog and multiple sprints.
    - A Backlog has tasks.
    - A Sprint has tasks.
*/

class User {
  constructor(id, name, surname, position, tasks = [], projects = []) {
    this.id = id;
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
  constructor(id, name, backlog = [], sprints = []) {
    this.id = id;
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
    id,
    description,
    type = "",
    notes = "",
    comments = [],
    users = [],
    status = "new"
  ) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.notes = notes;
    this.comments = comments;
    this.users = users;
    this.type = type;
  }
}

task1 = new Task(1, "Create Classes and Methods", "feature");
task2 = new Task(2, "Separate Classes into different files", "feature");
task3 = new Task(3, "Review Classes", "review");

taskTrackerBacklog = new Backlog([task1, task2, task3])
taskTracker = new Project(1, "Task Tracker", taskTrackerBacklog);

marco = new User(1, "marco", "smith", "developer", [task1, task2], [taskTracker]);

// console.log(task1);
// console.log(task2);
// console.log(task3);
// console.log(taskTracker);
// console.log(marco.projects[0].backlog);
