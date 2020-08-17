const Joi = require('joi')
const colors = require('colors')


const middleware = (schema,property) => {
    return(req,res,next) => {
        const { error } = Joi.valid(req.body,schema);
        const valid = error == null;
        if (valid ){
            next()
        }  else {
            const {details} = error
            const message = details.map(i => i.message).join(',')
            console.log(`Error ${message}`.red.bold)
            res.status(422).json({
                success:false,
                message:message
            })
        }
    }
}

module.exports = middleware