const express = require("express");
const { InfoController } = require("../../controllers");
const airplainRoutes = require('./airplain-routes')

const router = express.Router();

router.use('/airplane', airplainRoutes)

router.get("/info", InfoController.info);

module.exports = router;
