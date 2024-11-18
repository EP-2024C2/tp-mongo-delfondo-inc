[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/QBnwEJ5z)
# Estrategias de Persistencia - TP 2024 - Documental

Este trabajo práctico tiene como objetivo principal que los alumnos adquieran experiencia práctica en la implementación de las relaciones entre documentos en contexto de una API REST utilizando un ODM (Object-document mapping).

Uno de los criterios que se tiende a confundir es el término de bases de datos NoSQL con la ausencia de relaciones, pero la verdad es que muchas de las bases de datos NoSQL ya nos ofrecen funcionalidades que nos permiten tener cierto grado de relación entre los datos.

# Enfoques de relaciones en MongoDB

Las relaciones en MongoDB se pueden modelar en 2 enfoques diferentes: la relación incrustada o relación referenciada. La elección de estos enfoques dependerá del tipo de casuística a abordar y decisiones de modelamiento de datos.

## Relación incrustada

Relación que implica almacenar documentos secundarios incrustados dentro de un documento principal.

![Incrustada](./img/Incrustada.png)

## Relaciones referenciadas

Práctica de almacenar manualmente el campo \_id de un documento relacionado como referencia en otro documento. Esto implica que el desarrollador es responsable de mantener la coherencia de las referencias y realizar las consultas necesarias para obtener los detalles completos de los documentos relacionados.

![Referenciada](./img/Referenciada.png)

- API REST:
  Una API REST (Representational State Transfer) es un conjunto de reglas y convenciones para la creación de servicios web que permiten la comunicación entre sistemas. En este trabajo práctico, utilizaremos una API REST para exponer recursos y permitir operaciones CRUD (Create, Read, Update, Delete) sobre estos recursos.

- Enfoque Práctico:
  Los alumnos implementarán las relaciones ustilizando el enfoque que considen conveniente en cada caso en el contexto de una API REST utilizando un ODM específico, Mongoose. Se espera que los alumnos comprendan cómo definir modelos, establecer relaciones entre ellos y utilizar las capacidades del ODM para interactuar con la base de datos documental.

- Criterios de Evaluación:
  Se evaluará la precisión y completitud en la implementación de las asociaciones en la API REST, así como la funcionalidad completa del CRUD para los recursos expuestos por la API.

## Descripción del Proyecto

Han sido contratados/as por una empresa de manufactura para desarrollar un sistema interno de gestión de productos. La empresa fabrica una amplia gama de productos tecnológicos que requieren componentes específicos y son producidos por múltiples fabricantes asociados. Actualmente, el proceso de gestión de esta información es manual y está descentralizado, lo que genera demoras y problemas en la producción. La empresa busca automatizar y centralizar estos datos mediante un sistema web eficiente que permita gestionar los productos, fabricantes y componentes de manera integrada.

## Modelo Documental a implementar

Basandose en el siguiente diagrama de entidad-relacion (DER) utilizado para una base de datos relacional deberán deberán migrarlo a una base documental utilizando los críterios que consideren conveniente en cada caso. Relación Incrustada o Rleación Referenciada.

![DER](./img/DER.png)

### Descripción del modelo DER

- Un **Producto** puede tener muchos fabricantes, y un **Fabricante** puede fabricar muchos productos.
- Un **Producto** puede tener muchos componentes, y un **Componente** puede formar parte de varios productos.

### Base de datos

El motor de base de datos a utilizar deberá ser **Mongo DB**. Se recomeniendo utilizar el archivo docker compose incluido en este proyecto para que puedan instanciar el motor de base de datos y un cliente del mismo para consultar las colecciones de forma dockerizada.

### Intalacion de dependencias

Debera contar con las dependencias de produccion y desarrollo necesarias de un proyecto node. Por ejemplo:

`npm i mongoose express`

`npm i -D nodemon`

### Tips - Conexión a un base de datos

```
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL || 'mongodb://admin:admin1234@localhost:27017/seriesMongo?authSource=admin'
async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log('Conexión a mongo con éxito');
    } catch (err) {
        console.error('Error al conectarse a mongo', err);
    }
}

module.exports = {connectToDatabase, mongoose}
```

- Ejemplo de como generar un modelo simple

```
const mongoose = require('./db').mongoose;

const seriesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    temporada: {
        type: Number,
        required: true,
    },
    genero: {
        type: String,
    },
    capitulos: [{
        titulo: { type: String, required: true },  // Título del capítulo
        duracion: { type: Number },  // Duración en minutos
        numero: { type: Number },  // Número de capítulo en la temporada
        descripcion: { type: String }  // Breve descripción del capítulo
    }]
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
```

## API

Implementar la API utilizando el framework express en el entorde de ejecucion de un poryecto NodeJs. Organizar el código en rutas, controlers y middleware utilizando la separación por recurso. A continuación se detallan los endpoinds que deberán estar disponbiles en la API.

| Verbo  | Recurso                    | Status code   | Descripción                                           |
| ------ | -------------------------- | ------------- | ----------------------------------------------------- |
| GET    | /productos                 | 200           | Obtener todos los productos                           |
| GET    | /productos/:id             | 200, 404      | Obtener un producto en particular                     |
| POST   | /productos                 | 201, 400      | Crear un producto                                     |
| PUT    | /productos/:id             | 200, 404      | Modificar los datos de un producto en particular      |
| DELETE | /productos/:id             | 200, 404, 500 | Borrar un producto en particular                      |
| POST   | /productos/:id/fabricantes | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes |
| GET    | /productos/:id/fabricantes | 200, 404      | Obtener todos los fabricantes de un producto          |
| POST   | /productos/:id/componentes | 201, 404, 400 | Crear la asociación de producto con 1 o N componentes |
| GET    | /productos/:id/componentes | 200, 404      | Obtener todos los componentes de un producto          |
| GET    | /fabricantes               | 200           | Obtener todos los fabricantes                         |
| GET    | /fabricantes/:id           | 200, 404      | Obtener un fabricante en particular                   |
| POST   | /fabricantes               | 201, 400      | Crear un fabricante                                   |
| PUT    | /fabricantes/:id           | 200, 404      | Modificar los datos de un fabricante en particular    |
| DELETE | /fabricantes/:id           | 200, 404, 500 | Borrar un fabricante en particular                    |
| GET    | /fabricantes/:id/productos | 200, 404      | Obtener todos los productos de un fabricante          |
| GET    | /componentes               | 200           | Obtener todos los componentes                         |
| GET    | /componentes/:id           | 200, 404      | Obtener un componente en particular                   |
| POST   | /componentes               | 201, 400      | Crear un componente                                   |
| PUT    | /componentes/:id           | 200, 404      | Modificar los datos de un componente en particular    |
| DELETE | /componentes/:id           | 200, 404, 500 | Borrar un componente en particular                    |
| GET    | /componentes/:id/productos | 200, 404      | Obtener todos los productos de un componente          |

## Ejemplos

A modo de ejemplo se muestra el resultado de algunas respuesta de los endpoind detallado en la tabla de la sección anterior.

Recurso: **_/fabricantes/1/productos_**

Obtiene los datos del fabricante registrado con el id 1, con todos los productos que fabrica, incluyendo los atributos de cada producto y los componentes asociados a esos productos.

```
{
    "id": 1,
    "nombre": "TechCorp",
    "direccion": "1234 Elm St, Ciudad",
    "contacto": "+123456789",
    "pathImgPerfil": "/images/fabricantes/techcorp.jpg",
    "productos": [
        {
            "id": 1,
            "nombre": "Laptop X200",
            "descripcion": "Una laptop de alto rendimiento",
            "precio": 1200.99,
            "pathImg": "/images/productos/laptop-x200.jpg",
            "componentes": [
                {
                    "id": 1,
                    "nombre": "Procesador Intel i7",
                    "descripcion": "Procesador de octava generación"
                },
                {
                    "id": 2,
                    "nombre": "SSD 1TB",
                    "descripcion": "Disco sólido de 1TB de capacidad"
                }
            ]
        },
        {
            "id": 2,
            "nombre": "Smartphone S5",
            "descripcion": "Teléfono inteligente con pantalla OLED",
            "precio": 799.99,
            "pathImg": "/images/productos/smartphone-s5.jpg",
            "componentes": [
                {
                    "id": 3,
                    "nombre": "Pantalla OLED 6.5 pulgadas",
                    "descripcion": "Pantalla de alta definición"
                },
                {
                    "id": 4,
                    "nombre": "Batería 4000mAh",
                    "descripcion": "Batería de larga duración"
                }
            ]
        }
    ]
}
```

Recurso: **_/productos/1/fabricantes_**

Obtiene los datos del producto registrado con el id 1, con todos los fabricantes que lo producen, incluyendo los atributos de cada fabricante.

```
{
    "id": 1,
    "nombre": "Laptop X200",
    "descripcion": "Una laptop de alto rendimiento",
    "precio": 1200.99,
    "pathImg": "/images/productos/laptop-x200.jpg",
    "fabricantes": [
        {
            "id": 1,
            "nombre": "TechCorp",
            "direccion": "1234 Elm St, Ciudad",
            "contacto": "+123456789",
            "pathImgPerfil": "/images/fabricantes/techcorp.jpg"
        },
        {
            "id": 2,
            "nombre": "Innovatech",
            "direccion": "4567 Oak Ave, Ciudad",
            "contacto": "+987654321",
            "pathImgPerfil": "/images/fabricantes/innovatech.jpg"
        }
    ]
}
```

## Consideraciones Finales sobre la Entrega

- Deberán fundamentar las decisiones tomadas respecto de enfoque utilizado en cada relación dentro del archvivo README.md
- El equipo debera entegar un repositorio de github con todas las instrucciones necesarias para correr la api.
- Deberán detallar los commandos necesarios para la instalación y ejecución de la api.
- El puerto de listener deberá ser configurable por variable de entorno

## BONUS

- Investigar como dockerizar la aplicación en node, es decir, generar una imagen de su aplicacion, versionarla y luego poder por a correr la apliación en un contendor.
