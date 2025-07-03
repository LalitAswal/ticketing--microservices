import express, {Request, Response} from "express";
import { param, validationResult } from "express-validator";


const router = express.Router();

router.post("/api/user/signOut", 
    (req:Request, res: Response) => {
        req.session = null;
        res.send({})
      }


);

export { router as signOutRoutes };
