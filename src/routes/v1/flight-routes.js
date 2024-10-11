const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post(
    "/",
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight
);

// /api/v1/flights?trips=TIA-DEL GET
router.get("/", FlightController.getAllFights)

// /api/v1/flights/:id GET
router.get("/:id", FlightController.getFlight);

// /api/v1/flights/:id/seats PATCH
router.patch(
    "/:id/seats",
    FlightMiddlewares.validateUpdateSeatsRequest,
    FlightController.updateSeats
);

module.exports = router;
