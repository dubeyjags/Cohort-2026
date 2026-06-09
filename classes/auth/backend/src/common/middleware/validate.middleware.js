import ApiError from "../utils/api-error.js";

const validate = (DtoClass) => {
    return (req, res, next) => {
        const { error, value } = DtoClass.validate(req.body);
        if (error) {
            return next(ApiError.badRequest(error.message));
        }
        req.body = value;
        next();
    };
};

export default validate;