//defino router de la cual voy a solicitar de express la funcionalidad Router que nos permite crear y definir rutas
const Router= require("express").Router();
//IMPORTO MIS CONTRALDORES Y LOS DESECTRUCTOR
const citiesControllers= require("../controllers/citiesControllers");
const {getCities, getOneCity, addCity, modifyCity, removeCity}= citiesControllers

Router.route('/cities')
.get(getCities)
.post(addCity)


Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

const itinerarysControllers= require("../controllers/ItineraryControllers")
const {getItinerarys,getOneItinerary,addItinerary,modifyItinerary,removeItinerary}=itinerarysControllers

Router.route('/itineraries')
.get(getItinerarys)
.post(addItinerary)

Router.route('/itinerarys/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

const usersControllers= require('../controllers/usersControllers')
const {signUpUsers} = usersControllers

Router.route('/signUp')
.post(signUpUsers)


module.exports= Router // EXPORTO EL MODULO ROUTER   