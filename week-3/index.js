const User = require("./models/user");
const Project = require("./models/project");
const Backlog = require("./models/backlog");
const Task = require("./models/task");
const UserService = require("./services/user-service");
const ProjectService = require("./services/project-service");
const BacklogService = require("./services/backlog-service");
const SprintService = require("./services/sprint-service");
const TaskService = require("./services/task-service");

async function main() {
  const task1 = new Task("Create Classes and Methods", "feature");
  const task2 = new Task("Separate Classes into different files", "feature");
  const task3 = new Task("Review Classes", "review");

  const taskTrackerBacklog = new Backlog([task1, task2, task3]);
  const taskTracker = new Project("Task Tracker", taskTrackerBacklog);

  const marco = new User("marco", "smith", "developer", [task1], [taskTracker]);
  const susan = new User("susan", "lam", "developer", [task2], [taskTracker]);

  marco.addTask(task2);
  marco.addTask(task3);
  // console.log(marco);

  // try {
  //   await TaskService.add(task1);
  //   await TaskService.add(task2);
  //   await TaskService.add(task3);
  //   await UserService.add(marco);
  //   await UserService.add(susan);
  //   await ProjectService.add(taskTracker);
  // } catch (err) {
  //   console.log(err, "error");
  // }
  // await UserService.saveAll([marco, susan]);
  // await ProjectService.saveAll([taskTracker]);
  // await TaskService.saveAll([task1, task2, task3]);

  // const tasks = await TaskService.findAll();
  // const users = await UserService.findAll();
  // const projects = await ProjectService.findAll();
  // console.log(tasks, users, projects);
}

main();