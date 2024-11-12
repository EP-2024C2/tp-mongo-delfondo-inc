const { Fabricante, Producto, Componente } = require('../models')
const controller = {}
controller.fabricantes = Fabricante

const getAllMakers = async (req, res)=>{
    const fabricantes = await Fabricante.find({})
    res.status(200).json(fabricantes)
}
controller.getAllMakers = getAllMakers

const getMakerById = async (req, res)=>{
    const id = req.params.id
    const fabricante = await Fabricante.findById(id)
    res.status(200).json(fabricante)
}
controller.getMakerById = getMakerById

const createMaker = async (req, res)=>{
    const fabricante = await Fabricante.create(req.body)
    res.status(201).json(fabricante)
}
controller.createMaker = createMaker

const updateMaker = async (req,res)=>{
    const fabricante = await Fabricante.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
    res.status(200).json(fabricante)
}
controller.updateMaker = updateMaker

const deleteById = async (req,res)=>{
    const idBorrado = req.params.id
    try{
        await Fabricante.findOneAndDelete({_id:idBorrado})
        res.status(200).json({mensaje: `El fabricante con id ${idBorrado} ha si eliminado exitosamente.`})
    } catch(error) {
        res.status(500).json({message:'Error de borrado!'})
    }
}
controller.deleteById = deleteById

const getAllProductsMade = async (req,res)=>{
    const id = req.params.id
    const fabricante = await Fabricante.findOne( {
        where: {id},
        include: {
            model: Producto,
            through: {attributes: []},
            include: {
                model: Componente,
                through: {attributes: []}
            }
        }
    })
    res.status(200).json(fabricante)
}
controller.getAllProductsMade = getAllProductsMade

module.exports = controller