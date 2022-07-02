const User= require('../models/user')
const bcryptjs= require('bcryptjs') //PAQUETE PARA ENCRIPTAR Y DESENCRIPTAR CONTRASEÑAS DE bcryptjs (bicriptjs)
const crypto= require('crypto') //IMPORTO CRYPTO PAQUETE DE NODE
const verification = require('./verification')
const url= "http://localhost:3000/home"
//LA RESPUESTA ES ENVIADA AL FRONT DESDE EL ANIDAMIENTO DE MENOR NIVEL PORQUE SI TENEMOS UN ANIDAMIENTO Y EMITIMOS UNA RESPUESTA DESDE AHI YA CUANDO ENTRE AL SIGUIENTE NIVEL Y EMITA UA RESPUESTA YA VA A TENER EMITIDA UNA RESPUESTA ANTES

//EL USUARIO EXISTE=> EXISTE Y YA SE REGISTRO POR ESTE MEDIO DEVOLVEMOS SUCCESS(RESPUESTA) = FALSE
//                 => EXISTE PERO NO ESTA REGISTRADO POR ESTE MEDIO => SI REALIAZO EL REGISTRO MEDIANTE NUESTRO FORM ENVIMOS A VERIFICAR MAIL SUCCESS(RESPUESTA)= TRUE
//                 =>

const userControllers ={

    signUp:async (req,res)=>{
        let {name,lastName,email,password,country,imageUser,from}= req.body.userData//RECIBE DATOS DESDE EL BODY

        try{
            //VOY A MI MODELO DE USUARIO Y CAPTURO EL EMAIL Y LO BUSCO EN MI BASE DE DATOS
            const userExists = await User.findOne({email})
            
            if(userExists) {
                 //SI ENCUENTRA EL EMAIL BUSCAMOS DESDE DONDE VIENE(FROM) / INDEXOF BUSCA SI EL DATO QUE VIENE DESDE EL FRONTEND EXISTE EN LA BASE DE DATOS (FROM) => SI ENCUENTRA DEVUELVE EL INDICE DE LO CONTRARIO -1
                //SI ES DIFERENTE A -1 SIGNIFICA QUE EL USUARIO YA HIZO EL REGISTRO CON ESE METODO
                if(userExists.from.indexOf(from) !== -1){
                    res.json({
                        succes:false,
                        from:from,
                        message: 'You have already done the SignUp in this way' //Ya has realizado el SignUp de esta forma 
                    })
                }
                //SI ME DEVUELVE -1 QUIERE DECIR QUE NO ESTA REGISTRADO CON ESE METODO ENTONCES HAGO UN ELSE
                else{
                    //DEFINIMOS UNA CONSTANTE QUE VA A GUARDAR LA CONTRASENA ENCRIPTADA, LLAMAMOS AL PAQUETE bcryptjs Y UTILIZAMOS EL METODO hashSync() SE LE PASA COMO PARAMETRO LO QUE QUEREMOS ENCRIPTAR Y EL SEGUNDO PARAMETRO ES LA CANTIDAD DE CARACTERES A ENCRIPTAR(PORNERLE 10 PARA QUE NO TARDE TANTO)
                    const passwordHash= bcryptjs.hashSync(password, 10)
                    // AL USUARIO QUE ENCONTRO EN SU CAMPO FROM LE VOY A PUSHEAR DESDE DONDE ESTA HACIENDO EL REGISTRO(GOOGLE,INSTAGRAM,FACEBOOK)
                    userExists.from.push(from)
                    //Y LUEGO EL USUARIO EN SU CAMPO PASSWORD ME VA A PUSHEAR LA CONTRASEÑA HASHEADA
                    userExists.password.push(passwordHash)
                    //USUARIO SE REGISTRO CON NUESTRO FORM Y LUEGO QUIERE INGRESAR CON [RED SOCIAL], ENTONCES DEBEMOS CAMBIAR ESE FALSE A TRUE PARA QUE PUEDA LOGUEARSE
                    userExists.userVerification =true                    
                    res.json({
                    succes: true,
                    from:from,
                    message:'we add'+ " " + from + " " + 'to your means to login' //agregamos FROM a tus medios para iniciar sesion
                    })
                }
            }
                    //QUE EL USUARIO NO HAYA SIDO ENCONTRADO EN LA BASE DE DATOS => USUARIO NUEVO
                    else {
                        const passwordHash= bcryptjs.hashSync(password, 10)
                        //METODO DE CRYPTO=> randomBytes(GENERA UNA CADENA DE 15 CARACTERES) Y toString(CONVIERTE LA CADENA DE 15 CARACTERES EN HEXADECIMAL)
                        const uniqueString = crypto.randomBytes(15).toString('hex')
                        //CREO DENTRO DE LA BASE DE DATOS UN NUEVO USUARIO Y LE GUARDO LO QUE NECESITO DENTRO DEL MODELO
                        const newUser= await new User({
                            name,
                            lastName,
                            country,
                            imageUser,
                            email,
                            uniqueString:uniqueString,
                            userVerification: false,
                            password:[passwordHash], //A PASSWORD DENTRO DEL ARRAY LE GUARDO EL VALOR DE LA CONTRASEÑA HASHEADA, NO LO PUSHEO PORQUE ES EL PRIMER REGISTRO QUE VA A TENER EL USUARIO
                            from : [from]

                        })
                        // VERIFICO SI EL FROM ES DIFERENTE A MI FORMULARIO DE REGISTRO
                        if(from !== 'form-signUp'){
                            await newUser.save()
                            await verification(email, uniqueString) //UTILIZO EL AWAIT PARA ESPERAR EL ENVIO DEL EMAIL
                            res.json({
                                succes: true,
                                from:from,
                                message: `check ${email} and finish you Sign up` //Usuario creado correctamente con signup
                                })
                        } 
                        else{ //EL DATO VIENE DE UNA RED SOCIAL
                            //EN CASO DE QUE LA CREACION DEL USUARIO SEA CON NUESTRO FORMULARIO DE SINGUP MANDAMOS A VERIFICAR EL GMAIL
                            newUser.userVerification =true //EN CASO DE QUE SE REGISTRE CON UNA RED SOCIAL NO HACE FALTA LA VERIFICACION POR GMAIL
                            await newUser.save() //Y LO GUARDO
                            res.json({
                                succes: true,
                                from:from,
                                message: 'Confirm your email verification'//Confirma tu verificacion de email
                                })
                        }
                    } 
            } catch(error){
                console.log(error)
                res.json({
                    succes: false,
                    message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
                })
            }
        
        },
        logIn: async (req, res)=>{
            const {password, email, from}= req.body.logInUser

            try{
                //BUSCO UN USUARIO DONDE ME COINCIDA EL EMAIL
                const userExists = await User.findOne({email})

                //SI NO EXISTE EL USUARIO LE DIGO QUE PRIMERO DEBE REGISTRARSE
                if(!userExists) {
                    res.json({
                        succes: false,
                        message: "The user with which you are trying to enter does not exist, verify the data or create a new one" //El usuario con el que estas intentado ingresar no existe, verifica los datos o crea uno nuevo !
                    })
                }
                else {
                    //VERIFICO SI ES DIFERENTE A EL SIGNUP
                    if(from !== "form-signUp") {
                        //VOY A TOMAR LA CONTRA DE LA BASE DE DATOS ,LE APLICO FILTER Y COMPARO SI LA PASSWORD ES IGUAL AL DESENCRIPTADO
                        let passwordsMatches = userExists.password.filter(pass=>bcryptjs.compareSync(password, pass))

                        //ME DEVUELVE TRUE ENTONCES DEFINO LOS DATOS QUE VOY A MANDAR AL FRONTEND
                        if(passwordsMatches.length > 0){
                            //CREANDO ESTE OBJETO PUEDO DEFINIRLE AL FRONT LOS DATOS QUE QUIERO QUE RECIBA Y POR ENTE ASI NO PASO LA PASSWORD (DATO SENSIBLE)
                            const userData = {
                                name:userExists.name,
                                lastName: userExists.lastName,
                                country: userExists.country,
                                imageUser: userExists.imageUser,
                                email:userExists.email,
                                from: from
                            }
                            res.json({
                                succes:true,
                                from:from,
                                response:{userData},
                                message:"Welcome" + " " +userData.name + " " +userData.lastName
                            })
                        } 
                        //Y SINO LA RESPUESTA EL FALSE
                        else {
                            res.json({
                                succes: false,
                                from: from,
                                message: "You have not registered with" + " " + from + " " + ", create a new account and try again" //No has realizado el registro con sigIn , crea una nueva cuenta e intantalo de nuevo
                            })
                        }
                    } 
                    
                }
            } catch(error){
                console.log(error)
                res.json({
                    succes: false,
                    message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
                })
            }
        },
        
        verifyEmail: async(req, res)=>{
            const {string} = req.params
            const user= await User.findOne({uniqueString: string})

            if(user) {
                user.verification= true
                await user.save()
                res.redirect(`${url}`)
            }
            else {res.json({
                success: false,
                message: 'email confirmed'
            })}
        }
}
module.exports= userControllers


// logIn: async (req, res)=>{
//     const {password, email, from}= req.body.logInUser

//     try{
//         //BUSCO UN USUARIO DONDE ME COINCIDA EL EMAIL
//         const userExists = await User.findOne({email})

//         //SI NO EXISTE EL USUARIO LE DIGO QUE PRIMERO DEBE REGISTRARSE
//         if(!userExists) {
//             res.json({
//                 success: false,
//                 message: "The user with which you are trying to enter does not exist, verify the data or create a new one" //El usuario con el que estas intentado ingresar no existe, verifica los datos o crea uno nuevo !
//             })
//         }
//         else {
//             //VERIFICO SI ES DIFERENTE A EL SIGNUP
//             if(from !== "singUp") {
                
//                 let passwordCoincide = userExists.password.filter(pass=>bcryptjs.compareSync(password, pass))

//                 //ME DEVUELVE TRUE ENTONCES DEFINO LOS DATOS QUE VOY A MANDAR AL FRONTEND
//                 if(passwordCoincide.length > 0){
        
//                     const userData = {
//                         name:userExists.name,
//                         lastName: userExists.lastName,
//                         email:userExists.email,
//                         country: userExists.country,
//                         imageUser: userExists.imageUser,
//                         role:userExists.role,
//                         id:userExists._id,
//                         from: from
//                     }
//                     await userExists.save()
//                     //userExists.isConected= true
//                     //LLAMO A JTW, UTILIZO EL METODO sign() Y LE PASO COMO PAYLOAD USERDATA, SECRET KEY Y EL TIEMPO DE EXPIRACION DEL TOKEN
//                     const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
                    // res.json({
                    //     success:true,
                    //     from:from,
                    //     //LE MANDO COMO RESPUESTA AL FRON EL TOKEN Y USERDATA
                    //     response:{token, userData},
                    //     message:"Welcome" + " " +userData.name + " " +userData.lastName
                    // })
                    
//                 } else{
//                     res.json({
//                         success: false, 
//                         from: from, 
//                         message:'You have not registered with'+ from +'if you want to enter with this method you must do the signup with'+ from //'No has realizado el registro con'+from+'si quieres ingresar con este metodo debes hacer el signUp con' +from
//                       })
//                 }
//             } else{
//                     if(userExists.userVerification){
//                         let passwordCoincide = userExists.password.filter(pass=>bcryptjs.compareSync(password, pass))

//                         if(passwordCoincide.length>0){
//                             const userData = {
//                                 name:userExists.name,
//                                 lastName: userExists.lastName,
//                                 email:userExists.email,
//                                 country: userExists.country,
//                                 imageUser: userExists.imageUser,
//                                 role:userExists.role,
//                                 id:userExists._id,
//                                 from: from
//                         }
                       
//                         const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})

//                         res.json({
//                             success:true,
//                             from:from,
//                             //LE MANDO COMO RESPUESTA AL FRON EL TOKEN Y USERDATA
//                             response:{token, userData},
//                             message:"Welcome" + " " +userData.name + " " +userData.lastName
//                         })
//                        } else{
//                         res.json({
//                             success: false, 
//                             from: from,  
//                             message:"El usuario o el password no coinciden",
//                           })
//                        }
//                     } else{
//                         res.json({
//                             success: false, 
//                             from: from, 
//                             message:'You have not verified your email, please check your email box to complete your signUp' //"No has verificado tu email, por favor verifica ti casilla de emails para completar tu signUp"
//                           }) 
//                     }
//             } 
//         }
//     }catch(error){
//         console.log(error)
//         res.json({
//             success: false,
//             message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
//         })
//     }
// },