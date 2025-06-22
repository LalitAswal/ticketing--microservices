import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";

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
          res.status(400).send(errors.array())
      }
      console.log('userSign UP')
  
      res.status(201).send({})
  
  
    }
);

export { router as signUpRoute };
