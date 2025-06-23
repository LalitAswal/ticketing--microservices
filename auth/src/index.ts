import express from 'express';
import { json } from 'body-parser';

// routes
import {currentUserRoute} from "../src/routes/currentUser";
import { signInRoute } from './routes/signIn';
import { signUpRoute } from './routes/signup';
import { signOutRoutes } from './routes/signOut';


//middlewares
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json())

// middleware 
app.use(errorHandler)

// routes
app.use(signUpRoute)
app.use(signInRoute)
app.use(currentUserRoute)
app.use(signOutRoutes)


app.listen(3000,()=>{
    console.log(`port is Listen at 3000!!!!!!!`)
})