import express from 'express';
import { json } from 'body-parser';
import {currentUserRoute} from "../src/routes/currentUser";
import { signInRoute } from './routes/signIn';
import { signUpRoute } from './routes/signup';
import { signOutRoutes } from './routes/signOut';
const app = express();
app.use(json())

app.use(signUpRoute)
app.use(signInRoute)
app.use(currentUserRoute)
app.use(signOutRoutes)


app.listen(3000,()=>{
    console.log(`port is Listen at 3000!!!!!!!`)
})