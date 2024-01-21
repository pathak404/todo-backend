import {Response} from "express"
import {Document} from "mongoose"

export interface SendResponse extends Response {
    sendResponse(data: Object, statusCode: number): void
}

export interface TodoDocument extends Document {
    userId: string,
    desc: string,
    createdAt: Date,
    modifiedAt: Date
}

export interface UserDocument extends Document {
    userId: string,
    email: string,
    password: string,
    createdAt: Date,
    createUserId(): void,
    setPassword(password: string): void,
    verifyPassword(password: string): boolean
}