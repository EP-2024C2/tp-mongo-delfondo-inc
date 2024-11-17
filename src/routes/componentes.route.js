const { Router } = require('express')
const route = Router()
const { componentesController } = require('../controllers/index')
const { genericMiddleware,componentesMiddleware } = require('../middlewares/index')

route.get('/componentes',componentesController.getAllParts)
route.get('/componentes/:id',genericMiddleware.validateFormatId,componentesMiddleware.validatePartId,componentesController.getPartById)

route.put('/componentes/:id',genericMiddleware.validateFormatId,componentesMiddleware.validatePartId, componentesController.updatePart)
route.delete('/componentes/:id',genericMiddleware.validateFormatId,componentesMiddleware.validatePartId,componentesController.deleteById)

// Tabla Intermedia
route.get('/componentes/:id/productos',genericMiddleware.validateFormatId,componentesMiddleware.validatePartId,componentesController.getAllProductsMadeWithPart)

module.exports = route
