const CrudRepository = require("./crud-repository");
const { Flight } = require('../models')

class flightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }
}

module.exports = flightRepository