//importo el modelo de cities
const City= require('../models/city')


const cityControllers={
   
    getCities : async (req,res)=>{ 
        let cities
        let error=null

        try{
            cities= await City.find()
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
            // city= await City.findOne({_id: id}).populate({
            //     path:"itineraries",
            //     populate:{
            //         path:"comments.userId",
            //         select:"name lastName imageUser"
            //     }
            // })
            // city= await City.findOne({_id: id}).populate({
            //     path:"itineraries",
            //     populate:{
            //         path:"activities"
            //     },
            //     populate:{
            //         path:"comments.userId",
            //         select:"name lastName"
            //     }
            // })
            city= await City.findOne({_id: id}).populate({
                path:"itineraries",
                populate:{
                    path:"activities"
                }
            })

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
    },
    // getOneItineraryByCity:async(req,res)=>{
    //     const id = req.params.id

    //     let itinerary
    //     let error=null

    //     try{
    //         itinerary = await City.find({itineraries:id})
    //         console.log(itinerary)
           
    //         // itinerary = await Itinerary.find({city:id}).populate({
    //         //     path:"activities",
    //         //     populate:{path:"comments.userId"}
    //         // })
    //     }catch(err){
    //         error = err
    //     }
    //     res.json({
    //         response: error? 'ERROR' : itinerary,
    //         success: error ? false : true,
    //         error: error
    //     })
    // },
}
module.exports= cityControllers

