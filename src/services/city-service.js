const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        console.log("ERROR Server:: ", error);

        if (
            error.name == "SequelizeValidationError" ||
            error.name == "SequelizeUniqueConstraintError"
        ) {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot create new city object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllCities() {
    try {
        const city = await cityRepository.getAll();
        return city;
    } catch (error) {
        throw new AppError(
            "Cannot fetch the cities",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The city you request is not found",
                error.statusCode
            );
        }
        if (
            error.name == "SequelizeValidationError" ||
            error.name == "SequelizeUniqueConstraintError"
        ) {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }

        throw new AppError(
            "Cannot update the city",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyCity(data) {
    try {
        const response = await cityRepository.destroy(data);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The city you request cannot be deleted",
                error.statusCode
            );
        }
        throw new AppError("Cannot delete the city", StatusCodes.NOT_FOUND);
    }
}

module.exports = {
    createCity,
    getAllCities,
    updateCity,
    destroyCity,
};
