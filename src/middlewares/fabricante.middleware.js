const mongoose = require('mongoose');
const Fabricante=require("../models/fabricante.model")
const middleware = {}

    const validateAsociation = async (req, res, next) => {
        const id = req.params.id
        const fabricante=await Fabricante.findById(id)
        
        if(fabricante.productosId.length>0){
            return res.status(400).json({message: `El fabricante con id ${id} no puede ser eliminado porque se encuentra asociado!`})
        }
        next()
    }
middleware.validateAsociation = validateAsociation
module.exports=middleware