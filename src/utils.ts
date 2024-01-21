import {Request, NextFunction} from "express"
import {SendResponse} from "./types"
import jwt, {JwtPayload} from "jsonwebtoken"

export const sendResponseMiddleware = (req: Request, res: SendResponse, next: NextFunction) => {
    res.sendResponse = (data: Object, statusCode: number = 200): void => {
        res.status(statusCode).json({
            status: statusCode >= 200 && statusCode <= 299 ? true : false,
            ...data
        })
    }
    next()
}

export const authMiddleware = (req: Request, res: SendResponse, next: NextFunction) => {
    const authorization: string | undefined = req.get("Authorization")
    if(authorization){
        const token = authorization.split(" ")[1]
        const payload = verifyJWT(token) as { userId: string }
        if(payload){
            req.body.userId = payload.userId
            next()
        }else{
            res.sendResponse({message: "Token expired, Please login again"}, 401)
        }
    }else{
        res.sendResponse({message: "Missing Header Authorization"}, 401)
    }
}

export const generateJWT = (payload: Object, expiresIn: string ="7d"): string => {
    return jwt.sign(payload, process.env.SECRET_KEYPHRASE as string, {
        expiresIn
    })
}

const verifyJWT = (token: string): JwtPayload | string => {
    return jwt.verify(token, process.env.SECRET_KEYPHRASE as string)
}

