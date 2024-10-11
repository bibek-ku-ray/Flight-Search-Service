const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require('../models');
const { Sequelize } = require("sequelize");
const db = require("../models");

class flightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }
    
    async getAllFights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: "airplaneDetail",
                },

                // as sequlize does join on id by default
                // but here we are using airport code for join
                // so we should define specifically to join on code
                {
                    model: Airport,
                    required: true,
                    as: "departureAirport",
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col("Flight.departureAirportId"),
                            "=",
                            Sequelize.col("departureAirport.code")
                        ),
                    },
                },
                {
                    model: Airport,
                    required: true,
                    as: "arrivalAirport",
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col("Flight.arrivalAirportId"),
                            "=",
                            Sequelize.col("arrivalAirport.code")
                        ),
                    },
                },
            ],
        });
        return response
    }

    // If the seat is booked the it will be total available seat will be decreased
    async updateRemainingSeats(flightId, seats, dec = true) {
        // this will put row level lock for update
        await db.sequelize.query(`SELECT * FROM Flights WHERE Flights.id=${flightId} FOR UPDATE;`)
        const flight = await Flight.findByPk(flightId)
        /**
         * dec = true -> true is evaluated as string
         */
        if(dec === true || dec === "true"){
            await flight.decrement("totalSeats", {by: seats});
        } else {
            await flight.increment("totalSeats", {by: seats});    
        }
        return flight;
    }

}

module.exports = flightRepository