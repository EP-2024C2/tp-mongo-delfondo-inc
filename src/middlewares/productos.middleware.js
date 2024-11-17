const mongoose = require('mongoose');
const { Fabricante } = require('../models');
const middleware = {}

    const validateFormat = async (req, res, next) => {
        const id = req.body.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: `El id ${id} de fabricante tiene un formato incorrecto`})
        }
        await Fabricante.findById(id).then(result => {
            if(!result)
                return res.status(400).json({message: `El fabricante con id ${id} no existe`})
            next()
        })
    }

middleware.validateFormat = validateFormat
module.exports=middleware