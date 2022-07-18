//requiero los metodos mongoose
const mongoose= require("mongoose")

//UTILIZO EL METODO DE MONGOOSE SCHEMA PARA CREAR UN NUEVO "MODELO"
const citySchema= new mongoose.Schema({ 
    name:{type:String, required: true }, 
    image:{type:String, required: true},
    imagebanner:{type:String, required: true},
    currency:{type:String, required: true},
    language:{type:String, required: true},
    description:{type:String, required: true},
    category:{type:String, required: true},
    price:{type:String, required: true},
    itineraries:[{type: mongoose.Types.ObjectId, ref:"itineraries"}],
})
const City= mongoose.model('cities', citySchema) 
//USO DE MONGOOSE EL METODO MODEL PARA CREAR EL MODELO Y LE PASO DOS PARAMETRO: EL NOMBRE DE LA COLECCION Y EL ESQUEMA
module.exports=City //EXPORTO EL MODELO PARA LUEGO USARLO EN LOS CONTROLADORES

