const Joi = require('@hapi/joi');


const registerValidation = (data) => {
    const jSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return jSchema.validate(data);
}

const loginValidation = (data) => {
    const jSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return jSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;