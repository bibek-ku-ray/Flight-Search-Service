const { StatusCodes } = require("http-status-codes");
const { AirplainRepository } = require("../repositories");
const AppError = require("../utils/app-error");

const airplainRepository = new AirplainRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplainRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot create a new Airplane object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirplane() {
    try {
        const airplane = await airplainRepository.getAll();
        return airplane;
    } catch (error) {
        throw new AppError(
            "Cannot fetch the airplane",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirplaneById(id) {
    try {
        const airplane = await airplainRepository.get(id);
        return airplane;
    } catch (error) {
        console.log("error.statusCode :: ", error.statusCode);

        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airplane you request not foound",
                error.statusCode
            );
        }
        throw new AppError("Cannot fetch the airplane", StatusCodes.NOT_FOUND);
    }
}

async function destroyAirplane(data) {
    try {
        const response = await airplainRepository.destroy(data);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airplane you request cannot be deleted",
                error.statusCode
            );
        }
        throw new AppError("Cannot delete the airplane", StatusCodes.NOT_FOUND);
    }
}

async function updateAirplane(id, data) {
    try {
        const response = await airplainRepository.update(id, data)
        return response
    } catch (error) {
        if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Unable to update the Airplane object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createAirplane,
    getAirplane,
    getAirplaneById,
    destroyAirplane,
    updateAirplane,
};
