module.exports = class Task {
  constructor(
    description,
    type = "",
    notes = "",
    comments = [],
    users = [],
    status = "new"
  ) {
    this.id = Task.counter++;
    this.description = description;
    this.status = status;
    this.notes = notes;
    this.comments = comments;
    this.users = users;
    this.type = type;
  }
  static counter = 0;
};
