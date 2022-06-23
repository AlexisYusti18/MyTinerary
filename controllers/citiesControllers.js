//importo el modelo de cities
const City= require('../models/city')

//creo una constante que tiene un objecto y que cada propiedad de ese objeto es un metodo de objeto
const cityControllers={
   
    getCities : async (req,res)=>{ //funciona asincrona que crear las city
        let cities //variable que va a tener la nueva ciudad
        let error=null // defino el error que en primer instancia en null

        try{
            cities= await City.find().populate("itineraries")  //espero esa creacion y utilizo el metodo find() que acciona como un filtro y nos devuelve los datos de la coleccion
        } catch (err) {error= err}
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
            city= await City.findOne({_id: id}).populate("itineraries").populate("itineraries2") //finOne acciona como filtro y aca le indico un id que de la coleccion sea igual al id enviado por parametro ||METODO-MONGOOSE
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' : city,
        success: error ? false : true,
        error: error
        })
},
    addCity: async (req, res)=>{
        let city 
        let error=null
        const{name, country,image,imagebanner,currency,language,description}= req.body.data
        try{
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
            citydb= await City.findOneAndUpdate({_id:id}, city, {new: true}) //
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