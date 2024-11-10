const mongoose = require('./db').mongoose;
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
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
})

fabricanteSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    },
});

module.exports = mongoose.model('Fabricante', fabricanteSchema)