const { Producto, Fabricante, Componente } = require('../models')
const controller = {}
controller.productos = Producto
const mongoose = require("../db/mongo.db").mongoose;

const getAllProducts = async (req, res)=>{
    const productos = await Producto.find({})
    res.status(200).json(productos)
}
controller.getAllProducts = getAllProducts

const getProductById = async (req, res)=>{
    const id = req.params.id
    const producto = await Producto.findById(id)
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
    const { nombre,descripcion,precio,pathImg } = req.body
    const producto = await Producto.findOneAndUpdate({_id:id}, { nombre,descripcion,precio,pathImg }, {new: true})
    res.status(200).json(producto)
}
controller.updateProducto = updateProducto

const deleteById = async (req,res)=>{
    const idBorrado = req.params.id
    try{
        await Producto.findOneAndDelete({_id:idBorrado})
        res.status(200).json({mensaje: `El producto con id ${idBorrado} ha sido eliminado exitosamente.`})
    } catch(error) {
        res.status(500).json({message:'Error de borrado!'})
    }
}
controller.deleteById = deleteById



const productMaker = async (req, res)=>{
    const idProd = req.params.id
    const { id } = req.body
    const prod = await Producto.findById(idProd)
    const fabricante = await Fabricante.findById(id)
    if(!fabricante)
        return res.status(404).json({mensaje: `El fabricante con id ${id} no existe`})
    fabricante.productosId.push(prod._id)
    fabricante.save()
    res.status(201).json(({mensaje: `Se ha asociado el fabricante con exito!`}))
}    
controller.productMaker = productMaker

const getAllProductMaker= async (req, res)=>{
    const _id = new mongoose.Types.ObjectId(req.params.id);
  const productos = await Producto.aggregate([
    {
      $match: { _id },
    },
    {
      $lookup: {
        from: "fabricantes",
        localField: "_id",
        foreignField: "productosId",
        as: "fabricantes",
      },
    },
    {
      $project: {
        _id: 0,
        nombre: 1,
        descripcion: 1,
        precio: 1,
        pathImg:1,
        componentes:1,
        "fabricantes._id": 1,
        "fabricantes.direccion": 1,
        "fabricantes.contacto": 1,
        "fabricantes.pathImgPerfil":1
      },
    },
  ]);
  res.status(200).json(productos);
}
controller.getAllProductMaker = getAllProductMaker
//Hasta deleteById funciona con mongo, faltan los que siguen.
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