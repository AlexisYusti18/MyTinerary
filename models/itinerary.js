const mongoose= require("mongoose")

const itinerarySchema= new mongoose.Schema({ //creo el nuevo esquema de mongoose
    title:{type:String, required: true }, 
    userimage:{type:String, required: true},
    name:{type:String, required: true},
    price:{type:Number, required: true , min:1, max: 5},
    time:{type:String, required: true},
    hashtags:[{type:String, required: true}],
    likes:[{type:Number, required: true}]
})
const Itinerary= mongoose.model('itinerary', itinerarySchema) //utilizo el metodo que crea un modelo al cual le paso dos parámetros => el nombre de la colección y el esquema
module.exports=Itinerary //exportamos el modelo