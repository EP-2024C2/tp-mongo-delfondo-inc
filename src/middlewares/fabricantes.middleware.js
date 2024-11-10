const { fabricantes } = require('../controllers/fabricantes.controller')
const middleware = {}

const validateIdMaker = async (req,res,next) => {
    const id = req.params.id
    const fabricante = await fabricantes.findByPk(id)
    if (!fabricante)
       return res.status(404).json({mensaje: `El fabricante con Id ${id} no exite.`})
    next()
}
middleware.validateIdMaker = validateIdMaker

module.exports = middleware