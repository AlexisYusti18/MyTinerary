const mongoose= require("mongoose")

const itinerarySchema= new mongoose.Schema({ //creo el nuevo esquema de mongoose
    title:{type:String, required: true }, 
    userimage:{type:String, required: true},
    name:{type:String, required: true},
    price:{type:Number, required: true},
    time:{type:Number, required: true},
    tag:{type:String, required: true},
    tag2:{type:String, required: true},
    tag3:{type:String, required: true},
    likes:{type:Array, required: true},
    activities:{type:String, required:false},
    cities:{type: mongoose.Types.ObjectId, ref:'cities'}
})
const Itinerary= mongoose.model('itineraries', itinerarySchema) //utilizo el metodo que crea un modelo al cual le paso dos parámetros => el nombre de la colección y el esquema
module.exports=Itinerary //exportamos el modelo