const mongoose = require('./db').mongoose;
const {Schema} = require("mongoose");

const componenteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
        },
    descripcion: {
        type: Schema.Types.String,
        required: false
        },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
})

componenteSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    },
});

module.exports = mongoose.model('Componente', componenteSchema)