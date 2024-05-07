import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import PgClient from "../db.js"
import { JWT_SECRET } from "../config.js"
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
    const validatedData = await userRegisterSchema.validateAsync(req.body)

    if (validatedData.password !== validatedData.cPassword) {
      res.status(400).json({ success: false, error: "passwords not matching" })
      return
    }

    const hashedPassword = bcrypt.hashSync(validatedData.password, 10)

    const data = await PgClient.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)  RETURNING id, email",
      [validatedData.name, validatedData.email, hashedPassword]
    )

    res.status(200).json({ success: true, data: { user: data.rows[0] } })
  } catch (error) {
    res.status(400).json({ success: false, error: error?.detail })
  }
}

// login /api/auth/login

const loginHandler = async (req, res) => {
  const validatedData = await userLoginSchema.validateAsync(req.body)
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

const authController = { registerUser, loginHandler, logoutHandler }
export default authController
