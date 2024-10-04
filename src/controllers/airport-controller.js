const { StatusCodes } = require("http-status-codes")
const { AirportService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common")

/**
 * POST : /airports 
 * req.body : { name:"Tribhuwan", code: "TIA", address: "Kathmanud", cityId: 1 }
 */

async function createAirport(req, res) {
    try {
        const response = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        SuccessResponse.data = response;
        SuccessResponse.message = "Airport created successfully"
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        ErrorResponse.message = "Airport creation unsuccessufull"
        
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse)
    }   
}

/**
 * GET : /airports
 * req.body : {} 
 */
async function getAllAirports(req, res) {
    try {
        const response = await AirportService.getAirport();
        SuccessResponse.message = "Successufully fetch airport";
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * GET : /airports/:id
 * req.body : {} 
 */
async function getAirportById(req, res) {
    try {
        const response = await AirportService.getAirportById(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


/**
 * DELETE : /airports/:id
 * req.body : {} 
 */
async function destroyAirport(req, res) {
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * PATCH : /airports/:id
 * req.body : { name:"Tribhuwan", code: "TIA", address: "Kathmanud", cityId: 1 } 
 */
async function updateAirport(req, res) {
    try {
        const response = await AirportService.updateAirport(req.params.id, {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.message = "Successfully updated an airport";
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating airport";
        ErrorResponse.error = error.message;

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirportById,
    updateAirport,
    destroyAirport,
};