require('dotenv').config()
require('./config/dataBase')
const express= require('express')
const Router= require('./routes/routes')

//se le pone 4000 para que no tenga conflicto
const PORT=4000 
const app= express()


//midelworr
//middleware =>use es un middleware que sirve como servicio intermedio
// se usa app(que es nuetro servidor).use(le pedimos que use de express el metodo json para que pueda enviar y recibir info en ese formato ya que es mas facil de manipular desde front)
app.use(express.json())
// y luego en el use pongo  Router y el /api es la parte intermedia de la difinicon de la ruta  {/api/cities}
app.use('/api', Router)

app.listen(PORT, ()=>{
    console.log('Server ready on port' + PORT);
})


// app.get('/', (req,res)=>{
//     res.send("ud42342hw")
// })