import { Router } from "express"
import userController from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.js"
import isAuthenticate from "../middleware/isAuthenticated.js"

const userRouter = Router()

userRouter
  .route("/update-avatar")
  .get(upload.single("file"), userController.updateAvatar)

userRouter
  .route("/user-details")
  .get(isAuthenticate, userController.getUserDetails)
userRouter
  .route("/update-details")
  .put(isAuthenticate, userController.updateDetails)

export default userRouter
