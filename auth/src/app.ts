import express from "express";
import { json } from "body-parser";
import "express-async-errors";
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
  secure:process.env.NODE_ENV !== "test"
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

export {app}