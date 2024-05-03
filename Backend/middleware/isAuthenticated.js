import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"

export default function isAuthenticated(req, res, next) {
  const authToken = req.cookies?.jwt
  if (!authToken) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }
  const data = jwt.verify(authToken, JWT_SECRET)

  req.user = data.userDetails
  next()
}
