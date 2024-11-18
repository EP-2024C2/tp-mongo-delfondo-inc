# Estrategias de Persistencia - TP 2024 - Documental

Uno de los criterios que se tiende a confundir es el término de bases de datos NoSQL con la ausencia de relaciones, pero la verdad es que muchas de las bases de datos NoSQL ya nos ofrecen funcionalidades que nos permiten tener cierto grado de relación entre los datos.

# Enfoques de relaciones en MongoDB

Las relaciones en MongoDB se pueden modelar en 2 enfoques diferentes: la relación incrustada o relación referenciada. La elección de estos enfoques dependerá del tipo de casuística a abordar y decisiones de modelamiento de datos.

## Relación incrustada

Relación que implica almacenar documentos secundarios incrustados dentro de un documento principal.

Tomamos la decision de adoptar este tipo de relacion entre Producto y Componente, ya que estan fuertemente vinculados ( asumiendo que los datos que necesito de un componente son seriales) y en nuestro modelo no se somete a cambios frecuentes. Dentro de este tipo de relacion Mongoose nos ofrece 2 enfoques: Subdocuments y Nested, basicamente es tener los subdocumentos como esquemas incrustados o declarados explicitamente como un array. De estos optamos por el segundo: anidado.

![Incrustada](./img/Incrustada.png)

## Relaciones referenciadas

Práctica de almacenar manualmente el campo \_id de un documento relacionado como referencia en otro documento. Esto implica que el desarrollador es responsable de mantener la coherencia de las referencias y realizar las consultas necesarias para obtener los detalles completos de los documentos relacionados.

Tomamos la decision de adoptar este tipo de relacion entre Producto y Fabricante, para dotar de cierta independencia a fabricantes que podrian crear el mismo producto.

![Referenciada](./img/Referenciada.png)

- API REST:
  Una API REST (Representational State Transfer) es un conjunto de reglas y convenciones para la creación de servicios web que permiten la comunicación entre sistemas. En este trabajo práctico, utilizaremos una API REST para exponer recursos y permitir operaciones CRUD (Create, Read, Update, Delete) sobre estos recursos.

## Descripción del Proyecto

Han sido contratados/as por una empresa de manufactura para desarrollar un sistema interno de gestión de productos. La empresa fabrica una amplia gama de productos tecnológicos que requieren componentes específicos y son producidos por múltiples fabricantes asociados. Actualmente, el proceso de gestión de esta información es manual y está descentralizado, lo que genera demoras y problemas en la producción. La empresa busca automatizar y centralizar estos datos mediante un sistema web eficiente que permita gestionar los productos, fabricantes y componentes de manera integrada.

## Modelo Documental a implementar

![DER](./img/DER.png)

### Descripción del modelo DER

- Un **Producto** puede tener muchos fabricantes, y un **Fabricante** puede fabricar muchos productos.
- Un **Producto** puede tener muchos componentes, y un **Componente** puede formar parte de varios productos.

### Base de datos

El motor de base de datos utilizado es **Mongo DB**. Utiliza el archivo docker compose incluido en este proyecto para poder instanciar el motor de base de datos y un cliente del mismo para consultar las colecciones de forma dockerizada.

### Correr la App en desarrollo 

npm i
npm run dev

### Dockerizar la app

docker-compose up -d

Crear Imagen con Version: docker build -t app:1.0.0 .

### Ejecutarlo en puerto modificado por variable de entorno

docker run -p 4000:3000 -e PORT=3000 app:1.0.0

## API

 La API utiliza el framework express en el entorde de ejecucion de un proyecto NodeJs. Esta organizado el código en rutas, controllers y middlewares utilizando la separación por recurso. A continuación se detallan los endpoinds disponibles en la API.

| Verbo  | Recurso                    | Status code   | Descripción                                           |
| ------ | -------------------------- | ------------- | ----------------------------------------------------- |
| GET    | /productos                 | 200           | Obtener todos los productos                           |
| GET    | /productos/:id             | 200, 404      | Obtener un producto en particular                     |
| POST   | /productos                 | 201, 400      | Crear un producto                                     |
| PUT    | /productos/:id             | 200, 404      | Modificar los datos de un producto en particular      |
| DELETE | /productos/:id             | 200, 404, 500 | Borrar un producto en particular                      |

| GET    | /fabricantes               | 200           | Obtener todos los fabricantes                         |
| GET    | /fabricantes/:id           | 200, 404      | Obtener un fabricante en particular                   |
| POST   | /fabricantes               | 201, 400      | Crear un fabricante                                   |
| PUT    | /fabricantes/:id           | 200, 404      | Modificar los datos de un fabricante en particular    |
| DELETE | /fabricantes/:id           | 200, 404, 500 | Borrar un fabricante en particular           		  |

| GET    | /componentes               | 200           | Obtener todos los componentes                         |
| GET    | /componentes/:id           | 200, 404      | Obtener un componente en particular                   |
| POST   | /productos/:id/componentes | 201, 404, 400 | Crear Componente o Varios[{},{}] dentro de un Producto|
| PUT    | /componentes/:id           | 200, 404      | Modificar los datos de un componente en particular    |
| DELETE | /componentes/:id           | 200, 404, 500 | Borrar un componente en particular                    |

| POST   | /productos/:id/fabricantes | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes, necesita en el body el id del fabricante. |
| GET    | /productos/:id/fabricantes | 200, 404      | Obtener todos los fabricantes de un producto          |
| GET    | /productos/:id/componentes | 200, 404      | Obtener todos los componentes de un producto          |
| GET    | /fabricantes/:id/productos | 200, 404      | Obtener todos los productos de un fabricante          |
| GET    | /componentes/:id/productos | 200, 404      | Obtener el producto asociado a un componente          |
