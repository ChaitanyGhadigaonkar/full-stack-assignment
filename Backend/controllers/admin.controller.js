import Joi from "joi"
import PgClient from "../db.js"
import bcrypt from "bcrypt"

// cabs
const createCab = async (req, res) => {
  try {
    const { name, fixedCharge, perKmCharge, image } = req.body
    const data = await PgClient.query(
      "INSERT INTO cabs (name, fixedCharge, perKmCharge, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, fixedCharge, perKmCharge, image]
    )
    res.status(201).json({ success: true, data: data.rows[0] })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

const deleteCab = async (req, res) => {
  const { id } = req.params

  try {
    const data = await PgClient.query("DELETE FROM cabs WHERE id = $1", [id])
    if (data.rowCount === 0) {
      res.status(404).json({ success: false, message: "Cab not found" })
    } else {
      res
        .status(200)
        .json({ success: true, message: "Cab deleted successfully" })
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

const updateCab = async (req, res) => {
  const { id } = req.params
  const { name, fixedCharge, perKmCharge, image } = req.body

  try {
    const data = await PgClient.query(
      "UPDATE cabs SET name = $1, fixedCharge = $2, perKmCharge = $3, image = $4 WHERE id = $5 RETURNING *",
      [name, fixedCharge, perKmCharge, image, id]
    )
    if (data.rows.length === 0) {
      res.status(404).json({ success: false, message: "Cab not found" })
    } else {
      res.status(200).json({ success: true, data: data.rows[0] })
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

// bookings

const getBookings = async (req, res) => {
  try {
    const data = await PgClient.query("SELECT * FROM bookings")
    res.status(200).json({ success: true, data: data.rows })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}
const createBooking = async (req, res) => {
  try {
    const user = req.user
    const { cab_id, user_id, source, destination, distance, totalcharge } =
      req.body
    const data = await PgClient.query(
      "INSERT INTO bookings (user_id, cab_id, source, destination, distance, totalcharge) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, cab_id, source, destination, distance, totalcharge]
    )

    res.status(201).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params
    const data = await PgClient.query(
      "DELETE FROM bookings WHERE id = $1 RETURNING *",
      [id]
    )

    if (data.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }

    res.status(200).json({ success: true, message: "Booking deleted" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params
    const { source, destination, status } = req.body

    const data = await PgClient.query(
      "UPDATE bookings SET source = $1, destination = $2, status = $3 WHERE id = $4 RETURNING *",
      [source, destination, status, id]
    )

    if (data.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }
    const cabDetails = await PgClient.query(
      "select * from cabs where id = $1",
      [data.rows[0].cab_id]
    )

    const resData = {
      ...data.rows[0],
      cabDetails: cabDetails.rows[0],
    }
    res.status(200).json({ success: true, data: resData })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

// users
const getUsers = async (req, res) => {
  try {
    const data = await PgClient.query("SELECT * FROM users")
    res.status(200).json({ success: true, data: data.rows })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}
const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await PgClient.query("SELECT * FROM users WHERE id = $1", [id])

    if (data.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}
const addUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cPassword: Joi.ref("password"),
      role: Joi.string().required(),
    })
    const validatedData = await schema.validateAsync(req.body)
    const hashedPassword = bcrypt.hashSync(validatedData.password, 10)

    const data = await PgClient.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)  RETURNING id, email",
      [validatedData.name, validatedData.email, hashedPassword]
    )

    res.status(200).json({ success: true, data: { user: data.rows[0] } })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const data = await PgClient.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    )

    if (data.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, message: "User deleted" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, role } = req.body

    const data = await PgClient.query(
      "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
      [name, email, role, id]
    )

    if (data.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const adminController = {
  createCab,
  deleteCab,
  updateCab,
  createBooking,
  getBookings,
  deleteBooking,
  updateBooking,
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
}
export default adminController
