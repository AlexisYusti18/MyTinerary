const mongoose= require('mongoose')

mongoose.connect(process.env.MONGO_URI,{

    useUnifiedTopology:true,
    useNewUrlParser: true,
})
.then(()=>console.log('DataBase conected'))
.catch(err =>console.error(err))