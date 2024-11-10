const { Model } = require('sequelize')
const { Producto, Fabricante, Componente } = require('../models')
const controller = {}
controller.productos = Producto

const getAllProducts = async (req, res)=>{
    const productos = await Producto.findAll({})
    res.status(200).json(productos)
}
controller.getAllProducts = getAllProducts

const getProductById = async (req, res)=>{
    const id = req.params.id
    const producto = await Producto.findOne({ 
        where: {id},
    })
    res.status(200).json(producto)
}
controller.getProductById = getProductById

const createProduct = async (req, res)=>{
    const { nombre,descripcion,precio,pathImg,fabricantes } = req.body
    const producto = await Producto.create({
        nombre,
        descripcion,
        precio,
        pathImg,
        fabricantes
    })
    res.status(201).json(producto)
}
controller.createProduct = createProduct

const updateProducto = async (req,res)=>{
    const id = req.params.id
    const { nombre,descripcion,precio,pathImg,fabricantes } = req.body
    const producto = await Producto.findByPk(id)
    producto.nombre = nombre
    producto.descripcion = descripcion
    producto.precio = precio
    producto.pathImg = pathImg
    producto.fabricantes = fabricantes
    await producto.save()
    res.status(200).json(producto)
}
controller.updateProducto = updateProducto

const deleteById = async (req,res)=>{
    const idBorrado = req.params.id
    try{const row = await Producto.destroy({
        where: {id:idBorrado}
    })
    res.status(200).json({mensaje: `fila borrada ${row}`})
} catch{
    res.status(500).json({message:'Error de borrado!'})
    }
}
controller.deleteById = deleteById



const productMaker = async (req, res)=>{
    const idProd = req.params.id // id producto
    const { id } = req.body // id de fabricante
    const prod=await Producto.findByPk(idProd)
    const fabricante=await Fabricante.findByPk(id)
    await prod.addFabricante(fabricante)
    res.status(201).json(({mensaje: `Se ha asociado el fabricante con exito!`}))
}   
controller.productMaker = productMaker

const getAllProductMaker= async (req, res)=>{
    const id = req.params.id
    const prod = await Producto.findOne( {
        where: {id},
        include: {
            model: Fabricante,
            through: {attributes: []}
        }
    })
    res.status(200).json(prod)
}
controller.getAllProductMaker = getAllProductMaker

const productParts = async (req, res)=>{
    const idProd = req.params.id // id producto
    const { id } = req.body // id del componente
    const prod=await Producto.findByPk(idProd)
    const componente=await Componente.findByPk(id)
    await prod.addComponente(componente)
    res.status(201).json(({mensaje: `Se ha asociado el componente con exito!`}))
} 
controller.productParts = productParts

const getAllProductsParts= async (req, res)=>{
    const id = req.params.id
    const prod = await Producto.findOne( {
        where: {id},
        include: {
            model: Componente,
            through: {attributes: []}
        }
    })
    res.status(200).json(prod)
}
controller.getAllProductsParts = getAllProductsParts

module.exports = controller