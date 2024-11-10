const { componentes } = require('../controllers/componentes.controller')
const middleware = {}

const validateIdPart = async (req,res,next) => {
    const id = req.params.id
    const componente = await componentes.findByPk(id)
    if (!componente)
       return res.status(404).json({mensaje: `El componente con Id ${id} no exite.`})
    next()
}
middleware.validateIdPart = validateIdPart

module.exports = middleware