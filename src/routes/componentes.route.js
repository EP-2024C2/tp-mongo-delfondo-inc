const { Router } = require('express')
const route = Router()
const { componentesController } = require('../controllers/index')
const { genericMiddleware } = require('../middlewares/index')
const { Componente } = require('../models')
const schemaValidator = require('../middlewares/schemaValidator')
const componentesSchema= require('../schemas/componentes.schema')

route.get('/componentes',componentesController.getAllParts)
route.get('/componentes/:id',componentesController.getPartById)

route.post('/componentes',schemaValidator(componentesSchema), componentesController.createPart)
route.put('/componentes/:id', componentesController.updatePart)
route.delete('/componentes/:id',componentesController.deleteById)

// Tabla Intermedia
route.get('/componentes/:id/productos',genericMiddleware.validateId(Componente),componentesController.getAllProductsMadeWithPart)

module.exports = route
