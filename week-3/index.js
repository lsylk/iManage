const User = require("./models/user");
const Project = require("./models/project");
const Backlog = require("./models/backlog");
const Task = require("./models/task");
const TaskService = require("./services/task-service");

async function main() {
//   const task1 = new Task("Create Classes and Methods", "feature");
//   const task2 = new Task("Separate Classes into different files", "feature");
//   const task3 = new Task("Review Classes", "review");

//   const taskTrackerBacklog = new Backlog([task1, task2, task3]);
//   const taskTracker = new Project("Task Tracker", taskTrackerBacklog);

//   const marco = new User("marco", "smith", "developer", [task1], [taskTracker]);

//   marco.addTask(task2);
//   marco.addTask(task3);
//   console.log(marco);

//   try {
//     await TaskService.add(task1);
//   } catch (err) {
//     console.log(err, "error");
//   }
//   await TaskService.saveAll([task1, task2, task3]);

  const tasks = await TaskService.findAll();
  console.log(tasks);

}

main();