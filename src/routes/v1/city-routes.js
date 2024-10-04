const express =require('express')
const { CityController } = require('../../controllers')
const { CityMiddlewares } = require('../../middlewares')

const router = express.Router()

// /api/v1/city :: POST
router.post('/', CityMiddlewares.validateCreateRequest, CityController.createCity)

// /api/vi/city :: GET
router.get('/', CityController.getAllCities)

// /api/v1/city/:id :: PATCH
router.patch('/:id', CityController.updateCity)

// /api/v1/city/:id :: DELETE
router.delete("/:id", CityController.destroyCity);

module.exports = router