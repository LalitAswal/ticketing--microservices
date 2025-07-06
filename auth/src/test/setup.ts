import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request, { Response } from "supertest";
import { app } from "../app";

let mongo: any;

declare global {
  namespace NodeJS  {
    interface Global{
      signIn(): Promise<string[]>
    }
  }
}

beforeAll(async () => {
  process.env.JWT_KEY = "PracticeKaroYaro";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // mongo = new MongoMemoryServer();
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections: any = await mongoose.connection.db?.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

(globalThis as any).signIn = async () => {
  const email = "test@gmail.com";
  const password = "password@123";

  const response: Response = await request(app).post("/api/user/signUp").send({
    email,
    password,
  }).expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};

