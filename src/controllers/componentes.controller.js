const { Componente, Producto } = require('../models')
const controller = {}
controller.componentes = Componente
const mongoose = require("../db/mongo.db").mongoose;
/*Esta busqueda valida los componentes en todos los productos entendiendo de que los componentes
estan vinculados a los productos por lo que esta busqueda seria obsoleta*/
const getAllParts = async (req, res)=>{
    const componentes = await Producto.find({},{"componentes": 1})
    res.status(200).json(componentes)
} 
  
controller.getAllParts = getAllParts

const getPartById = async (req, res)=>{
    const id = req.params.id
    const prod = await Producto.findOne({'componentes._id': id})
    const comp=prod.componentes.find(c=> c.id===id)
    return res.status(200).json(comp)
}
controller.getPartById = getPartById

const updatePart = async (req, res)=>{
    const id = req.params.id
    const { nombre,descripcion } = req.body
    const producto = await Producto.findOneAndUpdate(
        { 'componentes._id': id },  
        { 
            $set: { 
                'componentes.$.nombre': nombre,        
                'componentes.$.descripcion': descripcion 
            }
        },
        { new: true }
    );
    const comp=producto.componentes.find(c=> c.id===id)
    return res.status(200).json(comp)
}
controller.updatePart = updatePart

/*Este delete lo dejamos para demostrar la capacidad de borrado de un "nested path" 
entendiendo de que este endPoint no deberia existir ya que no se deberian borrar componentes asociados a un producto.*/
const deleteById = async (req,res)=>{
    const id = req.params.id
    const prod = await Producto.findOne({'componentes._id': id})
    await prod.componentes.find(c=> c.id===id).deleteOne()
    await prod.save()
    return res.status(200).json(`El componente con id ${id} fue eliminado correctamente!`)
}
controller.deleteById = deleteById
const getAllProductsMadeWithPart = async (req,res)=>{
    const id = req.params.id
    const componente = await Producto.findOne({'componentes._id': id}).select('-componentes')
    res.status(200).json(componente)
}
controller.getAllProductsMadeWithPart = getAllProductsMadeWithPart

module.exports = controller