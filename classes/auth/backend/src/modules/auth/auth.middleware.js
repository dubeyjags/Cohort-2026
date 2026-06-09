import ApiError from "../../common/utils/api-error.js";
import User from "./auth.model.js"; 
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";    

const authenticate = async (req, res, next) => {
    let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) return next(ApiError.unauthorized("Unauthorized"));
        let decoded;
        try {
            decoded = verifyAccessToken(token);
        } catch (err) {
            return next(ApiError.unauthorized("Invalid or expired token"));
        }
        const user = await User.findById(decoded.id).select("+password");
        if (!user) return next(ApiError.unauthorized("User not found"));
        req.user = {
            id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
        };
        next();
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(ApiError.forbidden("You do not have permission to access this resource"));
        }        next();
    }
};

export {authenticate, authorize};