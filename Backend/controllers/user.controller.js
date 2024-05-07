import cloudinary from "cloudinary"
import PgClient from "../db.js"
import Joi from "joi"

const updateAvatar = async (req, res) => {
  try {
    // Upload the file to Cloudinary

    const file = req.file
    if (!file) {
      res.status(400).json({ message: "Please upload a file" })
      return
    }

    console.log(req.file)
    // const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result)
    res.status(200).json({ message: "File uploaded successfully", result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to upload file" })
  }
}

const getUserDetails = async (req, res) => {
  try {
    const user = req.user

    const data = await PgClient.query("SELECT * FROM users WHERE id = $1", [
      user.id,
    ])

    if (data.rows.length === 0) {
      res.status(404).json({ success: false, message: "User not found" })
      return
    }
    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const updateDetailsSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
})

const updateDetails = async (req, res) => {
  try {
    const user = req.user
    const { error, value: validatedData } = updateDetailsSchema.validate(
      req.body
    )

    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message })
      return
    }
    const emailCheck = await PgClient.query(
      "select * from users where email = $1",
      [validatedData.email]
    )

    for (const element of emailCheck.rows) {
      if (element.id !== user.id) {
        res
          .status(400)
          .json({ success: false, message: "Email already exists" })
        return
      }
    }
    const data = await PgClient.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [validatedData.name, validatedData.email, user.id]
    )
    res.status(200).json({ success: true, data: data.rows[0] })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update user details" })
  }
}

const userController = { updateAvatar, getUserDetails, updateDetails }
export default userController
