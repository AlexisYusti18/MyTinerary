const Router= require("express").Router();
const validator= require('../config/validator')
const passport= require('../config/passport')


//IMPORTO MIS CONTRALDORES Y LOS DESECTRUCTOR
const citiesControllers= require("../controllers/citiesControllers");
const {getCities, getOneCity, addCity, modifyCity, removeCity}= citiesControllers

const itinerarysControllers= require("../controllers/ItineraryControllers")
const {getItinerarys,getOneItinerary,addItinerary,modifyItinerary,removeItinerary}=itinerarysControllers

const usersControllers= require('../controllers/usersControllers')
const {signUp,logIn,logOut,verifyEmail,verifyToken} = usersControllers

//CITIES
Router.route('/cities')
.get(getCities)
.post(addCity)


Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

//ITINERARIES
Router.route('/itineraries')
.get(getItinerarys)
.post(addItinerary)

Router.route('/itinerarys/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

//USER ROUTES
Router.route('/signUp')
.post(validator,signUp)

Router.route('/logIn')
.post(logIn)

Router.route('/logOut')
.post(logOut)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

//TOKEN
Router.route('/logInToken')
.get(passport.authenticate('jwt', {session: false}), verifyToken)

module.exports= Router // EXPORTO EL MODULO ROUTER   