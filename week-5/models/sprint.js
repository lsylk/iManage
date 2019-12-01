const mongoose = require("mongoose");

const SprintSchema = new mongoose.Schema({
  deadline: { type: Date, required: true },
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

SprintSchema.plugin(require("mongoose-autopopulate"));

const SprintModel = mongoose.model("Sprint", SprintSchema);

module.exports = SprintModel;
