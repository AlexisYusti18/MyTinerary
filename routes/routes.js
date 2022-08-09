const Router= require("expressa").Router();
const validator= require('../config/validator')
const passport= require('../config/passport')


//IMPORTO MIS CONTRALDORES Y LOS DESECTRUCTOR
const citiesControllers= require("../controllers/citiesControllers");
const {getCities,getOneCity,addCity,modifyCity,removeCity}= citiesControllers

const itinerarysControllers= require("../controllers/ItineraryControllers")
const {getItinerarys,getOneItinerary,addItinerary,modifyItinerary,removeItinerary,likeAndDislike}=itinerarysControllers

const usersControllers= require('../controllers/usersControllers')
const {signUp,logIn,logOut,verifyEmail,verifyToken} = usersControllers

const activitiesControllers= require('../controllers/activitiesControlles')
const {getActivities,getOneActivity,addActivity,modifyActivity,removeActivity}= activitiesControllers

const commentsControllers= require('../controllers/commentsControllers')
const {addComment,modifyComment,deleteComment}=commentsControllers

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

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)


//LA RUTA VIENE CON EL PARAEMTRO ID QUE YO LO EXTRAIGO EN EL CONTROLADOR
Router.route('/likes/:id')
//CON EL METODO PUT PASA POR PASSPORT(QUE ES EL QUE ME DEVUELVE EL ID) Y UNA VEZ QUE PASO POR PASSPORT VA A MI likeAndDislike(CONTROLADOR)=> LUEGO PARA QUE LLEGUE A LA RUTA VOY A LAS ACTIONS
.put(passport.authenticate('jwt',{session:false}),likeAndDislike)

//COMMENTS 
Router.route('/comment')
.post(passport.authenticate('jwt',{session:false}), addComment)
.put(passport.authenticate('jwt',{session:false}), modifyComment)

Router.route('/comment/:id')
.post(passport.authenticate('jwt',{session:false}), deleteComment)

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

//ACTIVITIES
Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

module.exports= Router // EXPORTO EL MODULO ROUTER   