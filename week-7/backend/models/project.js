const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // description: {
  //   type: String,
  //   required: false
  // },
  users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      autopopulate: {
        maxDepth: 1
      }
    }
  ],
  backlog: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Backlog",
    autopopulate: {
      maxDepth: 4
    }
  },
  sprints: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Sprint",
      autopopulate: {
        maxDepth: 4
      }
    }
  ]
});

ProjectSchema.plugin(require("mongoose-autopopulate"));

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
