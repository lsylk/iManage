import test from "ava";
import request from "supertest";
import app from "../app";

const userToCreate = {
  name: "John",
  surname: "Doe",
  position: "full stack developer",
  projects: [],
  tasksl: []
};

const taskToCreate = {
  description: "Create Tests for Routes",
  type: "feature",
  notes: [],
  comments: [],
  users: [],
  status: "to do"
};

test("Fetch task by id", async t => {
  t.plan(8);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  t.is(user.tasks.length, 0);

  const task = (
    await request(app)
      .post(`/user/${user._id}/task`)
      .send(taskToCreate)
  ).body;
  const res = await request(app).get(`/task/${task._id}`);

  t.is(res.status, 200);
  t.is(res.body.description, task.description);
  t.is(res.body.type, task.type);
  t.true(res.body.notes.length === 0);
  t.true(res.body.comments.length === 0);
  t.true(res.body.users.length === 0);
  t.is(res.body.status, task.status);
});

test("Update task", async t => {
  t.plan(3);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  t.is(user.tasks.length, 0);

  const task = (
    await request(app)
      .post(`/user/${user._id}/task`)
      .send(taskToCreate)
  ).body;
  const updatedTask = { description: "Fix Tests for User Routes" };
  const res = await request(app)
    .put(`/task/${task._id}`)
    .send(updatedTask);

  t.is(res.status, 200);
  t.is(res.body.name, updatedTask.name);
});
