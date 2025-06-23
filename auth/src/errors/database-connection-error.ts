export class DatabaseConnectionError extends Error{
    reason = 'Error Connecting Database';

    constructor(){
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}