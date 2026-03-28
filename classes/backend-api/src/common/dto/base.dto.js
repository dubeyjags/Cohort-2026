import Joi from "joi";

class BaseDto {
   static schema = Joi.object({});

   static validate(data) {
      const { error, value } = this.schema.validate(data, { 
        abortEarly: false, // to get all validation errors not just the first one
        stripUnknown: true // to remove unknown fields
         });
         if (error) {
            error.status = 400; // Bad Request
         }
      return { error, value };
   }
}

export default BaseDto;