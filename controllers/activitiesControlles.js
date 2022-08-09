const Activity=require('../models/activitya')

const activityControllers={
    getActivities: async(req,res)=>{
        let activities
        let error=null
        
        try{
            activities= await Activity.find()
        }catch(err){
            error=err
            console.log(err);
        }
        res.json({ response:error? 'ERROR' :{activities}, success: error ? false : true, error: error })
    },
    getOneActivity: async (req,res)=>{
        const id= req.params.id
        let activity
        let error=null

        try{
            activity= await Activity.findOne({_id:id})
        } catch(err){
            error=err
            console.log(error);
        }
        res.json({ response: error ? 'ERROR' : activity, success: error ? false : true, error: error})

    },
    addActivity: async(req,res)=>{
        let activity
        let error=null
        const {name,image}=req.body.data
        try{
            activity= await new Activity({
                name:name,
                image:image
            }).save()
        }catch(err){
            error=err
            console.log(error);
        }
        res.json({ response:error ? 'ERROR': activity,success: error ? false : true,error: error
        })
    },
    modifyActivity: async (req,res)=>{
        const id= req.params.id
        const activity= req.body.data
        let activitydb
        let error=null
        try{
            activitydb= await Activity.findOneAndUpdate({_id:id}, activity, {new:true})
        } catch(err){
            error=err
            console.log(error);
        }
        res.json({ response: error ? 'ERROR' : activity, success: error ? false : true, error: error
        })
    },
    removeActivity: async (req,res)=>{
        const id=req.params.id
        let activity
        let error= null

        try{
            activity= await Activity.findOneAndDelete({_id:id})
        } catch(err){
            error=err
            console.log(error);
        }
        res.json({ response: error ? 'ERROR' : activity, success: error ? false : true, error: error})
    }
}
module.exports= activityControllers