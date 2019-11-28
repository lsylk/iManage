const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  surname: {
    type: String,
    required: true,
    minlength: 2
  },
  position: {
    type: String,
    required: true,
    minlength: 2
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  projects: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Project",
      autopopulate: {
        maxDepth: 1
      }
    }
  ],
  tasks: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
      autopopulate: {
        maxDepth: 1
      }
    }
  ]
});

// UserSchema.methods.findPeersOver18 = function(cb) {
//   return PersonModel.find({
//     age: {
//       $gte: 18
//     }
//   });
// };

UserSchema.plugin(require("mongoose-autopopulate"));

const UserModel = mongoose.model("Person", UserSchema);

module.exports = UserModel;

// module.exports = class User {
//   constructor(name, surname, position, tasks = [], projects = [], id = undefined) {
//     this.name = name;
//     this.surname = surname;
//     this.position = position;
//     this.projects = projects;
//     this.tasks = tasks;
//     this.id = id || User.counter++;
//   }
//   static counter = 0;

//   addTask(task) {
//     this.tasks.push(task);
//     task.users.push(this);
//   }

//   updateTask(task) {
//     this.tasks.forEach(existingTask => {
//       if (existingTask.id === task.id) {
//         existingTask = task;
//       }
//     });
//   }

//   deleteTask(task) {
//     this.tasks = this.tasks.filter(existingTask => existingTask.id !== task.id);
//   }

//   addProject(project) {
//     this.projects.add(project);
//   }

//   updateProject(project) {
//     this.projects = this.projects.forEach(existingProjects => {
//       if (existingProjects.id === project.id) {
//         existingProjects = project;
//       }
//     });
//   }

//   deleteProject(project) {
//     this.projects = this.projects.filter(
//       existingProject => existingProject.id !== project.id
//     );
//   }

//   static create({ name, surname, position, tasks, projects, id}) {
//     return new User(name, surname, position, tasks, projects, id);
//   }
// };
