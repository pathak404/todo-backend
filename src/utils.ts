import {Request, NextFunction} from "express"
import {SendResponse} from "./types"

export const sendResponseMiddleware = (req: Request, res: SendResponse, next: NextFunction) => {
    res.sendResponse = (data: Object, statusCode: number = 200): void => {
        res.status(statusCode).json({
            status: statusCode >= 200 && statusCode <= 299 ? true : false,
            ...data
        })
    }
    next()
}
