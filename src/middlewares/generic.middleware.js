const middleware = {}

const validateId = (model) => { return async (req, res, next) => {
        const id = req.params.id
        await model.findByPk(id).then(result => {
            if(!result)
                return res.status(400).json({message: `El ${model.name} con id ${id} no existe`})
            next()
        })
    }
}
middleware.validateId = validateId

const requestTime = (req, _ , next) => {
    console.log({ url: req.url , fechaHora: new Date() })
    next()
}
middleware.requestTime = requestTime

module.exports = middleware