const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareDateTime } = require("../utils/helper/datetime-helper");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        // compare arrival time and departure time
        // arrival time > departure time
        const isArrivalLater = compareDateTime(
            data.arrivalTime,
            data.departureTime
        );
        console.log(isArrivalLater);
        
        if (!isArrivalLater) {
            throw new AppError(
                "Arrival time should be greater the departure time",
                StatusCodes.BAD_REQUEST
            );
        }

        // create new flight
        const flight = await flightRepository.create(data);
        return flight;

    } catch (error) {
        // if the error is isArrivalLater = false
        if (error instanceof AppError) {
            throw error;
        }

        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot create new Fligh object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createFlight,
};
