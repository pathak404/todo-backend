import express, {Application, NextFunction, Request, Response} from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

import {sendResponseMiddleware} from "./src/utils"
import { SendResponse } from "./src/types"
import router from "./src/routes"

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: process.env.FRONTEND_URL}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB_URL as string)
mongoose.connection.on("error", (err)=> {
    console.log(err)
})

app.use((req: Request, res: Response, next: NextFunction) => {
    sendResponseMiddleware(req, res as SendResponse, next)
})

app.use(router)


app.listen(port, () => {
    console.log("server is running on port: " + port)
})

process.on("SIGINT", ()=>{
    mongoose.connection.close();
})
