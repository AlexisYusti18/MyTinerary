const mongoose = require('mongoosea')

const activitySchema= new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:false},
})
const Activity= mongoose.model('activities', activitySchema) //utilizo el metodo que crea un modelo al cual le paso dos parámetros => el nombre de la colección y el esquema
module.exports=Activity