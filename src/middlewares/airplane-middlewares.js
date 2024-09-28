const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/app-error");

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.error = new AppError(
            ["Model Number not found in incoming request"],
            StatusCodes.BAD_REQUEST
        );
        
        ErrorResponse.message = "Something went wrong while creating aiplane";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
};
