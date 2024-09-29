const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
    try {
        const response = await CityService.createCity({
            name: req.body.name,
        });
        SuccessResponse.message = "Successfully created city";
        SuccessResponse.data = response
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        
        ErrorResponse.message = "Something went wrong while creating city";
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}


module.exports = {
    createCity
}