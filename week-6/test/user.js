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

const projectToCreate = {
  name: "Project Management Tool",
  users: [],
  backlog: [],
  sprints: []
};

const taskToCreate = {
  description: "Create Tests for Routes",
  type: "feature",
  notes: [],
  comments: [],
  users: [],
  status: "to do"
};

const taskToCreate2 = {
  description: "Modity routes",
  type: "feature",
  notes: [],
  comments: [],
  users: [],
  status: "to do"
};

test("Fetch user by id", async t => {
  t.plan(2);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  const res = await request(app).get(`/user/${user._id}`);

  t.is(res.status, 200);
  t.deepEqual(res.body, user);
});

test("Fetch all users", async t => {
  t.plan(3);
  const user = await request(app)
    .post("/user")
    .send(userToCreate);
  const users = await request(app).get("/user/show/all");

  t.is(users.status, 200);
  t.true(Array.isArray(users.body));
  t.true(users.body.length > 0);
});

test("Fetch all projects from user", async t => {
  t.plan(2);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;

  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const addedProj = await request(app)
    .post(`/user/${user._id}/project/${project._id}`)
    .send();
  const res = await request(app).get(`/user/${user._id}/projects/all`);

  t.is(res.status, 200);
  t.is(res.body.length, 1);
});

test("Fetch all tasks from user", async t => {
  t.plan(3);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  t.is(user.tasks.length, 0);

  const task1 = await request(app)
    .post(`/user/${user._id}/task`)
    .send(taskToCreate);
  const task2 = await request(app)
    .post(`/user/${user._id}/task`)
    .send(taskToCreate2);

  const res = await request(app).get(`/user/${user._id}/tasks/all`);

  t.is(res.status, 200);
  t.is(res.body.length, 2);
});

test("Create new user", async t => {
  t.plan(6);
  const res = await request(app)
    .post("/user")
    .send(userToCreate);

  t.is(res.status, 200);
  t.is(res.body.name, userToCreate.name);
  t.is(res.body.surname, userToCreate.surname);
  t.is(res.body.position, userToCreate.position);
  t.true(res.body.projects.length === 0);
  t.true(res.body.tasks.length === 0);
});

test("Create new task for user", async t => {
  t.plan(8);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  const task = await request(app)
    .post(`/user/${user._id}/task`)
    .send(taskToCreate);
  const getUser = await request(app).get(`/user/${user._id}`);
  t.is(getUser.status, 200);
  t.is(getUser.body.tasks.length, 1);
  t.is(getUser.body.tasks[0].description, taskToCreate.description);
  t.is(getUser.body.tasks[0].feature, taskToCreate.feature);
  t.is(getUser.body.tasks[0].notes.length, 0);
  t.is(getUser.body.tasks[0].comments.length, 0);
  t.is(getUser.body.tasks[0].users.length, 0);
  t.is(getUser.body.tasks[0].todo, taskToCreate.todo);
});

test("Update user", async t => {
  t.plan(2);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  const updatedUser = { position: "Artist Coder" };

  const res = await request(app)
    .put(`/user/${user._id}`)
    .send(updatedUser);
  t.is(res.status, 200);
  t.is(res.body.position, updatedUser.position);
});

test("Delete user", async t => {
  t.plan(3);
  const user = await request(app)
    .post("/user")
    .send(userToCreate);
  t.is(user.status, 200);

  const deleteUser = await request(app).delete(`/user/${user.body._id}`);
  t.is(deleteUser.status, 200);
  const findUser = await request(app).get(`/user/${user.body._id}`);
  t.is(findUser.status, 404);
});

test("Delete task from user", async t => {
  t.plan(5);
  const user = (
    await request(app)
      .post("/user")
      .send(userToCreate)
  ).body;
  const task = (
    await request(app)
      .post(`/user/${user._id}/task`)
      .send(taskToCreate)
  ).body;

  const getUser1 = await request(app).get(`/user/${user._id}`);

  t.is(getUser1.status, 200);
  t.is(getUser1.body.tasks.length, 1);

  const deleteTask = await request(app).delete(
    `/user/${user._id}/task/${task._id}`
  );
  t.is(deleteTask.status, 200);

  const getUser2 = await request(app).get(`/user/${user._id}`);
  t.is(getUser2.status, 200);
  t.is(getUser2.body.tasks.length, 0);
});
