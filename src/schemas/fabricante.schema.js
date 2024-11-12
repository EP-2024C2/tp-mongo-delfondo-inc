const Joi = require('joi');

const fabricanteSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(100).messages({
        "any.required": "El nombre del fabricante es requerido",
        "string.min": "El nombre del fabricante debe tener como mínimo {#limit} caracteres",
        "string.max": "El nombre del fabricante debe tener como máximo {#limit} caracteres",
        "string.empty": "El nombre del fabricante no puede estar vacío"
    }),
    direccion: Joi.string().required().min(3).max(255).messages({
        "any.required": "La dirección del fabricante es requerida",
        "string.min": "La dirección debe tener como mínimo {#limit} caracteres",
        "string.max": "La dirección debe tener como máximo {#limit} caracteres",
        "string.empty": "La dirección no puede estar vacía",
    }),
    contacto: Joi.string().required().min(8).max(13).messages({
        "any.required": "El contacto del fabricante es requerido",
        "string.min": "El número de contacto debe tener como minimo {#limit} caracteres",
        "string.max": "El número de contacto debe tener como maxino {#limit} caracteres",
        "string.empty": "El contacto no puede estar vacío"
    }),
    pathImgPerfil: Joi.string().required().messages({
        "any.required": "El path de la imagen de perfil es requerido",
        "string.min":"El path de la imagen de perfil debe tener como minimo {#limit} caracteres",
        "string.max":"El path de la imagen de perfil debe tener como maxino {#limit} caracteres",
        "string.empty":"El path de la imagen de perfil no puede ser vacio"
    }),
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido.'
});

module.exports = fabricanteSchema;