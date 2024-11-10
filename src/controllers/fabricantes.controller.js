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
    const fabricante = await Fabricante.findOne({ 
        where: {id},
    })
    res.status(200).json(fabricante)
}
controller.getMakerById = getMakerById

const createMaker = async (req, res)=>{
    const { nombre,direccion,contacto,pathImgPerfil,productos } = req.body
    const fabricante = await Fabricante.create({
        nombre,
        direccion,
        contacto,
        pathImgPerfil,
        productos
    })
    res.status(201).json(fabricante)
}
controller.createMaker = createMaker

const updateMaker = async (req,res)=>{
    const id = req.params.id
    const { nombre,direccion,contacto,pathImgPerfil,productos } = req.body
    const fabricante = await Fabricante.findByPk(id)
    fabricante.nombre = nombre
    fabricante.direccion = direccion
    fabricante.contacto = contacto
    fabricante.pathImgPerfil = pathImgPerfil
    fabricante.productos = productos
    await fabricante.save()
    res.status(200).json(fabricante)
}
controller.updateMaker = updateMaker

const deleteById = async (req,res)=>{
    const idBorrado = req.params.id
    try{const row = await Fabricante.destroy({
        where: {id:idBorrado}
    })
    res.status(200).json({mensaje: `fila borrada ${row}`})
    }catch{
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