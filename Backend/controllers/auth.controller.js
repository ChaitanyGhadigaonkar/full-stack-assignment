import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import PgClient from "../db.js"
import { JWT_SECRET, PORT } from "../config.js"
import Joi from "joi"

export const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  cPassword: Joi.ref("password"),
})

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
})

// register /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { value: validatedData, error } = userRegisterSchema.validate(
      req.body
    )
    if (error) {
      res.status(400).json({ success: false, error: error.details[0].message })
      return
    }

    const hashedPassword = bcrypt.hashSync(validatedData.password, 10)

    const data = await PgClient.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)  RETURNING id, email",
      [validatedData.name, validatedData.email, hashedPassword]
    )

    res.status(200).json({ success: true, data: { user: data.rows[0] } })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error: error.message })
  }
}

// login /api/auth/login

const loginHandler = async (req, res) => {
  const { value: validatedData, error } = userLoginSchema.validate(req.body)

  if (error) {
    res.status(400).json({ success: false, error: error.details[0].message })
    return
  }
  const { email, password } = validatedData

  const checkingIsExists = await PgClient.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  if (checkingIsExists.rowCount === 0) {
    res.status(400).json({ success: false, error: "Email does not exists" })
    return
  }

  const user = checkingIsExists.rows[0]

  const storedPassword = user.password
  const isMatching = bcrypt.compareSync(password, storedPassword)
  if (!isMatching) {
    res.status(400).json({ success: false, error: "Invalid Credentials" })
    return
  }

  const authToken = jwt.sign(
    {
      userDetails: {
        email: user.email,
        role: user.role,
        id: user.id,
      },
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.cookie("jwt", authToken, {
    httpOnly: true,
    secure: true, // set to false for using thunder client
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  res.status(201).json({
    success: true,
    data: {
      message: "successfully login",
      userDetails: { email: user.email, role: user.role, id: user.id },
    },
  })
}

const logoutHandler = async (req, res) => {
  const authToken = req.cookies?.jwt
  // console.log(req.cookies)

  if (!authToken) {
    res.status(400).json({ success: false, error: "Invalid token" })
    return
  }
  res.clearCookie("jwt")
  res
    .status(200)
    .json({ success: true, data: { message: "successfully logout" } })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  const checkingIsExists = await PgClient.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  if (checkingIsExists.rowCount === 0) {
    res.status(400).json({ success: false, error: "Email does not exists" })
    return
  }

  // reset password link

  const resetPasswordToken = jwt.sign(
    { id: checkingIsExists.rows[0].id },
    JWT_SECRET,
    { expiresIn: 15 * 60 * 60 }
  ) // 15 minutes

  const resetPasswordLink = `http://localhost:5173/reset-password/${resetPasswordToken}`
  res.status(201).json({ success: true, data: { resetPasswordLink } })
}

const resetPassword = async (req, res) => {
  const { token, password, cPassword } = req.body

  if (password !== cPassword) {
    res.status(400).json({ success: false, error: "passwords not matching" })
    return
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const hashedPassword = bcrypt.hashSync(password, 10)

    const data = await PgClient.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING email",
      [hashedPassword, decoded.id]
    )

    res.status(200).json({ success: true, data: { email: data.rows[0].email } })
  } catch (error) {
    res.status(400).json({ success: false, error: error?.message })
  }
}
const authController = {
  registerUser,
  loginHandler,
  logoutHandler,
  forgotPassword,
  resetPassword,
}
export default authController
