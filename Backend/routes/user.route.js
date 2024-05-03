import { Router } from "express"
import userController from "../controllers/user.controller.js"
import multer from "multer"
import cloudinary from "cloudinary"

const userRouter = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

userRouter
  .route("/update-avatar")
  .get(upload.single("file"), userController.updateAvatar)

export default userRouter
