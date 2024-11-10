const { Router } = require('express')
const route = Router()
const { componentesController } = require('../controllers/index')
const { genericMiddleware } = require('../middlewares/index')
const { Componente } = require('../models')

route.get('/componentes',componentesController.getAllParts)
route.get('/componentes/:id',genericMiddleware.validateId(Componente),componentesController.getPartById)

route.post('/componentes', componentesController.createPart)
route.put('/componentes/:id', genericMiddleware.validateId(Componente),componentesController.updatePart)
route.delete('/componentes/:id',genericMiddleware.validateId(Componente),componentesController.deleteById)

// Tabla Intermedia
route.get('/componentes/:id/productos',genericMiddleware.validateId(Componente),componentesController.getAllProductsMadeWithPart)

module.exports = route
