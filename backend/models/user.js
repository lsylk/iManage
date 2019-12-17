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
  projects: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Project",
      autopopulate: {
        maxDepth: 2
      }
    }
  ],
  tasks: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
      autopopulate: {
        maxDepth: 2
      }
    }
  ]
});

UserSchema.plugin(require("mongoose-autopopulate"));

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;