
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface userPayload {
    id:String;
    email: String;
}

declare global {
    namespace Express{
        interface Request{
            currentUser?: userPayload
        }
    }
}

export const currentUser=(req:Request, res:Response, next:NextFunction)=>{

    if(!req.session?.jwt){
        return next();
    }

    try {
        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as userPayload;
        req.currentUser = payload
    } catch (error) {
        
    }
    next();
}