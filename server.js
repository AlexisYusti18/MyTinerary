require('./config/dataBase')
require('dotenv').config()
const express= require('express') 
const Router= require('./routes/routes') 
const cors= require('cors') 
const passport= require('passport') //REQUIERO PASSPORT DEL PAQUETE PASSPORT

const PORT = process.env.PORT || 4000
const app= express() //ejecuto express para crear una app
//MIDDLEWARES
app.use(express.json()) 
app.use(passport.initialize()) //LLAMO A INICIALIZAR A PASSPORT COMO MIDLLEWARE Y COMO SERVICIO QUE VA A UTILIZAR MI APP
app.use(cors()) 
app.use('/api', Router)

app.set('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVER CREATE')
})

app.listen(PORT, ()=>{
    console.log('SERVER READY ON PORT:' + app.get('port'));
})



