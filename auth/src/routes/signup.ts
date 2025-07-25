import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/user/signUp",
  body("email").isEmail().withMessage("email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be valid"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    console.log('isUserExist',isUserExist)
    if (isUserExist) {
      throw new BadRequestError("Email is already in Use");
    }

    const user = User.build({ email, password });
    // database error check
    await user.save()

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY || "PracticeKaroYaro"
  )

  req.session = {
   jwt: userJwt 
  
  }
    res.status(201).send({user});
  }
);

export { router as signUpRoute };
