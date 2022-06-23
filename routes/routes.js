//defino router de la cual voy a solicitar de express la funcionalidad Router que nos permite crear y definir rutas
const Router= require("express").Router();
//IMPORTO MIS CONTRALDORES Y LOS DESECTRUCTOR
const citiesControllers= require("../controllers/citiesControllers");
const {getCities, getOneCity, addCity, modifyCity, removeCity}= citiesControllers
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

const itineraryControllers= require("../controllers/ItineraryControllers")
const {getItinerarys,getOneItinerary,addItinerary,modifyItinerary,removeItinerary}=itineraryControllers

Router.route('/itineraries')
.get(getItinerarys)
.post(addItinerary)

Router.route('/itinerarys/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

module.exports= Router // EXPORTO EL MODULO ROUTER   