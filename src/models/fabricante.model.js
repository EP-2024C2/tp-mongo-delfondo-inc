const mongoose = require('../db/mongo.db').mongoose;
const {Schema} = require("mongoose");

const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    direccion: {
        type: Schema.Types.String,
        required: true
    },
    numeroContacto: {
        type: Schema.Types.String,
        required: true
    },
    pathImgPerfil: {
        type: Schema.Types.String,
        required:true
    },
    productosId: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
},
{
  collection: "fabricantes",
})

fabricanteSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
      //delete ret.productosId;
    },
});

module.exports = mongoose.model('Fabricante', fabricanteSchema)