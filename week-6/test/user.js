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

// test("Fetch all projects from user", async t => {
//   t.plan(2);
//   const user = (
//     await request(app)
//       .post("/user")
//       .send(userToCreate)
//   ).body;
//   const res = await request(app).get(`/user/${user._id}/projects/all`);

//   t.is(res.status, 200);
//   t.deepEqual(res.body.projects, user.projects);
// });

// test("Fetch all tasks from user", async t => {
//     t.plan(2);
//     const user = (
//       await request(app)
//         .post("/user")
//         .send(userToCreate)
//     ).body;
//     const res = await request(app).get(`/user/${user._id}/projects/all`);

//     t.is(res.status, 200);
//     t.deepEqual(res.body.projects, user.projects);
//   });

// test("Create new user", async t => {
//   t.plan(6);
//   const res = await request(app)
//     .post("/user")
//     .send(userToCreate);

//   t.is(res.status, 200);
//   t.is(res.body.name, userToCreate.name);
//   t.is(res.body.surname, userToCreate.surname);
//   t.is(res.body.position, userToCreate.position);
//   t.true(res.body.projects.length === 0);
//   t.true(res.body.tasks.length === 0);
// });

// test("Create new task for user", async t => {
//     t.plan(6);
//     const res = await request(app)
//       .post("/user")
//       .send(userToCreate);

//     t.is(res.status, 200);
//   });

//   test("Update user", async t => {
//     t.plan(6);
//     const res = await request(app)
//       .post("/user")
//       .send(userToCreate);

//     t.is(res.status, 200);
//   });

//   test("Delete user", async t => {
//     t.plan(6);
//     const res = await request(app)
//       .post("/user")
//       .send(userToCreate);

//     t.is(res.status, 200);
//   });

//   test("Delete task from user", async t => {
//     t.plan(6);
//     const res = await request(app)
//       .post("/user")
//       .send(userToCreate);

//     t.is(res.status, 200);
//   });
