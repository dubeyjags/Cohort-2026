import ApiResponse from "../../common/utils/api-response.js";
import authService from "./auth.service.js";

const register = async (req, res) => {
    const user = await authService.register(req, res);
    ApiResponse.created(res, "User registered successfully", user);
};

const login = async (req, res) => {
    console.log(req.body);
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: true
    });
    ApiResponse.ok(res, "User logged in successfully", { user, accessToken });
};

const verifyEmail = async (req, res) => {
    console.log('Controller received request to verify email with params:', req.params);
    await authService.verifyEmail(req, res);
    ApiResponse.ok(res, "Email verified successfully");
};

const forgotPassword = async (req, res) => {    
    await authService.forgotPassword(req, res);
    ApiResponse.ok(res, "Password reset link sent to your email");
}

const resetPassword = async (req, res) => {
    await authService.resetPassword(req, res);
    ApiResponse.ok(res, "Password reset successfully");
}

const refresh = async (req, res) => {
    console.log('req.body in controller:', req.body);
    const { accessToken, refreshToken } = await authService.refresh(req, res);
    ApiResponse.ok(res, "Token refreshed successfully", { accessToken, refreshToken });
}

const profile = async (req, res) => {
    ApiResponse.ok(res, "User profile retrieved successfully", req.user);
}

const logout = async (req, res) => {
    await authService.logout(req, res);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "User logged out successfully");
}


export { register, login, profile, verifyEmail, forgotPassword, resetPassword, refresh, logout };