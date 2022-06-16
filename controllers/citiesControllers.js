//importo el modelo de cities
const City= require('../models/city')

//creo una constante que tiene un objecto y que cada propiedad de ese objeto es un metodo de objeto
const cityControllers={
   
    getCities : async (req,res)=>{
        let cities
        let error=null

        try{
            cities= await City.find()
        } catch (err) {error= err}
        //respuesta en formato JSON en donde response si no es error me duelve los datos que contenga cities , si es succes y no es error devulve true y si no hay un error devulve null
        res.json({
        response: error ? 'ERROR' : {cities},
        success: error ? false : true,
        error: error
        })

},
    getOneCity: async (req, res)=>{
        const id= req.params.id
        let city
        let error= null

        try{
            city= await City.findOne({_id: id})
        } catch (err) {error= err}

        res.json({
        response: error ? 'ERROR' : city,
        success: error ? false : true,
        error: error
        })
},
    addCity: async (req, res)=>{
        let city //defino variable que va a contener la ciudad 
        let error=null // defino el error y lo defino como nulo
        //solicita  enviar los datos por el body en nombre de variable data
        const{name, country,image,imagebanner,currency,language,description}= req.body.data
        try{
            //new es un contructor , espero la creacion de un modelo
            city= await new City({
                name: name,
                country:country,
                image:image,
                imagebanner:imagebanner,
                currency:currency,
                language:language,
                description: description,
            }).save()
        }catch(err){
            error= err}
        //el metodo intenta crear una nueva ciudad entonces si no puede crear tengo que hagarra el error que me muestra para poder reparalo
        
        res.json({
        response: error ? 'ERROR' : city,
        success: error ? false : true,
        error: error
        })
},
    modifyCity: async (req,res)=>{
        const id= req.params.id
        const city= req.body.data
        let citydb
        let error= null
        
        try{
            citydb= await City.findOneAndUpdate({_id:id}, city, {new: true})
        } catch (err) {error= err}

        res.json({
        response: error ? 'ERROR' : city,
        success: error ? false : true,
        error: error
        })
},  
    removeCity: async (req, res)=>{
        const id=  req.params.id
        let city
        let error= null
        try{
            city= await City.findOneAndDelete({_id:id})
        } catch (err) {error= err}

        res.json({
        response: error ? 'ERROR' : city,
        success: error ? false : true,
        error: error
        })
    }
 }
module.exports= cityControllers