import mongoose, {Schema} from "mongoose"
import { TodoDocument } from "../types"

const TodoModel: Schema<TodoDocument> = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    desc: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    modifiedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    }
})

const Todo = mongoose.model<TodoDocument>("Todos", TodoModel)
export default Todo