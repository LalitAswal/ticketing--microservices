import request, {Response} from "supertest";
import { app } from "../../app";

declare global {
  var signIn: () => Promise<string[]>;
}

it("response with details about the current user", async () => {
  const cookie = await globalThis.signIn();


  const response= await request(app)
    .get("/api/user/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

    console.log(response.body)
    expect(response.body.currentUser.email).toEqual("test@gmail.com")
});