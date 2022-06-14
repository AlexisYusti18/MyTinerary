require('dotenv').config()
require('./config/dataBase')
const express= require('express')

//se le pone 4000 para que no tenga conflicto
const PORT=4000 

const app= express()

app.listen(PORT, ()=>{
    console.log('SERVIDOR CORRIENDO EN PUERTO' + PORT);
})