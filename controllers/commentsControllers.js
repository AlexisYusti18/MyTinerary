const Itinerary=require('../models/itinerary')

const commentsControllers={

    addComment: async (req,res)=>{
        //REQUIERE POR BODY COMMENT
        const {itineraryId,comments}=req.body.data
        //ID DEL USUARIO DESDE PASSPORT
        const user=req.user._id

        try{
            const newComment= await Itinerary.findOneAndUpdate(
                {_id:itineraryId},
                {$push:{comments:{comment:comments, userId:user}}},
                {new:true})
                //console.log(newComment)
            res.json({
                success: true,
                response: {newComment},
                message:'Comment uploaded successfully!'
            })
        } catch(error){
            console.log(error)
            res.json({
                success:false,
                message:'something went wrong, try again'
            })
        }
    },
    modifyComment: async(req,res)=>{
        const {commentId, comment}=req.body.commentModify

        try{
            const modifyComment= await Itinerary.findOneAndUpdate(
                {'comments._id':commentId},
                {$set:{'comments.$.comment':comment}}, {new:true})
            //console.log(newComment)
            res.json({
                success:true,
                response:{modifyComment},
                message:'your comment has been modified'
            })
        } catch(error){
            console.log(error)
            res.json({
                success:true,
                message:'something went wrong, try again'
            })
        }
    },
    deleteComment: async(req,res)=>{
        //USO EL PARAMS=> EL ID QUE ME MANDA EL FRONTEND POR PARAMETRO
        const id=req.params.id

        try{
            const deleteComment= await Itinerary.findOneAndUpdate(
                {'comments._id':id},
                {$pull: {comments: {_id:id}}}, {new:true})
            console.log(deleteComment)
            res.json({
                success:true,
                response: {deleteComment},
                message:'comment deleted successfully'
            })
        } catch(error){
            console.log(error)
            res.json({
                success:false,
                message:'something went wrong, try again'
            })
        }
    }
}
module.exports= commentsControllers