const express = require("express");
const { InfoController } = require("../../controllers");
const airplainRoutes = require("./airplain-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes")

const router = express.Router();

router.use("/airplane", airplainRoutes);
router.use("/city", cityRoutes);
router.use("/airport", airportRoutes);

router.get("/info", InfoController.info);

module.exports = router;
