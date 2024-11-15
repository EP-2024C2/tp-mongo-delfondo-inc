const mongoose = require('mongoose');
const middleware = {}

    const validateFormat = async (req, res, next) => {
        const id = req.body.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: `El id ${id} de fabricante tiene un formato incorrecto`})
        }
        next()
    }
middleware.validateFormat = validateFormat
module.exports=middleware