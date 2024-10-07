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

module.exports = router;
