const { Componente, Producto } = require('../models')
const controller = {}
controller.componentes = Componente

const getAllParts = async (req, res)=>{
    const componentes = await Componente.find({})
    res.status(200).json(componentes)
}
controller.getAllParts = getAllParts

const getPartById = async (req, res)=>{
    const id = req.params.id
    const componente = await Componente.findOne({ 
        where: {id},
    })
    res.status(200).json(componente)
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

const updatePart = async (req,res)=>{
    const id = req.params.id
    const { nombre,descripcion } = req.body
    const componente = await Componente.findByPk(id)
    componente.nombre = nombre
    componente.descripcion = descripcion
    await componente.save()
    res.status(200).json(componente)
}
controller.updatePart = updatePart

const deleteById = async (req,res)=>{
    const idBorrado = req.params.id
    try{const row = await Componente.destroy({
        where: {id:idBorrado}
    })
    res.status(200).json({mensaje: `fila borrada ${row}`})
    }catch{
        res.status(500).json({message:'Error de borrado!'})
        }
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