import request, { Response } from "supertest";
import { app } from "../../app";
import { cookie } from "express-validator";

it("return 201 on successful signup", async () => {
  return request(app)
    .post("/api/user/signUp")
    .send({
      email: "test1121212@gmail.com",
      password: "123461233333",
    })
    .expect(201);
});

it("return a 400  with invalid email", async () => {
  return request(app)
    .post("/api/user/signUp")
    .send({
      email: "test1121212gmail.com",
      password: "123461233333",
    })
    .expect(400);
});

it("disallow  duplicate email", async () => {
  await request(app)
    .post("/api/user/signUp")
    .send({
      email: "test1121212@gmail.com",
      password: "123461233333",
    })
    .expect(201);

  await request(app)
    .post("/api/user/signUp")
    .send({
      email: "test1121212@gmail.com",
      password: "123461233333",
    })
    .expect(400);
});

it("sets a cookie after successfully signup", async () => {
  const response: Response = await request(app)
    .post("/api/user/signUp")
    .send({
      email: "test1121212@gmail.com",
      password: "123461233333",
    })
    .expect(201);

  expect(response.get("set-cookie")).toBeDefined();
});
