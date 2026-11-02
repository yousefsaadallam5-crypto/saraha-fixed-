import express from "express"
import configService from "./config/config.service.js"
import { dbconnect } from "./database/connection.js"
import { errorHandler } from "./common/index.js"
import { authController } from "./module/index.js"

const app = express()
const port = configService.port || 3000

await dbconnect()

app.use(express.json())

app.use("/auth", authController)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
