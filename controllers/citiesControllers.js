//importo el modelo de cities
const City= require('../models/city')

//creo una constante que tiene un objecto y que cada propiedad de ese objeto es un metodo de objeto
const cityControllers={
   
    getCities : async (req,res)=>{ //FUNCIONA ASINCRONA QUE OBTIENE LAS CIUDADES
        let cities
        let error=null // DEFINO UNA VARIABLE ERROR QUE EN PRIMER INSTANCIA EN NULL

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
        const id= req.params.id //REQUIERE PARAMETRO ID
        let city
        let error= null

        try{
            city= await City.findOne({_id: id}).populate("itineraries") //finOne acciona como filtro y aca le indico un id que de la coleccion sea igual al id enviado por parametro ||METODO-MONGOOSE
        } catch (err) {error= err}
        //DEVUELVE UNA RESPUESTA LA CUAL DEVUELVE Y ES CAPTURADA EN EL FRONTEND
        res.json({
        response: error ? 'ERROR' : city,
        success: error ? false : true,
        error: error
        })
},
    addCity: async (req, res)=>{
        let city 
        let error=null
        const{name, country,image,imagebanner,currency,language,description}= req.body.data //REQUIERE EL BODY
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
            console.log(err);
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