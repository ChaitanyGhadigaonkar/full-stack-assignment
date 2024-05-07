import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"

import PgClient from "./db.js"
import { PORT } from "./config.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cabsRouter from "./routes/cabs.route.js"
import bookingsRouter from "./routes/bookings.route.js"
import adminRouter from "./routes/admin.route.js"

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.get("/", (req, res) => {
  res.send("Hello world")
})

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/cabs", cabsRouter)
app.use("/api/bookings", bookingsRouter)
app.use("/api/admin", adminRouter)

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`)
  try {
    await PgClient.connect()
  } catch (err) {
    console.log("unable to connect to database")
    console.log(err)
    process.exit()
  }
})
