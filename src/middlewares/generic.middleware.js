const mongoose = require('mongoose');
const middleware = {}

const validateId = (model) => { 
    return async (req, res, next) => {
        const id = req.params.id
        if(mongoose.Types.ObjectId.isValid(id)){
            await model.findById(id).then(result => {
                if(!result)
                    return res.status(400).json({message: `El ${model.modelName} con id ${id} no existe`})
                next()
            })
        } else {
            return res.status(400).json({message: `El id ${id} de ${model.modelName} tiene un formato incorrecto`})
        }
    }
}
middleware.validateId = validateId

const requestTime = (req, _ , next) => {
    console.log({ url: req.url , fechaHora: new Date() })
    next()
}
middleware.requestTime = requestTime

module.exports = middleware 