const Producto=require("../models/producto.model")
const middleware = {}

const validatePartId = async (req, res, next) => {
    const id = req.params.id
    const producto = await Producto.findOne({'componentes._id': id})
    if(!producto){
        return res.status(404).json({message: `El componente con id ${id} no se encuentra en ningun producto`})
    }
    next()
}
middleware.validatePartId = validatePartId

module.exports=middleware