import test from "ava";
import request from "supertest";
import app from "../app";

const projectToCreate = {
  name: "Project Management Tool",
  users: [],
  backlog: {},
  sprints: []
};

const sprintToCreate = {
  name: "PM Sprint 1",
  deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  tasks: []
};

const taskToCreate = {
  description: "Create Tests for Routes",
  type: "feature",
  notes: [],
  comments: [],
  users: [],
  status: "to do"
};

test("Update sprint", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const sprint = (
    await request(app)
      .post(`/project/${project._id}/sprint`)
      .send(sprintToCreate)
  ).body;
  const updatedSprint = { name: "PM Sprint 1.1" };
  const res = await request(app)
    .put(`/sprint/${sprint._id}`)
    .send(updatedSprint);

  t.is(res.status, 200);
  t.is(res.body.name, updatedSprint.name);
});

test("Delete sprint", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const sprint = (
    await request(app)
      .post(`/project/${project._id}/sprint`)
      .send(sprintToCreate)
  ).body;
  const res = await request(app).delete(`/sprint/${sprint._id}`);

  t.is(res.status, 200);
  const findSprint = await request(app).get(`/sprint/${sprint._id}`);
  t.is(findSprint.status, 404);
});

test("Add task to sprint", async t => {
  t.plan(7);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const sprint = (
    await request(app)
      .post(`/project/${project._id}/sprint`)
      .send(sprintToCreate)
  ).body;
  const task = await request(app)
    .post(`/sprint/${sprint._id}/task`)
    .send(taskToCreate);

  t.is(task.status, 200);
  t.is(task.body.description, taskToCreate.description);
  t.is(task.body.type, taskToCreate.type);
  t.true(task.body.notes.length === 0);
  t.true(task.body.comments.length === 0);
  t.true(task.body.users.length === 0);
  t.is(task.body.status, taskToCreate.status);
});

test("Delete task from sprint", async t => {
  t.plan(3);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  //sprint has 0 tasks after being created.
  const sprint = (
    await request(app)
      .post(`/project/${project._id}/sprint`)
      .send(sprintToCreate)
  ).body;
  const task = (
    await request(app)
      .post(`/sprint/${sprint._id}/task`)
      .send(taskToCreate)
  ).body;
  const getSprint = (await request(app).get(`/sprint/${sprint._id}`)).body;
  t.is(getSprint.tasks.length, 1);
  const deleteTask = await request(app).delete(
    `/sprint/${sprint._id}/task/${task._id}`
  );
  const getSprint2 = await request(app).get(`/sprint/${sprint._id}`);
  
  t.is(deleteTask.status, 200);
  t.is(getSprint2.body.tasks.length, 0);
});
