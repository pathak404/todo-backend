import { Router, Request, Response } from "express"
import { SendResponse } from "./types"
import { login, register } from "./Controllers/User"

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


export default router