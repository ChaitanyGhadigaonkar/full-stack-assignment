import Joi from "joi"
import PgClient from "../db.js"

const bookingsSchema = Joi.object({
  cabId: Joi.number().required(),
  source: Joi.string().required(),
  destination: Joi.string().required(),
  distance: Joi.number().required(),
  totalCharge: Joi.number().required(),
})
const getAllBookings = async (req, res) => {
  try {
    const user = req.user
    // console.log(user.id)
    const data = await PgClient.query(
      "SELECT * FROM bookings WHERE user_id = $1",
      [user.id]
    )
    res.status(200).json({ success: true, data: data.rows })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const createBooking = async (req, res) => {
  try {
    const user = req.user
    const validatedData = await bookingsSchema.validateAsync(req.body)

    const { cabId, source, destination, distance, totalCharge } = validatedData
    const data = await PgClient.query(
      "INSERT INTO bookings (user_id, cab_id, source, destination, distance, totalCharge) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user.id, cabId, source, destination, distance, totalCharge]
    )

    res.status(201).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const getBookingById = async (req, res) => {
  try {
    const user = req.user
    const { id } = req.params
    const data = await PgClient.query("SELECT * FROM bookings WHERE id = $1", [
      id,
    ])

    if (data.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }
    // console.log(parseInt(data.rows[0].user_id) === user.id)
    // if user tries to access booking that is not his
    if (parseInt(data.rows[0].user_id) !== user.id) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized its not yours" })
      return
    }

    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user

    const updateBookingSchema = Joi.object({
      cabId: Joi.number().required(),
      source: Joi.string().required(),
      destination: Joi.string().required(),
      distance: Joi.number().required(),
      totalCharge: Joi.number().required(),
    })
    const { source, destination, cabId, distance, totalCharge } =
      await updateBookingSchema.validateAsync(req.body)

    const bookingDetails = await PgClient.query(
      "SELECT * FROM bookings WHERE id = $1",
      [id]
    )

    if (bookingDetails.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }

    if (parseInt(bookingDetails.rows[0].user_id) !== user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const data = await PgClient.query(
      "UPDATE bookings SET cab_id = $1, source=$2, destination=$3, distance = $4, totalCharge = $5 WHERE id = $6 RETURNING *",
      [cabId, source, destination, distance, totalCharge, id]
    )

    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}
// cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user

    const bookingDetails = await PgClient.query(
      "SELECT * FROM bookings WHERE id = $1",
      [id]
    )

    if (bookingDetails.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }

    if (parseInt(bookingDetails.rows[0].user_id) !== user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    const data = await PgClient.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *",
      [id]
    )

    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user

    const bookingDetails = await PgClient.query(
      "SELECT * FROM booking WHERE id = $1",
      [id]
    )
    if (bookingDetails.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }
    if (parseInt(bookingDetails.rows[0].user_id) !== user.id) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized its not yours" })
      return
    }

    const data = await PgClient.query(
      "DELETE FROM booking WHERE id = $1 RETURNING *",
      [id]
    )

    res.status(200).json({ success: true, message: "Booking deleted" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const bookingController = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  cancelBooking,
  deleteBooking,
}

export default bookingController
