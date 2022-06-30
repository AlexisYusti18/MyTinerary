//defino router de la cual voy a solicitar de express la funcionalidad Router que nos permite crear y definir rutas
const Router= require("express").Router();
const validator= require('../config/validator')





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

//USER CONTROLLERS
const usersControllers= require('../controllers/usersControllers')
const {signUp, logIn, verifyEmail} = usersControllers

Router.route('/signUp')
.post(validator,signUp)

Router.route('/logIn')
.post(validator,logIn)

Router.route('/verify/:string')
.get(verifyEmail)

module.exports= Router // EXPORTO EL MODULO ROUTER   