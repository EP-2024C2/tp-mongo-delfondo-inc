const Joi = require('joi'); 

const productoSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(100).messages({
        "any.required": "El nombre del producto es requerido",
        "string.min": "El nombre del producto debe tener como mínimo {#limit} caracteres",
        "string.max": "El nombre del producto debe tener como máximo {#limit} caracteres",
        "string.empty": "El nombre del producto no puede estar vacío"
    }),
    descripcion: Joi.string().required().min(10).max(255).messages({
        "any.required": "La descripción es requerida",
        "string.min": "La descripción debe tener como mínimo {#limit} caracteres",
        "string.max": "La descripción no puede exceder los {#limit} caracteres",
        "string.empty": "La descripción no puede ser vacia"
    }),
    precio: Joi.number().positive().precision(2).required().messages({
        "any.required": "El precio del producto es requerido",
        "number.base": "El precio debe ser un número",
        "number.positive": "El precio debe ser un número positivo",
        "number.precision": "El precio puede tener hasta 2 decimales",
        "number.empty": "El precio no puede estar vacío"
    }),
    pathImg: Joi.string().required().messages({
        "any.required": "El path de la imagen de perfil es requerido",
        "string.min":"El path de la imagen de perfil debe tener como minimo {#limit} caracteres",
        "string.max":"El path de la imagen de perfil debe tener como maxino {#limit} caracteres",
        "string.empty":"El path de la imagen de perfil no puede ser vacio"
    }),
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido.'
});

module.exports = productoSchema;