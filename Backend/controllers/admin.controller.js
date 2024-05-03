import PgClient from "../db.js"

// cabs
const createCab = async (req, res) => {
  try {
    const { name, type } = req.body
    const data = await PgClient.query(
      "INSERT INTO cabs (name, type) VALUES ($1, $2) RETURNING *",
      [name, type]
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
  const { name, type } = req.body

  try {
    const data = await PgClient.query(
      "UPDATE cabs SET name = $1, type = $2 WHERE id = $3 RETURNING *",
      [name, type, id]
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
const createBooking = async (req, res) => {
  try {
    const user = req.user
    const { cabId, source, destination } = req.body

    const data = await PgClient.query(
      "INSERT INTO booking (user_id, cab_id, source, destination) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.id, cabId, source, destination]
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
      "DELETE FROM booking WHERE id = $1 RETURNING *",
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
    const { source, destination } = req.body

    const data = await PgClient.query(
      "UPDATE booking SET source = $1, destination = $2 WHERE id = $3 RETURNING *",
      [source, destination, id]
    )

    if (data.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" })
    }

    res.status(200).json({ success: true, data: data.rows[0] })
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
    const { name, email, password, role } = req.body
    if (role) {
      const data = await PgClient.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, password, role]
      )
      res.status(201).json({ success: true, data: data.rows[0] })
      return
    }
    const data = await PgClient.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    )
    res.status(201).json({ success: true, data: data.rows[0] })
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
    const { name, email, password, role } = req.body

    const data = await PgClient.query(
      "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
      [name, email, password, role, id]
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
  deleteBooking,
  updateBooking,
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
}
export default adminController
