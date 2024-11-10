console.log(`Trabajo Practico de Estrategias de Persistencia.....`)

const express = require('express')
const routes = require('./routes')
const {genericMiddleware} = require('./middlewares')
const dbCon = require("./db/mongo.db").connectToDatabase;
const app = express()
const mongoose = require("./db/mongo.db").mongoose
const PORT = process.env.PORT ?? 5000

app.use(express.json())

app.use(genericMiddleware.requestTime)
app.use(routes.productosRoute)
app.use(routes.fabricantesRoute)
app.use(routes.componentesRoute)
app.listen(PORT, async ()=>{
    await dbCon()
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})