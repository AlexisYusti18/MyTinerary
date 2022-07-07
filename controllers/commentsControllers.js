const Itinerary=require('../models/itinerary')

const commentsControllers={

    addComment: async (req,res)=>{
        const {itinerary, comment}=req.body.comment
        const user=req.user._id

        try{
            const newComment= await Itinerary.findOneAndUpdate({_id:itinerary}, {$push:{comments:{comment:comment, userId:user, date:Date.now()}}}, {new:true}).populate("comments.userId", {name:1})
            res.json({
                success: true,
                response: {newComment},
                message:'gracias comentario'
            })
        } catch(error){
            console.log(error)
            res.json({
                success:false,
                message:'algo salio mal'
            })
        }
    },
    modifyComment: async(req,res)=>{
        const {commentId, comment}=req.body.comment

        try{
            const newComment= await Itinerary.findOneAndUpdate({'comments._id':commentId}, {$set:{'comments.$.comment':comment, 'comments.$.data': Date.now()}}, {new:true})
            console.log(newComment)
            res.json({
                success:true,
                response:{newComment},
                message:'comentario modificado'
            })
        } catch(error){
            console.log(error)
            res.json({
                success:true,
                message:'algo salio mal'
            })
        }
    },
    deleteComment: async(req,res)=>{
        const id=req.params.id

        try{
            const deleteComment= await Itinerary.findOneAndUpdate({'comments._id':id}, {$pull:{comments: {_id:id}}}, {new:true})
            console.log(deleteComment)
            res.json({
                success:true,
                response: {deleteComment},
                message:'comenario eliminado'
            })
        } catch(error){
            console.log(error)
            res.json({
                success:false,
                message:'algo salio mal'
            })
        }
    }
}
module.exports= commentsControllers