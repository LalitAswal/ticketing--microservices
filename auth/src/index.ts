import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";


// routes
import { currentUserRoute } from "../src/routes/currentUser";
import { signInRoute } from "./routes/signIn";
import { signUpRoute } from "./routes/signup";
import { signOutRoutes } from "./routes/signOut";

//middlewares
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:true
}))

// middleware

// routes
app.use(signUpRoute);
app.use(signInRoute);
app.use(currentUserRoute);
app.use(signOutRoutes);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

// mongodb connection

const startMongodb = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log('Mongodb connected')
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log(`port is Listen at 3000!!!!!!!`);
});

startMongodb()
