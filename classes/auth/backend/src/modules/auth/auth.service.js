import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, generateResetToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import crypto, { verify } from "crypto";
import { emailVerification } from "../../common/config/email.js";

const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw ApiError.conflict("User with this email already exists");
    }

    const { rawToken, hasToken } = generateResetToken();

    const user = await User.create({ username, email, password, role, verificationToken: hasToken });
    console.log('Raw token:', rawToken);
    console.log('Hashed token:', hasToken);

    // Send verification email
    const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email/${rawToken}`;
    await emailVerification(user.username,user.email, verificationLink);    
    return user;
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
    if (!token) {
        throw ApiError.badRequest("Verification token is required");
    }
    
    const hashedToken = hashToken(token);
    const user = await User.findOne({verificationToken: hashedToken }).select("+verificationToken");
    if (!user) {
        throw ApiError.badRequest("Invalid or expired verification token");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });
    return user;
};


const login = async (credentials) => {
    const { email, password } = credentials;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw ApiError.unauthorized("Invalid User or password");
    }   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw ApiError.unauthorized("Invalid User or password");
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw ApiError.badRequest("User with this email does not exist");
    }
    const { rawToken, hasToken } = generateResetToken();
    console.log('Raw token for password reset:', rawToken);
    console.log('Hashed token for password reset:', hasToken);
    user.passwordResetToken = hasToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save({ validateBeforeSave: false });
    
    // Send password reset email
    
    return user;
};

const resetPassword = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    
    if (!token) {
        throw ApiError.badRequest("Reset token is required");
    }
    if (!newPassword) {
        throw ApiError.badRequest("New password is required");
    }
    
    const hashedToken = hashToken(token);
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } }).select("+passwordResetToken +passwordResetExpires");
    if (!user) {
        throw ApiError.badRequest("Invalid or expired password reset token");
    }
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return user;
};

const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log('Received refresh token:', refreshToken);
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

const profile = async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id).select("-password -refreshToken -verificationToken -passwordResetToken -passwordResetExpires");
    if (!user) {
        throw ApiError.notFound("User not found");
    }
    return user;
};

const logout = async (req, res) => {
        const id = req.user.id;
        await User.findByIdAndUpdate(id, { refreshToken: null }, { new: true });
        ApiResponse.ok(res, "Logged out successfully");
}

export default { register, login, verifyEmail, forgotPassword, resetPassword, refresh, profile, logout }; 