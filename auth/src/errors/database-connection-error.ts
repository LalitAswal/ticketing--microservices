import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    reason = 'Error Connecting Database';
    statusCode =500

    constructor() {
    super("db connection failed");

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return[{message: this.reason}]
    }
}