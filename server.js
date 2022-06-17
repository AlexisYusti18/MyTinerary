require('dotenv').config()
require('./config/dataBase')
const express= require('express') 
const Router= require('./routes/routes') 
const cors= require('cors') 

//se le pone 4000 para que no tenga conflicto
//const PORT=process.env.PORT ||4000 
const PORT=4000

const app= express() //ejecuto express para crear una app

app.use(express.json()) 

app.use(cors()) 

app.use('/api', Router)

app.listen(PORT, ()=>{
    console.log('Server ready on port' + PORT);
})


// app.get('/', (req,res)=>{
//     res.send("funcionando")
// })