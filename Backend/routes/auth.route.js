import { Router } from "express"
import authController from "../controllers/auth.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
const authRouter = Router()

authRouter
  .post("/register", authController.registerUser)
  .post("/login", authController.loginHandler)
  .get("/logout", isAuthenticated, authController.logoutHandler)

export default authRouter
