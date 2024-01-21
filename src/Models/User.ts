import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import { UserDocument } from "../types"


const userModel: Schema<UserDocument> = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
    },
    email:{
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
})

userModel.methods.createUserId = function(this: UserDocument): void{
    this.userId = 'user_'+(new Date().getTime()).toString(36)
}

userModel.methods.setPassword = function(this: UserDocument, password: string): void{
    this.password = bcrypt.hashSync(password, 10)
}

userModel.methods.verifyPassword = function(this: UserDocument, password: string): boolean{
    if(!this.password){
        return false;
    }
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model<UserDocument>("Users", userModel)
export default User