//importo express
const express= require('express')
const app= express()

//se le pone 4000 para que no tenga conflicto
const PORT=4000 

app.get('/', (req, res)=>{
    res.send('sFEFWFEWFWo')
})

app.listen(PORT, ()=>{
    console.log('SERVIDOR CORRIENDO EN PUERTO' + PORT);
})