import { Router, Request, Response } from "express"
import { SendResponse } from "./types"

const router = Router()

router.get("/", (req: Request, res: Response) => {
    (res as SendResponse).sendResponse({ message: "API server is working!" }, 200)
})



export default router