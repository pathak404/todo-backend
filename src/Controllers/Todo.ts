import { SendResponse, TodoDocument } from "../types"
import { Request } from "express"
import Todo from "../Models/Todo"
import mongoose from "mongoose"

export const addTodo = (req: Request, res: SendResponse) => {
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        desc: req.body.desc,
    })

    todo.save()
    .then((data: TodoDocument) => {
        res.sendResponse({message: "Todo added successfully", id: data._id}, 201)
    })
    .catch((err: Error) => {
        res.sendResponse({message: err}, 501)
    })
}


export const updateTodo = async (req: Request, res: SendResponse) => {
    const isTodo = await Todo.findOne({_id: req.body._id})
    if(isTodo){
        isTodo.desc = req.body.desc;
        isTodo.modifiedAt = new Date()

        isTodo.save()
        .then((data: TodoDocument) => {
            res.sendResponse({message: "Todo updated successfully", id: data._id})
        })
        .catch((err: Error) => {
            res.sendResponse({message: err}, 501)
        })
    }else{
        res.sendResponse({message: "Todo not available"}, 401)
    }
}


export const deleteTodo =  async (req: Request, res: SendResponse) => {
    const isTodo = await Todo.findOne({_id: req.body._id})
    if(isTodo){
        Todo.deleteOne({_id: isTodo._id})
        .then(() => {
            res.sendResponse({message: "Todo deleted successfully"})
        })
        .catch((err: Error) => {
            res.sendResponse({message: err}, 501)
        })
    }else{
        res.sendResponse({message: "Todo not available"}, 401)
    }
}


export const fetchAllTodos = async (req: Request, res: SendResponse) => {
    const todos = await Todo.find({ userId: req.body.userId})
    if(todos.length > 0){
        res.sendResponse({message: "Todo fetched successfully", todos})
    }else{
        res.sendResponse({message: "Todo not available"}, 401)
    }
}

