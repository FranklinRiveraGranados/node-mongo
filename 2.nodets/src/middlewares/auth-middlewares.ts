import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
    try{

        const { token } = req.headers

        if(!token){
            throw new Error("missing header token")
        }

        jwt.verify(token as string, process.env.JWT_SECRET!)
        next() //importante para que siga con el flujo


    }catch(e: any){
        res.status(401).send(e.message)
    }
}