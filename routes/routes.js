//defino router de la cual voy a solicitar de express la funcionalidad Router que nos permite crear y definir rutas
const Router= require("express").Router();

//importo el controlador citiesControllers
const citiesControllers= require("../controllers/citiesControllers");

//y de citiesControllers extremos los metodos de los objetos
const {getCities, getOneCity, addCity, modifyCity, removeCity}= citiesControllers

//defino las rutas

// una cities sin parametro=> son las que no tiene parametros desde citiesControllers
//get=> obtener datos
//post=> agregar datos
Router.route('/cities')
.get(getCities)
.post(addCity)

//cities pero con parametro id=> son las que tienen como parametro el id desde citiesControllers
//put=> para agregar datos
//delete=> para eliminar datos
Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

module.exports= Router   