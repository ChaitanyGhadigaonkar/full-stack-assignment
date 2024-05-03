export default function isAdmin(req, res, next) {
  if (req.user.role === "user") {
    return res.status(403).json({ success: false, error: "Forbidden" })
  }
  next()
}
