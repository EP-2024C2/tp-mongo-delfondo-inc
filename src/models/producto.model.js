const mongoose = require('../db/mongo.db').mongoose;
const {Schema} = require("mongoose");

const componenteSchema = new Schema({ 
    nombre: { 
        type: String, 
        required: true 
    }, 
    descripcion: { 
        type: String, 
        required: true 
    }
})

componenteSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    },
});

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
    },
    fabricantes: [{
        type: Schema.Types.ObjectId,
        ref: 'Fabricante'
    }],
    componentes: [componenteSchema]
})

productoSchema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    },
});

module.exports = mongoose.model('Producto', productoSchema);