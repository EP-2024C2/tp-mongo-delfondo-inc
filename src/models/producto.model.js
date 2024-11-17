const mongoose = require('../db/mongo.db').mongoose;
const {Schema} = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    descripcion: {
        type: Schema.Types.String,
        required: true
    },
    precio: {
        type: Schema.Types.Number,
        required: true
    },
    pathImg: {
        type: Schema.Types.String,
        required:true
    },
    componentes: [{ 
        nombre: { type: String, required: true }, 
        descripcion: { type: String, required: true }
    }]
    },
{
  collection: "productos",
})

productoSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
      if(ret.componentes){
        ret.componentes = ret.componentes.map(c => {
            const {_id, ...componente} = c
            return componente
      })}
    },
});

module.exports = mongoose.model('Producto', productoSchema);