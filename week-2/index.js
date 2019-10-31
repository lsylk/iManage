/*
//REQUIRED Models for the instantiation
    const User = require("./models/user");
    const Project = require("./models/project");
    const Backlog = require("./models/backlog");
    const Task = require("./models/task");
*/

const Database = require("./database");

/*
// INSTANTIATED a User, Tasks, Backlog and User 
    User.counter = 0;
    Project.counter = 0;
    Task.counter = 0;

    task1 = new Task("Create Classes and Methods", "feature");
    task2 = new Task("Separate Classes into different files", "feature");
    task3 = new Task("Review Classes", "review");

    taskTrackerBacklog = new Backlog([task1, task2, task3]);
    taskTracker = new Project("Task Tracker", taskTrackerBacklog);

    marco = new User("marco", "smith", "developer", [task1, task2], [taskTracker]);
*/

/*
//SAVE instances into files
    Database.save('data/user.json', marco);
    Database.save('data/taskTracker.json', taskTracker);
*/

/*
// LOAD data files
*/
const loadedUser = Database.load('data/user.json');
const loadedTaskTracker = Database.load('data/taskTracker.json');

console.log(loadedUser.projects.backlog);
console.log(loadedTaskTracker.tasks);