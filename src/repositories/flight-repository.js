const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require('../models');
const { Sequelize } = require("sequelize");

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
}

module.exports = flightRepository