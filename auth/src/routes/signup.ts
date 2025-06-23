import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";


const router = express.Router();

router.post(
  "/api/user/signUp",
  body("email").isEmail().withMessage("email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be valid"),
  (req:Request, res: Response) => {
      const errors = validationResult(req);
  
      if(!errors.isEmpty()){

        throw new RequestValidationError(errors.array())
        //   res.status(400).send(errors.array())
      }
      console.log('userSign UP')

      // database error check 
      throw new DatabaseConnectionError()
  
      res.status(201).send({})
  
  
    }
);

export { router as signUpRoute };
