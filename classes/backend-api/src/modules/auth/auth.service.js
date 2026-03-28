import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import crypto, { verify } from "crypto";

const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw ApiError.conflict("User with this email already exists");
    }

    const { rawToken, hasToken } = generateRefreshToken();

    //send a emil with the rawToken for verification
    

    const user = await User.create({ username, email, password, role, verificationToken: hasToken });
    return user;
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw ApiError.unauthorized("Invalid User or password");
    }   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw ApiError.forbidden("please verify your email and password");
    }
    if (!user.isVerified) {
        throw ApiError.forbidden("Please verify your email before logging in");
    }
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });
    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });
    const userData = user;
    delete userData.password;
    delete userData.refreshToken;

    return {user: userData, accessToken, refreshToken };
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    const hashedToken = hashToken(token);
    const user = await User.findOne({   verificationToken: hashedToken });
    if (!user) {
        throw ApiError.badRequest("Invalid or expired verification token");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });
    ApiResponse.ok(res, "Email verified successfully");
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw ApiError.badRequest("User with this email does not exist");
    }
    const { rawToken, hasToken } = generateRefreshToken();  
    user.passwordResetToken = hasToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save({ validateBeforeSave: false });
    return user;
};

const resetPassword = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    const hashedToken = hashToken(token);
    const user = await User.findOne({resetPasswordToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        throw ApiError.badRequest("Invalid or expired password reset token");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    ApiResponse.ok(res, "Password reset successfully");
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)  throw ApiError.unauthorized("Refresh token is required");
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user) {
        throw ApiError.unauthorized("User not found");
    }
    if (user.refreshToken !== hashToken(refreshToken)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user._id });
    user.refreshToken = hashToken(newRefreshToken);
    await user.save({ validateBeforeSave: false });
    const userData = user;
    delete userData.password;
    delete userData.refreshToken;
    return {
        user: userData,
        accessToken,
        refreshToken: newRefreshToken
    }

};

const logout = async (req, res) => {
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId, { refreshToken: null }, { new: true });
        ApiResponse.ok(res, "Logged out successfully");
}

export default { register, login, verifyEmail, forgotPassword, resetPassword, refresh, logout }; 