import { Router } from "express"
import { response } from "../../common/index.js"
import * as authService from "./auth.service.js"

export const authController = Router()

authController.post("/signup", async (req, res, next) => {
    const user = await authService.signup(req.body)
    response({
        res, data: user, status: 201, message: "user created successfully"
    })
})

authController.post("/login", async (req, res, next) => {
    const user = await authService.login(req.body)
    response({
        res, data: user, message: "user logged in successfully"
    })
})
