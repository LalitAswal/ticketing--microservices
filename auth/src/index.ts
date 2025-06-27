import express from "express";
import { json } from "body-parser";
import "express-async-errors";

// routes
import { currentUserRoute } from "../src/routes/currentUser";
import { signInRoute } from "./routes/signIn";
import { signUpRoute } from "./routes/signup";
import { signOutRoutes } from "./routes/signOut";

//middlewares
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

// middleware

// routes
app.use(signUpRoute);
app.use(signInRoute);
app.use(currentUserRoute);
app.use(signOutRoutes);
app.all("*", async() => {
  throw new NotFoundError();
});
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`port is Listen at 3000!!!!!!!`);
});
