import { Router } from "express"
import authController from "../controllers/auth.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
const authRouter = Router()

authRouter
  .post("/register", authController.registerUser)
  .post("/login", authController.loginHandler)
  .get("/logout", isAuthenticated, authController.logoutHandler)
  .post("/forgot-password", authController.forgotPassword)
  .post("/reset-password", authController.resetPassword)

export default authRouter
