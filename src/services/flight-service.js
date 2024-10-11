const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareDateTime } = require("../utils/helper/datetime-helper");
const { Op } = require("sequelize");

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

async function getAllFights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = "23:59:59";

    // trip=TIA-DEL
    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            // default max price is 20000, if not given
            [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
        };
        sortFilter = [["price", "DESC"]];
    }

    if (query.travellers) {
        customFilter.travellers = {
            [Op.gte]: query.travellers,
        };
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
        };
    }

    if (query.sort) {
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split("_"));
        console.log(sortFilters);

        sortFilter = sortFilters;
    }

    try {
        const flights = await flightRepository.getAllFights(
            customFilter,
            sortFilter
        );

        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError(
            "Cannot fetch data of all the flights",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Request flight is not found!",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot fetch the flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec)
        return response;
    } catch (error) {
        console.log(error)
        throw AppError(
            "Cannot update data of the seats",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

module.exports = {
    createFlight,
    getAllFights,
    getFlight, 
    updateSeats
};
