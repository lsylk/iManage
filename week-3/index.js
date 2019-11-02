const User = require("./models/user");
const Project = require("./models/project");
const Backlog = require("./models/backlog");
const Task = require("./models/task");
const TaskService = require("./services/task-service");

async function main() {
  User.counter = 0;
  Project.counter = 0;
  Task.counter = 0;
  const task1 = new Task("Create Classes and Methods", "feature");
  const task2 = new Task("Separate Classes into different files", "feature");
  const task3 = new Task("Review Classes", "review");

  const taskTrackerBacklog = new Backlog([task1, task2, task3]);
  const taskTracker = new Project("Task Tracker", taskTrackerBacklog);

  const marco = new User("marco", "smith", "developer", [task1], [taskTracker]);

//   marco.addTask(task2);
//   marco.addTask(task3);
//   console.log(marco);

//   try {
//     await TaskService.add(task1);
//   } catch (err) {
//     console.log(err, "error");
//   }

  const tasks = await TaskService.findAll();
  console.log(tasks);

//   await TaskService.saveAll([task1, task2, task3]);
}

main();


let myPromise = new Promise( (resolve, reject) => {
    setTimeout( () => resolve("Hello sometime later"), 2000);
  }).then(data => console.log(data))