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

/*
    NOTE: 
    when getting [ [Object], [Object], [Object] ]
    use JSON.stringify to be able to see the deeply nested objects in the console.
 */
console.log(JSON.stringify(loadedUser, null, 2));
console.log(JSON.stringify(loadedTaskTracker, null, 2));
