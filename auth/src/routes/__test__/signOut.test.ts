import request, {Response} from "supertest";
import { app } from "../../app";

it("clear cookie after signOut", async () => {
   await request(app)
    .post("/api/user/signUp")
    .send({
      email: "test23@gmail.com",
      password: "password",
    })
    .expect(201);

     const response:Response = await request(app)
    .post("/api/user/signOut")
    .send({})
    .expect(200);

    console.log(response.get("Set-Cookie"))
    const setCookie = response.get("Set-Cookie");
    expect(setCookie && setCookie[0]).toEqual(
         'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
});