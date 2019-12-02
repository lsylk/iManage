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

const taskToCreate2 = {
  description: "Modity routes",
  type: "feature",
  notes: [],
  comments: [],
  users: [],
  status: "to do"
};

test("Fetch project by id", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const res = await request(app).get(`/project/${project._id}`);

  t.is(res.status, 200);
  t.deepEqual(res.body, project);
});

test("Fetch all projects", async t => {
  t.plan(3);
  const project = await request(app)
    .post("/project")
    .send(projectToCreate);
  const projects = await request(app).get("/project/show/all");

  t.is(projects.status, 200);
  t.true(Array.isArray(projects.body));
  t.true(projects.body.length > 0);
});

test("Create new project", async t => {
  t.plan(5);
  const res = await request(app)
    .post("/project")
    .send(projectToCreate);

  t.is(res.status, 200);
  t.is(res.body.name, projectToCreate.name);
  t.true(res.body.users.length === 0);
  t.true(res.body.backlog.tasks.length === 0);
  t.true(res.body.sprints.length === 0);
});

test("Create new sprint for a project", async t => {
  t.plan(4);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const sprint = await request(app)
    .post(`/project/${project._id}/sprint`)
    .send(sprintToCreate);
    
  t.is(sprint.status, 200);
  t.is(sprint.body.name, sprintToCreate.name);
  t.is(sprint.body.deadline, sprintToCreate.deadline.toISOString());
  t.true(sprint.body.tasks.length === 0);
});

test("Add a task in project's backlog", async t => {
  t.plan(7);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const task = await request(app)
    .post(`/project/${project._id}/backlog/task`)
    .send(taskToCreate);

  t.is(task.status, 200);
  t.is(task.body.description, taskToCreate.description);
  t.is(task.body.type, taskToCreate.type);
  t.true(task.body.notes.length === 0);
  t.true(task.body.comments.length === 0);
  t.true(task.body.users.length === 0);
  t.is(task.body.status, taskToCreate.status);
});

test("Update project", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const updatedProject = { name: "Project Management Tool 2.0" };
  const res = await request(app)
    .put(`/project/${project._id}`)
    .send(updatedProject);

  t.is(res.status, 200);
  t.is(res.body.name, updatedProject.name);
});

test("Delete project", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const res = await request(app).delete(`/project/${project._id}`);

  t.is(res.status, 200);
  const findProject = await request(app).get(`/project/${project._id}`);
  t.is(findProject.status, 404);
});

test("Clear project's backlog", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const task = await request(app)
    .post(`/project/${project._id}/backlog/task`)
    .send(taskToCreate);
  const cleanBacklog = await request(app)
    .delete(`/project/${project._id}/backlog`)
    .send(project);

  t.is(cleanBacklog.status, 200);
  t.true(project.backlog.tasks.length === 0);
});

test("Delete task from project's backlog", async t => {
  t.plan(2);
  const project = (
    await request(app)
      .post("/project")
      .send(projectToCreate)
  ).body;
  const task1 = await request(app)
    .post(`/project/${project._id}/backlog/task`)
    .send(taskToCreate);
  const task2 = await request(app)
    .post(`/project/${project._id}/backlog/task`)
    .send(taskToCreate2);
  const deleteTask2 = await request(app).delete(
    `/project/${project._id}/backlog/task/${task2._id}`
  );
  const getTask2 = await request(app).get(`/task/${task2._id}`);

  t.is(deleteTask2.status, 200);
  t.is(getTask2.status, 404);
});
