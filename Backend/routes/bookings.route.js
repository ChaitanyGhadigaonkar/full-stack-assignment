import { Router } from "express"
import bookingController from "../controllers/booking.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const bookingsRouter = Router()

bookingsRouter
  .route("/")
  .get(isAuthenticated, bookingController.getAllBookings)
  .post(isAuthenticated, bookingController.createBooking)

bookingsRouter
  .route("/:id")
  .get(isAuthenticated, bookingController.getBookingById)
  .put(isAuthenticated, bookingController.updateBooking)
  .delete(isAuthenticated, bookingController.deleteBooking)

bookingsRouter.put(
  "/:id/cancel",
  isAuthenticated,
  bookingController.cancelBooking
)

export default bookingsRouter
