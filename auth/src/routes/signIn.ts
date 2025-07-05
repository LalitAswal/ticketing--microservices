import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import  jwt  from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/user/signIn",
  body("email").isEmail().withMessage("email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be valid"),

  async(req:Request, res: Response) => {
    const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            res.status(400).send(errors.array())
        }

    const {email, password} = req.body;

    const emailExist = await User.findOne({email});

    if(!emailExist){
        throw new BadRequestError('Invalid Email');
    }

    const passwordMatch = await Password.compare(emailExist.password , password);
    if(!passwordMatch){
      throw new BadRequestError("Invalid credential")
    }

    const userJwt = jwt.sign({
          id: emailExist.id,
          email: emailExist.email
        },
        process.env.JWT_KEY || "PracticeKaroYaro"
      )
    
      req.session = {
       jwt: userJwt 
      
      }


    res.status(201).send({userJwt})


  }
);

export { router as signInRoute };
