const Itinerary=require('../models/itinerary')

const itineraryControllers={
    getItinerarys : async (req,res)=>{ //funciona asincrona que crear las city
        let itinerarys //variable que va a tener la nueva ciudad
        let error=null // defino el error que en primer instancia en null

        try{
            itinerarys= await Itinerary.find().populate("cities", {name:1}) //espero esa creacion y utilizo el metodo find() que acciona como un filtro y nos devuelve los datos de la coleccion
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' : {itinerarys},
        success: error ? false : true,
        error: error
        })
    },
    getOneItinerary: async (req, res)=>{
        const id= req.params.id
        let itinerary
        let error= null

        try{
            itinerary= await Itinerary.findOne({_id: id}) //finOne acciona como filtro y aca le indico un id que de la coleccion sea igual al id enviado por parametro ||METODO-MONGOOSE
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' : itinerary,
        success: error ? false : true,
        error: error
        })
    },
    addItinerary: async (req, res)=>{
        let itinerary 
        let error=null
        const{title, userimage,name,price,time,tag,tag2,tag3,likes,cities}= req.body
        try{
            itinerary= await new Itinerary({ 
                title:title,
                userimage:userimage,
                name: name,
                price:price,
                time:time,
                tag:tag,
                tag2:tag2,
                tag3:tag3,
                likes: likes,
                cities:cities}).save()
            }catch(err){
            error= err}
        res.json({
        response: error ? 'ERROR' : itinerary,
        success: error ? false : true,
        error: error
        })
    },
    modifyItinerary: async (req,res)=>{
        const id= req.params.id
        const itinerary= req.body
        let itinerarydb
        let error= null
        
        try{
            itinerarydb= await Itinerary.findOneAndUpdate({_id:id}, itinerary, {new: true}) //
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' : itinerary,
        success: error ? false : true,
        error: error
        })
    },  
    removeItinerary: async (req, res)=>{
        const id=  req.params.id
        let itinerary
        let error= null
        try{
            itinerary= await Itinerary.findOneAndDelete({_id:id})
        } catch (err) {error= err}

        res.json({
        response: error ? 'ERROR' : itinerary,
        success: error ? false : true,
        error: error
        })
    }
}
module.exports= itineraryControllers