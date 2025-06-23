import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {


    if(err instanceof RequestValidationError){
        // console.log(`request Validation Error`)

        const formattedErrors = err.errors.map(error =>{
            return {
                message: error.msg, field: error.param ?? ""
            }
        })
        return  res.status(400).send({error: formattedErrors})
    }

    if(err instanceof DatabaseConnectionError){
        // console.log('database error validator')

        return  res.status(400).send({error: [{message: err.reason}]})

    }

    return res
      .status(400)
      .send({ error: [{ message: "something went Wrong" }] });
};
