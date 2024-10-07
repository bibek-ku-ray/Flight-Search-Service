const express = require("express");
const { InfoController } = require("../../controllers");
const airplainRoutes = require("./airplain-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes")
const flightRoutes = require("./flight-routes")

const router = express.Router();

router.use("/airplanes", airplainRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);

router.get("/info", InfoController.info);

module.exports = router;
