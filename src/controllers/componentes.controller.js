const { Componente, Producto } = require('../models')
const controller = {}
controller.componentes = Componente
const mongoose = require("../db/mongo.db").mongoose;

const getAllParts = async (req, res)=>{
    const componentes = await Producto.find({},{"componentes": 1})
    res.status(200).json(componentes)
} 
  
controller.getAllParts = getAllParts

/* const getPartById = async (req, res)=>{
    const id=req.params.id
    const componentes = await Producto.find({},{"componentes": 1})
    for (const components of componentes) {
        for (const componente of components.componentes) {
             if(componente._id.toString()===id){
                return res.status(200).json(componente)
            } 
        }
    }
    res.status(400).json({message:`El objeto con id ${id} no se encuentra disponible`})
} */

const getPartById = async (req, res)=>{
    const id = req.params.id
    const prod = await Producto.findOne({'componentes._id': id})
    if(!prod){
        return res.status(400).json({message: `El componente con id ${id} no se encuentra en ningun producto`})
    } 
    const comp=prod.componentes.find(c=> c.id===id)
    return res.status(200).json(comp)
}
controller.getPartById = getPartById

const createPart = async (req, res)=>{
    const { nombre,descripcion } = req.body
    const componente = await Componente.create({
        nombre,
        descripcion,
    })
    res.status(201).json(componente)
}
controller.createPart = createPart

const updatePart1 = async (req,res)=>{
    const id = req.params.id
    const { nombre,descripcion } = req.body
    const componentes = await Producto.find({},{"componentes": 1})
    var idProd=0
    for (const components of componentes) {
        for (const componente of components.componentes) {

             if(componente._id.toString()===id){
                idProd=components._id
                //console.log(idProd)
            } 
        }
    }
    const prod= await Producto.findById(idProd.toString())
    prod.componentes.findById(id)
    console.log(prod)
    //const prueba=prod.id(id)
    res.status(200).json("prueba")
    //res.status(400).json({message:`El objeto con id ${id} no se encuentra disponible`})
}
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

const deleteById = async (req,res)=>{
    const id = req.params.id
    await Producto.updateOne({ 'componentes._id': id }, { $pull: { componentes: { _id: id } } } );
    return res.status(200).json(`El componente con id ${id} fue eliminado correctamente!`)
}
controller.deleteById = deleteById

const getAllProductsMadeWithPart = async (req,res)=>{
    const id = req.params.id
    const componente = await Componente.findOne( {
        where: {id},
        include: {
            model: Producto,
            through: {attributes: []},
        }
    })
    res.status(200).json(componente)
}
controller.getAllProductsMadeWithPart = getAllProductsMadeWithPart

module.exports = controller