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
    likes:{type:Array, required:true},
    activities:[{type:mongoose.Types.ObjectId, ref:"activities"}],
    // city:[{type:mongoose.Types.ObjectId, ref:"cities"}],
    comments:[{
            userId: {type:mongoose.Types.ObjectId, ref:"users"},
            comment:{type:String, required:true},
        }] 
})
const Itinerary= mongoose.model('itineraries', itinerarySchema)
module.exports=Itinerary //exportamos el modelo