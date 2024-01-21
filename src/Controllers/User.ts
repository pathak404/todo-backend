import { SendResponse, UserDocument } from "../types"
import { Request } from "express"
import User from "../Models/User"
import mongoose from "mongoose"
import { generateJWT } from "../utils"

export const register = async (req: Request, res: SendResponse) => {
    const isUser = await User.findOne({email: req.body.email})
    if(isUser){
        res.sendResponse({ message: "Account already exist"}, 401)
    }else{
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
        })
        user.createUserId()
        user.setPassword(req.body.password)
        user.save()
        .then((data: UserDocument) => {
            res.sendResponse({message: "Account created successfully", jwt: generateJWT({userId: data.userId})}, 201)
        })
        .catch((err) => res.sendResponse({message: err}, 501))
    }
}

export const login = async (req: Request, res: SendResponse) => {
    const isUser = await User.findOne({email: req.body.email})
    if(isUser && isUser.verifyPassword(req.body.password)){
        res.sendResponse({message: "Login successful", jwt: generateJWT({userId: isUser.userId})})
    }else{
        res.sendResponse({message: "Invalid email or password"}, 401)
    }
}