import { Router } from "express"
import cabsController from "../controllers/cabs.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import isAdmin from "../middleware/isAdmin.js"

const cabsRouter = Router()
// TODO: JOI validation
cabsRouter.route("/").get(isAuthenticated, cabsController.getAllCabs)

cabsRouter.route("/:id").get(isAuthenticated, cabsController.getCabById)
export default cabsRouter
