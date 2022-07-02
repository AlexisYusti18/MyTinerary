const passport=require('passport')
const jwtStrategy= require('passport-jwt').Strategy //REQUIERO STRATEGY(UNA CLASE) DEL PAQUETE passport-jwt => VOY A FIJAR QUE VOY HACER CON EL TOKEN QUE ME LLEGA
const extractJwt= require('passport-jwt').ExtractJwt//REQUIERO EXTRACTJWT(UNA CLASE) DEL PAQUETE passport-jwt => LO VOY A USAR PARA LA EXTRACCION 

const User= require('../models/user') //REQUIERO MI MODELO USUARIO

//CREO UN MODULO EXPORTABLE, DONDE VOY A USAR PASSPOR Y LE VOY A DECIR QUE VA A USAR UNA NUEVA JTW STRATEGY
module.exports= passport.use(new jwtStrategy({
    //DEFINO UN OBJECT QUE VA A TENER DOS PROPIEDADES :
    
    //LA PRIMERA PROPIEDAD VA A UTILIZAR EXTRACTJTW EN SU METODO fromAuthHeaderAsBearerToken()=> DE LA AUORIZACION DE LA CABECERA PROVENIENTE COMO BEARER TOKEN
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    //Y LA SEGUNDA PROPIEDAD VA SER LA SECRET_KEY => SIN ESTA DATO EL TOKEN NO PUEDE SER DESIFRADO
    secretOrKey: process.env.SECRET_KEY

    //Y DEL TOKEN VOY A EXTRAER EL PAYLOAD=> SERIAN LOS DATOS DEL USUARIO
},(jtw_payload, done)=>{
    
    //VA A BUSCAR EN MI BASE DE DATOS DE USUARIO, UN USUARIO DONDE SU ID CONCIDA CON EL ID QUE YO LE HAYA PASADO EN EL PAYLOAD
    User.findOne({_id:jtw_payload.id})

    .then((user)=>{
        //console.log(user)
        if(!user){
            //SI EL USUARIO EXISTE VA A PASAR HACIA EL CONTROLADOR ERROR NULL Y EL DATO DEL USUARIO
            return done(null, false)
        }
        // else if(error) {
        //     console.log(error)
        //     //SI NO EXISTE VA A PASAR ERROR Y FALSE
        //     return done(error,false) 
        // }
        else {
            //Y SI NO PASA NINGUNO DE LAS CONDICIONES ANTERIORES VA A PARAR ERROR NUL Y FALSE 
            return done(null,user)
        }
    })
    .catch(error=>{
        //Y SI CACHEO UN ERROR EN EL PROCESO ME VA A RETORNAR EL ERROR
        console.log(error.status)
        return done(error, false)
        //ERROR QUE LEUGO LLEGA COMO 401
    })
}))