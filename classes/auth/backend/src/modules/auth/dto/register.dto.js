import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";
class RegisterDto extends BaseDto {
    static schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).max(20).required(),
        role: Joi.string().valid("customer", "seller", "admin").default("customer"),
    });
}


export default RegisterDto;