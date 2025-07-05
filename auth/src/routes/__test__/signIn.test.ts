import request, {Response} from "supertest";
import { app } from "../../app";

it("fails when an email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/user/signIn")
    .send({
      email: "test23@gmail.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/user/signUp")
    .send({
      email: "testing1@gmail.com",
      password: "123461233333",
    })
    .expect(201);

  await request(app)
    .post("/api/user/signIn")
    .send({
      email: "testing1@gmail.com",
      password: "12346123333333333",
    })
    .expect(400);
});

it("response with a cookie when provided valid credential", async()=>{
    const response:Response = await request(app)
    .post("/api/user/signUp")
    .send({
        email: "testing2@gmail.com",
      password: "12346",
    })
    .expect(201)

   expect(response.get("set-cookie")).toBeDefined();

});
