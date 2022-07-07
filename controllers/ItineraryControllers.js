const Itinerary=require('../models/itinerary')

const itineraryControllers={
    getItinerarys : async (req,res)=>{ 
        let itineraries
        let error=null 
        try{
            itineraries= await Itinerary.find()
            //console.log(itinerarys);
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' : {itineraries},
        success: error ? false : true,
        error: error
        })
    },
    getOneItinerary: async (req, res)=>{
        const id= req.params.id
        let itinerary
        let error= null
        try{
            itinerary= await Itinerary.findOne({_id: id})
        } catch (err) {error= err}
        res.json({
        response: error ? 'ERROR' :{ itinerary},
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
            itinerarydb= await Itinerary.findOneAndUpdate({_id:id}, itinerary, {new: true}) 
        } catch (err) {
            error= err
            console.log(error);
        }
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
    },
    likeAndDislike: async(req,res)=>{
        const id=req.params.id
        //console.log(id);
        const user=req.user.id
        //console.log(user)
        await Itinerary.findOne({_id:id})

        .then(itinerary=>{
            console.log(itinerary);
            
            if(itinerary.likes.includes(user)){
                Itinerary.findOneAndUpdate({_id:id}, {$pull:{likes:user}}, {new:true})
                .then((res)=>
                res.json({
                    success:true,
                    response:res.likes,
                })
                ).catch((error)=>console.log(error))
            }
            else {
                Itinerary.findOneAndUpdate({_id:id}, {$push:{likes:user}}, {new:true})
                .then((res)=>
                res.json({
                    success:true,
                    response:res.likes,
                })).catch((error)=>console.log(error))
            }
        }).catch((error)=>({
            success:false,
            response:error
        }))
    }
}
module.exports= itineraryControllers