// // import test from "ava";
// // import request from "supertest";
// // import app from "../app";

// test("Update sprint", async t => {
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

//   test("Delete sprint", async t => {
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


//   test("Add task to sprint", async t => {
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

//   test("Delete task from sprint", async t => {
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