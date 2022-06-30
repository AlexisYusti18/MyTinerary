const mongoose=  require('mongoose')

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:Array, required:true},
    country: {type: String, required: true },
    imageUser:{type:String, required:true},
    from: {type:Array, required:true},
    uniqueString:{ type: String, required: true }, //CLAVE UNICA Y ALEATORIA PARA VERIFICAR EL USUARIO(SIRVE PARA CAMBIAR EL BOOLEAN DE FALSE A TRUE)=> CRYPTO
    userVerification:{type:Boolean, required:true} //VERIFICACION POR GMAIL
    //FROM Y PASSWORD => TIPO ARRAY PORQUE VA HACER REFERENCIA DESDE DONDE EL USUARIO INTENTA REALIZAR EL REGISTRO(PUEDE SER CON NUESTRO SIGIN O POR GOOGLE,INSTAGRAM,FACEBOOK)
})
const User= mongoose.model('user',userSchema)
module.exports=User