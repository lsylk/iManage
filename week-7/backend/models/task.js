const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  notes: [
    {
      type: String
    }
  ],
  comments: [
    {
      type: String
    }
  ],
  users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      autopopulate: {
        maxDepth: 1
      }
    }
  ],
  status: {
    type: String
  }
});

TaskSchema.plugin(require("mongoose-autopopulate"));

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
