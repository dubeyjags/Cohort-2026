import ApiResponse from "../../common/utils/api-response";
import authService from "./auth.service";

const register = async (req, res) => {
    const user = await authService.register(req, res);
    ApiResponse.created(res, "User registered successfully", user);
};

export default { register };