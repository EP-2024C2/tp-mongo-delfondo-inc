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

const deleteById = async (req, res) => {
  try{
    await Producto.findOneAndDelete({_id:req.params.id})
    await Fabricante.updateMany(
      { productosId: req.params.id },
      { $pull: { productosId: req.params.id } }
    )
    res.status(200).json({mensaje: `El producto con id ${req.params.id} ha sido eliminado exitosamente.`})
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
    const existe=fabricante.productosId.find(id=>id._id==idProd)
    if(existe){
        return res.status(409).json({mensaje: `El producto con id ${idProd} ya ha sido asociado con anterioridad`})
    }
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
        "fabricantes.nombre": 1,
        "fabricantes.direccion": 1,
        "fabricantes.numeroContacto": 1,
        "fabricantes.pathImgPerfil":1
      },
    },
  ]);
  res.status(200).json(productos);
}
controller.getAllProductMaker = getAllProductMaker
//Hasta deleteById funciona con mongo, faltan los que siguen.

// Este agrega un componente
const productParts = async (req, res)=>{
  const idProd = req.params.id // id producto
  const promesa = req.body
  const componentes = typeof promesa === 'object' ? {componentes: promesa} : {componentes: {$each:promesa}}
  try{
    const producto=await Producto.findByIdAndUpdate(idProd,
      {$push: componentes},
      {new:true}
    );
    res.status(201).json((producto.componentes[producto.componentes.length -1]))
  } catch(error){
    res.status(500).json({error: 'No pudo crearse el componente'})
  }
} 
controller.productParts = productParts

// Este deberia estar
const getAllProductsParts= async (req, res)=>{
  const id = req.params.id
  const producto = await Producto.findById(id)
  const parts = await producto.componentes
  res.status(200).json(parts)
}
controller.getAllProductsParts = getAllProductsParts

module.exports = controller