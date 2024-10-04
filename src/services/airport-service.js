const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/app-error");

const airportRepository = new AirportRepository()

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if ((error.name = "SequelizeValidationError")) {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push = err.message;
            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot create a new Airport object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirport() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    } catch (error) {
        throw new AppError(
            "Cannot fetch the airports",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirportById(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The resource you request in not found",
                StatusCodes.NOT_FOUND
            );
        }
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if ((error.name = "SequelizeValidationError")) {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push = err.message;
            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot update Airport object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airport you request cannot be deleted",
                error.statusCode
            );
        }
        throw new AppError("Cannot delete the airport", StatusCodes.NOT_FOUND);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirportById,
    updateAirport,
    destroyAirport,
};
