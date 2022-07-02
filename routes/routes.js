//defino router de la cual voy a solicitar de express la funcionalidad Router que nos permite crear y definir rutas
const Router= require("express").Router();
const validator= require('../config/validator')
const passport= require('../config/passport')


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

//USER ROUTES
const usersControllers= require('../controllers/usersControllers')
const {signUp,logIn,logOut,verifyEmail,verifyToken} = usersControllers

Router.route('/signUp')
.post(validator,signUp)

Router.route('/logIn')
.post(logIn)

Router.route('/logOut')
.post(logOut)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

Router.route('/logInToken')
    //LE VOY A PASAR EL TIPO DE TOKEN QUE VA AUTENTICAR PASSPORT(jwt), LE PASO FALSE PORQUE VOY A REALIZAR UN AUTORIZACION DE USUARIO Y UNA VEZ QUE PASO POR AHI VA A LLAMAR AL CONTROLADOR VERIFYTOKEN
    .get(passport.authenticate('jwt', {session: false}), verifyToken)

module.exports= Router // EXPORTO EL MODULO ROUTER   