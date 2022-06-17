//requiero los metodos mongoose
const mongoose= require("mongoose")

const citySchema= new mongoose.Schema({ //creo el nuevo esquema de mongoose
    name:{type:String, required: true }, 
    image:{type:String, required: true},
    imagebanner:{type:String, required: true},
    currency:{type:String, required: true}, //le pasamos un objeto con los nombres de las propiedades y las caracteristicas de cada una
    language:{type:String, required: true},
    description:{type:String, required: true},
})
const City= mongoose.model('city', citySchema) //utilizo el metodo que crea un modelo al cual le paso dos parámetros => el nombre de la colección y el esquema
module.exports=City //exportamos el modelo

