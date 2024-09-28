const express = require('express');
const { AirplainController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router()
// /api/v1/airplane POST
router.post('/', 
    AirplaneMiddlewares.validateCreateRequest, 
    AirplainController.createAirplane
)

// /api/v1/airplane GET
router.get('/', AirplainController.getAirplane)


// /api/v1/airplane/:id GET
router.get('/:id', AirplainController.getAirplaneById)

// /api/v1/airplane/:id DELETE
router.delete('/:id', AirplainController.destroyAirplane)

// /api/v1/airplane/:id PATCH
router.put('/:id', AirplainController.updateAirplane)

module.exports = router