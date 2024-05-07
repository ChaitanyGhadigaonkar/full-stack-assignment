import { Router } from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import isAdmin from "../middleware/isAdmin.js"
import adminController from "../controllers/admin.controller.js"

const adminRouter = Router()

// cabs routes
adminRouter
  .route("/cabs")
  .post(isAuthenticated, isAdmin, adminController.createCab)

adminRouter
  .route("/cabs/:id")
  .put(isAuthenticated, isAdmin, adminController.updateCab)
  .delete(isAuthenticated, isAdmin, adminController.deleteCab)

// bookings routes

adminRouter
  .route("/bookings")
  .post(isAuthenticated, isAdmin, adminController.createBooking)
  .get(isAuthenticated, isAdmin, adminController.getBookings)

adminRouter
  .route("/bookings/:id")
  .put(isAuthenticated, isAdmin, adminController.updateBooking)
  .delete(isAuthenticated, isAdmin, adminController.deleteBooking)

// users routes
adminRouter
  .route("/users")
  .get(isAuthenticated, isAdmin, adminController.getUsers)
  .post(isAuthenticated, isAdmin, adminController.addUser)

adminRouter
  .route("/users/:id")
  .delete(isAuthenticated, isAdmin, adminController.deleteUser)
  .put(isAuthenticated, isAdmin, adminController.updateUser)
  .get(isAuthenticated, isAdmin, adminController.getUserById)

export default adminRouter
