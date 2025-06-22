import express, {Request,  Response} from "express";
import { param, validationResult } from "express-validator";

const router = express.Router();

router.get(
  "/api/user/currentUser",
  param("_id").isMongoId().withMessage("userId must be valid"),    
      (req:Request, res: Response) => {
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            res.status(400).send(errors.array())
        }
        console.log('currentUser')
    
        res.status(200).send({})
    
    
  }
);

export { router as currentUserRoute };
