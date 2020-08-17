const Joi = require('joi')


const schemas = {
    userRegister:Joi.object().keys({
        username:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required()
    })
}


module.exports = schemas