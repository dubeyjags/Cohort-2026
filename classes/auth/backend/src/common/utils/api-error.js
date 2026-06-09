class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message="Bad Request") {
        return new ApiError(400, message);
    }

    static unauthorized(message="Unauthorized") {
        return new ApiError(401, message);
    }

    static conflict(message="Conflict occurred") {
        return new ApiError(409, message);
    }

    static forbidden(message="Forbidden") {
        return new ApiError(403, message);
    }
}

export default ApiError;