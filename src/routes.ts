import { Router, Request, Response } from "express"
import { SendResponse } from "./types"
import { login, register } from "./Controllers/User"
import { addTodo, deleteTodo, fetchAllTodos, updateTodo } from "./Controllers/Todo"

const router = Router()

router.get("/", (req: Request, res: Response) => {
    (res as SendResponse).sendResponse({ message: "API server is working!" })
})

router.post("/login", (req: Request, res: Response) => {
    login(req, res as SendResponse)
})
router.post("/register", (req: Request, res: Response) => {
    register(req, res as SendResponse)
})


router.get("/todo", (req: Request, res: Response) => {
    fetchAllTodos(req, res as SendResponse)
})

router.post("/todo", (req: Request, res: Response) => {
    addTodo(req, res as SendResponse)
})

router.put("/todo", (req: Request, res: Response) => {
    updateTodo(req, res as SendResponse)
})

router.delete("/todo", (req: Request, res: Response) => {
    deleteTodo(req, res as SendResponse)
})

export default router