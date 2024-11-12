const { Router } = require('express')
const route = Router()
const { productosController } = require('../controllers/index')
const { genericMiddleware } = require('../middlewares/index')
const { Producto } = require('../models')
const schemaValidator = require('../middlewares/schemaValidator')
const productosSchema= require('../schemas/productos.schema')

route.get('/productos',productosController.getAllProducts)
route.get('/productos/:id',genericMiddleware.validateId(Producto),productosController.getProductById)

route.post('/productos', productosController.createProduct)
route.put('/productos/:id', genericMiddleware.validateId(Producto),productosController.updateProducto)
route.delete('/productos/:id',genericMiddleware.validateId(Producto),productosController.deleteById) 

// Tablas Intermedias
route.post('/productos/:id/fabricantes',genericMiddleware.validateId(Producto),productosController.productMaker)
route.get('/productos/:id/fabricantes',genericMiddleware.validateId(Producto),productosController.getAllProductMaker)
route.post('/productos/:id/componentes',genericMiddleware.validateId(Producto),productosController.productParts)
route.get('/productos/:id/componentes',genericMiddleware.validateId(Producto),productosController.getAllProductsParts)

module.exports = route