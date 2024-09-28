const { Airplane } = require("../models");
const CrudRepository = require("./crud-repository");

class AirplainRepository extends CrudRepository {
    constructor() {
        super(Airplane);
    }
}

module.exports = AirplainRepository;
