const { Router } = require('express')
const route = Router()
const { productosController } = require('../controllers/index')
const { genericMiddleware,productosMiddleware } = require('../middlewares/index')
const { Producto, Fabricante } = require('../models')
const schemaValidator = require('../middlewares/schemaValidator')
const productosSchema= require('../schemas/productos.schema')
const componenteSchema= require('../schemas/componentes.schema')

route.get('/productos',productosController.getAllProducts)
route.get('/productos/:id',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),productosController.getProductById)

route.post('/productos',schemaValidator(productosSchema),productosController.createProduct)
route.put('/productos/:id',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),productosController.updateProducto)
route.delete('/productos/:id',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),productosController.deleteById) 

// Tablas Intermedias
route.post('/productos/:id/fabricantes',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),productosMiddleware.validateFormat,productosController.productMaker)
route.get('/productos/:id/fabricantes',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),productosController.getAllProductMaker)
/*Route post crea componente */
route.post('/productos/:id/componentes',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),schemaValidator(componenteSchema),productosController.productParts)
route.get('/productos/:id/componentes',genericMiddleware.validateFormatId,genericMiddleware.validateId(Producto),productosController.getAllProductsParts)

module.exports = route