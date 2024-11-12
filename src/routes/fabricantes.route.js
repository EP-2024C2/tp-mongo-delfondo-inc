const { Router } = require('express')
const route = Router()
const { fabricantesController } = require('../controllers/index')
const { genericMiddleware } = require('../middlewares/index')
const { Fabricante } = require('../models')
const schemaValidator = require('../middlewares/schemaValidator')
const fabricantesSchema= require('../schemas/fabricante.schema')

route.get('/fabricantes',fabricantesController.getAllMakers)
route.get('/fabricantes/:id',genericMiddleware.validateId(Fabricante),fabricantesController.getMakerById)

route.post('/fabricantes',fabricantesController.createMaker)
route.put('/fabricantes/:id',genericMiddleware.validateId(Fabricante),fabricantesController.updateMaker)
route.delete('/fabricantes/:id',genericMiddleware.validateId(Fabricante),fabricantesController.deleteById)

// Tabla Intermedia
route.get('/fabricantes/:id/productos',genericMiddleware.validateId(Fabricante),fabricantesController.getAllProductsMade)

module.exports = route