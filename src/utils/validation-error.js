//this file will handle all the validation errors in the application, which are mainly caused by users end...ITS A CLIENT SIDE ERROR, SO THE STATUS CODE WILL BE 400 BAD REQUEST

const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

class ValidationError extends AppError {
    constructor(error) {
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });

        super(
            errorName,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = ValidationError;