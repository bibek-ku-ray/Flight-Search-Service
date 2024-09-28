const { AirplainService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirplane(req, res) {
    try {
        const response = await AirplainService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        SuccessResponse.message = "Successfully create an airplane";
        SuccessResponse.data = response;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = error;

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function getAirplane(req, res) {
    try {
        const response = await AirplainService.getAirplane();

        SuccessResponse.message = "Successufully fetch airplane";
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.StatusCode).json(ErrorResponse);
    }
}
async function getAirplaneById(req, res) {
    try {
        const response = await AirplainService.getAirplaneById(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function destroyAirplane(req, res) {
    try {
        const response = await AirplainService.destroyAirplane(req.params.id);
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req, res) {
    try {
        const response = await AirplainService.updateAirplane(
            req.params.id,
            {
                modelNumber: req.body.modelNumber,
                capacity: req.body.capacity,
            },
        );
        SuccessResponse.message = "Successfully updated an airplane";
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = error.message;

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplane,
    getAirplaneById,
    destroyAirplane,
    updateAirplane,
};
