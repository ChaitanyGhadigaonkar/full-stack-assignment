import Joi from "joi"
import PgClient from "../db.js"

// get all cabs /api/cabs
const getAllCabs = async (req, res) => {
  try {
    // console.log(req.user)
    const data = await PgClient.query("SELECT * FROM cabs")
    res.status(200).json({ success: true, data: data.rows })
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

// get cab by id /api/cabs/:id
const getCabById = async (req, res) => {
  const { id } = req.params

  try {
    const data = await PgClient.query("SELECT * FROM cabs WHERE id = $1", [id])
    if (data.rows.length === 0) {
      res.status(404).json({ success: false, message: "Cab not found" })
    } else {
      res.status(200).json({ success: true, data: data.rows[0] })
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error })
  }
}

const cabsController = {
  getAllCabs,
  getCabById,
}
export default cabsController
