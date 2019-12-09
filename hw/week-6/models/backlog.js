const mongoose = require("mongoose");

const BacklogSchema = new mongoose.Schema({

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

BacklogSchema.plugin(require("mongoose-autopopulate"));

const BacklogModel = mongoose.model("Backlog", BacklogSchema);

module.exports = BacklogModel;
