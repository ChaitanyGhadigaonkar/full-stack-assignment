import cloudinary from "cloudinary"

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

const userController = { updateAvatar }
export default userController
