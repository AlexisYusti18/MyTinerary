const mongoose= require('mongoose') //REQUIERO MONGOOSE

// USO METODO CONNECT DE MONGOOSE Y LE PASO DOS PARAMETROS(LA URI DE CONEXION(MONGO_URI) Y UN OBJETO CON 2 PROPIEDADES=> )
//CONFIGURO MI CONEXION A TRAVES DE MONGOOSE
mongoose.connect(process.env.MONGO_URI,{
    //ENVIA UN ESTADO PARA CONTROLAR LA CONEXICON CON MONGOOSE
    useUnifiedTopology:true,
    useNewUrlParser: true,
})
//RETORNA UNA PROMESA
.then(()=>console.log('DataBase Connect'))
//CATCHEA UN ERROR
.catch(err =>console.error(err))
