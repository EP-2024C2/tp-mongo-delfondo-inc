const { productos } = require('../controllers/productos.controller')
const middleware = {}

const validateIdProduct = async (req,res,next) => {
    const id = req.params.id
    const producto = await productos.findByPk(id)
    if (!producto)
       return res.status(404).json({mensaje: `El producto con Id ${id} no existe.`})
    next()
}
middleware.validateIdProduct = validateIdProduct

module.exports = middleware