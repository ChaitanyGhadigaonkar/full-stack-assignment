import { Router } from "express"
import userController from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.js"

const userRouter = Router()

userRouter
  .route("/update-avatar")
  .get(upload.single("file"), userController.updateAvatar)

export default userRouter
