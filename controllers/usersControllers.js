const User= require('../models/user')
const bcryptjs= require('bcryptjs') //PAQUETE PARA ENCRIPTAR Y DESENCRIPTAR CONTRASEÑAS DE bcryptjs (bicriptjs)
const crypto= require('crypto') //IMPORTO CRYPTO PAQUETE DE NODE
const verification = require('./verification')
const jwt = require('jsonwebtoken')//REQUIERO JWT

const userControllers ={
    signUp:async (req,res)=>{
        let {name,lastName,email,password,country,imageUser,role,from}= req.body.userData//RECIBE DATOS DESDE EL BODY

        try{
           
            const userExists = await User.findOne({email})
            
            if(userExists) {
                //SI ES DIFERENTE A -1 SIGNIFICA QUE EL USUARIO YA HIZO EL REGISTRO CON ESE METODO
                if(userExists.from.indexOf(from) !== -1){
                    res.json({
                        success:false,
                        from:from,
                        message: 'You are already registered with'+' '+from+' '+',LOG IN!' //ya estas registrado con from, inicia sesion!
                    })
                }
                //SI ME DEVUELVE -1 QUIERE DECIR QUE NO ESTA REGISTRADO CON ESE METODO
                else{
                    const passwordHash= bcryptjs.hashSync(password, 10)
                    userExists.from.push(from)
                    userExists.password.push(passwordHash)
    

                    if(from === "singUp"){
                        userExists.uniqueString= crypto.randomBytes(15).toString('hex')
                        await userExists.save()
                        await verification(email, userExists.uniqueString) 
                        res.json({
                            success: true,
                            from:from,
                            message:"please verify your email"
                        })
                    } else{
                        userExists.userVerification =true 
                        userExists.save()
                        res.json({
                            success:true,
                            from:from,
                            message: from +' '+'has been added to your login method'
                        })
                    }
                    
                } 
            }
                    //QUE EL USUARIO NO HAYA SIDO ENCONTRADO EN LA BASE DE DATOS => USUARIO NUEVO
                    else {
                        const passwordHash= bcryptjs.hashSync(password, 10)
                       
                        const uniqueString = crypto.randomBytes(15).toString('hex')
                     
                        const newUser= await new User({
                            name,
                            lastName,
                            country,
                            imageUser,
                            email,
                            role,
                            userVerification:false,
                            uniqueString:uniqueString,
                            password:[passwordHash],
                            from : [from]

                        })
                        // VERIFICO SI EL FROM ES DIFERENTE A MI FORMULARIO DE REGISTRO
                        if(from !== 'signUp'){
                            await newUser.save()
                            res.json({
                                success: true,
                                from:from,
                                message: `check ${email} and finish you Sign up` 
                            })
                        } 
                        else{ //EL DATO VIENE DE UNA RED SOCIAL
                                await newUser.save()
                                await verification(email, newUser.uniqueString) 
                                res.json({
                                    success: true,
                                    from:from,
                                    message: 'Confirm your email verification'//Confirma tu verificacion de email
                                })
                        }
                    } 
            } catch(error){
                console.log(error)
                res.json({
                    success: false,
                    message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
                })
            }
        
        },

    
logIn: async (req, res)=>{
    const {email, password, from}= req.body.logInUser
    try{
        const userExists=await User.findOne({email})
        //console.log(userExists);
        let passwordCoincide= userExists.password.filter(pass=> bcryptjs.compareSync(password, pass))
        if(from !== 'signUp'){
            
            if(passwordCoincide.length > 0){
                const userData = {
                    id:userExists._id,
                    name: userExists.name,
                    lastName: userExists.lastName,
                    email: userExists.email,
                    imageUser: userExists.imageUser,
                    country: userExists.country,
                    from:from
                }
                await userExists.save()
                const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
                //console.log('token arriba'+ token);
                res.json({
                    success:true,
                    from:from,
                    response:{token,userData},
                    message: 'WELCOME BACK' + userData.name + userData.lastName
                })
    
            } else {
                res.json({
                    success: false,
                    from:from,
                    message:'no register with' + from
                })
            }
        }
        else {
            if(passwordCoincide.length>0) {
                //console.log('passwordCoincide' + passwordCoincide);
                //console.log('userExists'+ userExists);
                if(userExists.userVerification){
                    const userData = {
                        id:userExists._id,
                        name: userExists.name,
                        lastName: userExists.lastName,
                        email: userExists.email,
                        imageUser: userExists.imageUser,
                        country: userExists.country,
                        from:from
                    }
                    await userExists.save()
                    const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
                    //console.log(token);
                    res.json({
                        success:true,
                        from:from,
                        response:{token, userData},
                        message:'WELCOME' + userData.name + userData.lastName
                    })
                }
                
                else {
                    res.json({
                        success:false,
                        from:from,
                        message:'verify email'
                    })
                }
                
                
            } else{
                res.json({
                    success:false,
                    from:from,
                    message:'el usurio o password no coinciden'
                })
        }
        } 
    } catch(error){
        console.log(error)
        res.json({
            success: false,
            message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
        })
    }
    
},
        logOut: async (req,res)=>{
            const email= req.body.closeUser
            const user= await User.findOne({email})
            await user.save()
            res.json({
                success:true,
                message:'Deslogueado'
            })
        },

        verifyEmail: async(req, res)=>{
            const {uniqueString} = req.params
            const user= await User.findOne({uniqueString: uniqueString})

            if(user) {
                user.userVerification= true
                await user.save()
                res.redirect("http://localhost:3000/logIn")
            }
            else {res.json({
                success: false,
                message: 'email no confirmed'
            })}
        },

        verifyToken: async (req,res)=>{

            //EL REQUERIMIENTO VIENE COMO REQ.USER PORQUE ASI LO MANDE DESDE PASSPORT
            //EN LA RESPUESTA LE PASO LOS DATOS DEL USUARIO Y ESTO VA A LAS ACTIONS
            if(req.user) {
                res.json({
                    success:true,
                    response:{
                        id:req.user._id,
                        name:req.user.name ,
                        lastName: req.user.lastName,
                        email: req.user.email,
                        imageUser: req.user.imageUser,
                        country:req.user.country,
                        from:'token'
                    },
                    message: 'WelcomeBack' +' '+req.user.name + req.user.lastName
                })
            }
            else {
                res.json({
                    success: false,
                    message: 'Please do LOGIN again' //Por favor realize nuevamente LOGIN
                })
            }
        }
}
module.exports= userControllers

// const {password, email, from}= req.body.logInUser

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
//                 console.log(passwordCoincide);

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
//                     const token= jwt.sign({...userData}, process.env.SECRET_KEY)
//                     res.json({
//                         success:true,
//                         from:from,
//                         //LE MANDO COMO RESPUESTA AL FRON EL TOKEN Y USERDATA
//                         response:{token, userData},
//                         message:"Welcome" + " " +userData.name + " " +userData.lastName
//                     })
                    
//                 } else{
//                     res.json({
//                         success: false, 
//                         from: from, 
//                         message:'You have not registered with'+ from +'if you want to enter with this method you must do the signup with'+ from //'No has realizado el registro con'+from+'si quieres ingresar con este metodo debes hacer el signUp con' +from
//                       })
//                 }
//             } else{
//                     if(userExists.userVerification){
//                         console.log(userExists.userVerification);
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
                       
//                         const token= jwt.sign({...userData}, process.env.SECRET_KEY)

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


// signUp:async (req,res)=>{
    //     let {name,lastName,email,password,country,imageUser,role,from}= req.body.userData//RECIBE DATOS DESDE EL BODY

    //     try{
           
    //         const userExists = await User.findOne({email})
            
    //         if(userExists) {
    //             //SI ES DIFERENTE A -1 SIGNIFICA QUE EL USUARIO YA HIZO EL REGISTRO CON ESE METODO
    //             if(userExists.from.indexOf(from) !== -1){
    //                 res.json({
    //                     success:false,
    //                     from:from,
    //                     message: 'You are already registered with'+' '+from+' '+',LOG IN!' //ya estas registrado con from, inicia sesion!
    //                 })
    //             }
    //             //SI ME DEVUELVE -1 QUIERE DECIR QUE NO ESTA REGISTRADO CON ESE METODO
    //             else{
    //                 const passwordHash= bcryptjs.hashSync(password, 10)
    //                 userExists.from.push(from)
    //                 userExists.password.push(passwordHash)
    

    //                 if(from === "singUp"){
    //                     userExists.uniqueString= crypto.randomBytes(15).toString('hex')
    //                     await userExists.save()
    //                     await verification(email, userExists.uniqueString) 
    //                     res.json({
    //                         success: true,
    //                         from:from,
    //                         message:"please verify your email"
    //                     })
    //                 } else{
    //                     userExists.userVerification =true 
    //                     userExists.save()
    //                     res.json({
    //                         success:true,
    //                         from:from,
    //                         message: from +' '+'has been added to your login method'
    //                     })
    //                 }
                    
    //             } 
    //         }
    //                 //QUE EL USUARIO NO HAYA SIDO ENCONTRADO EN LA BASE DE DATOS => USUARIO NUEVO
    //                 else {
    //                     const passwordHash= bcryptjs.hashSync(password, 10)
                       
    //                     const uniqueString = crypto.randomBytes(15).toString('hex')
                     
    //                     const newUser= await new User({
    //                         name,
    //                         lastName,
    //                         country,
    //                         imageUser,
    //                         email,
    //                         role,
    //                         userVerification:false,
    //                         uniqueString:uniqueString,
    //                         password:[passwordHash],
    //                         from : [from]

    //                     })
    //                     // VERIFICO SI EL FROM ES DIFERENTE A MI FORMULARIO DE REGISTRO
    //                     if(from !== 'logIn'){
    //                         await newUser.save()
    //                         res.json({
    //                             success: true,
    //                             from:from,
    //                             message: `check ${email} and finish you Sign up` 
    //                         })
    //                     } 
    //                     else{ //EL DATO VIENE DE UNA RED SOCIAL
    //                             await newUser.save()
    //                             await verification(email, newUser.uniqueString) 
    //                             res.json({
    //                                 success: true,
    //                                 from:from,
    //                                 message: 'Confirm your email verification'//Confirma tu verificacion de email
    //                             })
    //                     }
    //                 } 
    //         } catch(error){
    //             console.log(error)
    //             res.json({
    //                 success: false,
    //                 message:'Something went wrong, please try again later' //Algo ha salido mal, intenta de nuevo mas tarde
    //             })
    //         }
        
    //     },

 // const userExists=await User.findOne({email})

        // if(!userExists) {
        //     res.json({
        //         success: false,
        //         massage:'tu usuario no ha sido registrado'
        //     })
        // } else {
        //     if(from==='signUp'){
        //         if(userExists.userVerification){
        //             passCheck= userExists.password.filter(pass=> bcryptjs.compareSync(password, pass))

        //             if(passCheck.length>0){
        //                 const userData = {
        //                                 id:userExists._id,
        //                                 name: userExists.name,
        //                                 lastName: userExists.lastName,
        //                                 email: userExists.email,
        //                                 imageUser: userExists.imageUser,
        //                                 country: userExists.country,
        //                                 from:from
        //                             }
        //                         const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
        //                         res.json({
        //                             success:true,
        //                             from:from,
        //                             response:{token,userData},
        //                             message: 'WELCOME BACK' + userData.name + userData.lastName
        //                         })
        //             } else{
        //                 res.json({
        //                     success:false,
        //                     from:from,
        //                     message:'CHECK SU EMAIL' 
        //                 })
        //             }
        //         } else{
        //             passCheck= userExists.password.filter(pass=> bcryptjs.compareSync(password, pass))
                    
        //             if(passCheck.length>0){
        //                 const userData = {
        //                     id:userExists._id,
        //                     name: userExists.name,
        //                     lastName: userExists.lastName,
        //                     email: userExists.email,
        //                     imageUser: userExists.imageUser,
        //                     country: userExists.country,
        //                     from:from
        //                 }
        //                 await userExists.save()
        //                 const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
        //                 res.json({
        //                     success:true,
        //                     from:from,
        //                     response:{token,userData},
        //                     message: 'WELCOME BACK' + userData.name + userData.lastName
        //                 })
        //             } else {
        //                 res.json({
        //                     success:false,
        //                     from:from,
        //                     message:'NO ESTAS REGISTRADO'
        //                 })
        //             }
        //         }
        //     }
        // }

























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
        //         } else {
        //             if(from==='logIn'){
        //                 if(userExists.userVerification){
        //                     let passwordCheck= userExists.password.filter(pass=>bcryptjs.compareSync(password, pass))
                            
        //                     if(passwordCheck.length > 0){
        //                         const userData = {
        //                             name:userExists.name,
        //                             lastName: userExists.lastName,
        //                             email:userExists.email,
        //                             country: userExists.country,
        //                             imageUser: userExists.imageUser,
        //                             role:userExists.role,
        //                             id:userExists._id,
        //                             from: from
        //                         }
        //                         //LLAMO A JTW, UTILIZO EL METODO sign() Y LE PASO COMO PAYLOAD USERDATA, SECRET KEY Y EL TIEMPO DE EXPIRACION DEL TOKEN
        //                         const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
        //                         res.json({
        //                             success:true,
        //                             from:from,
        //                             //LE MANDO COMO RESPUESTA AL FRON EL TOKEN Y USERDATA
        //                             response:{token, userData},
        //                             message:"Welcome"+userData.name + " " +userData.lastName
        //                         })
        //                     } else{
        //                         res.json({
        //                             success:false,
        //                             from:from,
        //                             message:`check ${email}`
        //                         })
        //                     }
        //                 }
        //                 else{
        //                     let passwordCheck= userExists.password.filter(pass=>bcryptjs.compareSync(password, pass))

        //                     if(passwordCheck.length > 0){
        //                         const userData = {
        //                             name:userExists.name,
        //                             lastName: userExists.lastName,
        //                             email:userExists.email,
        //                             country: userExists.country,
        //                             imageUser: userExists.imageUser,
        //                             role:userExists.role,
        //                             id:userExists._id,
        //                             from: from
        //                         }
        //                         await userExists.save()
        //                         const token= jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:60*60*24})
                                
        //                         res.json({
        //                             success:true,
        //                             from:from,
        //                             response:{token, userData},
        //                             message:"Welcome" +userData.name + " " +userData.lastName
        //                         })
        //                     } else{
        //                         res.json({
        //                             success:false,
        //                             from:from,
        //                             message: 'no register please login' + from
        //                         })
        //                     }
        //                 }
        //             }
        //         }
        //     } catch(error){
        //         console.log(error);
        //         res.json({
        //             success:false,
        //             message:'intenta mas tarde'
        //         })
        //     }
        // },