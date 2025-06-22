import express, {Request, Response} from "express";
import { param, validationResult } from "express-validator";


const router = express.Router();

router.post("/api/user/signOUt", 
    param("_id").isMongoId().withMessage("userId must be valid"),
    (req:Request, res: Response) => {
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            res.status(400).send(errors.array())
        }
        console.log('userSign Out')
    
        res.status(201).send({})
    
    
      }


);

export { router as signOutRoutes };
