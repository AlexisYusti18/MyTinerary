const User= require('../models/user')
const bcryptjs= require('bcryptjs') //PAQUETE PARA ENCRIPTAR Y DESENCRIPTAR CONTRASEÑAS DE bcryptjs (bicriptjs)

//LA RESPUESTA ES ENVIADA AL FRONT DESDE EL ANIDAMIENTO DE MENOR NIVEL PORQUE SI TENEMOS UN ANIDAMIENTO Y EMITIMOS UNA RESPUESTA DESDE AHI YA CUANDO ENTRE AL SIGUIENTE NIVEL Y EMITA UA RESPUESTA YA VA A TENER EMITIDA UNA RESPUESTA ANTES

//EL USUARIO EXISTE=> EXISTE Y YA SE REGISTRO POR ESTE MEDIO DEVOLVEMOS SUCCESS(RESPUESTA) = FALSE
//                 => EXISTE PERO NO ESTA REGISTRADO POR ESTE MEDIO => SI REALIAZO EL REGISTRO MEDIANTE NUESTRO FORM ENVIMOS A VERIFICAR MAIL SUCCESS(RESPUESTA)= TRUE
//                 =>

const userControllers ={

    signUpUsers:async (req,res)=>{
        let {name, lastName,country,imageUser,email,password,from}= req.body //RECIBE DATOS DESDE EL BODY

        try{
            //VOY A MI MODELO DE USUARIO Y CAPTURO EL EMAIL Y LO BUSCO EN MI BASE DE DATOS
            const userExists = await User.findOne({email})
            
            if(userExists) {
                 //SI ENCUENTRA EL EMAIL BUSCAMOS DESDE DONDE VIENE(FROM) / INDEOF BUSCA SI EL DATO QUE VIENE DESDE EL FRONTEND EXISTE EN LA BASE DE DATOS (FROM) => SI ENCUENTRA DEVUELVE EL INDICE DE LO CONTRARIO -1
                //SI ES DIFERENTE A -1 SIGNIFICA QUE EL USUARIO YA HIZO EL REGISTRO CON ESE METODO
                if(userExists.from.indexOf(from) !== -1){
                    res.json({
                        response:false,
                        from:'signup',
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
                                        
                    res.json({
                    response: true,
                    from:'signup',
                    message:'we add' + from + 'to your means to login' //agregamos signup a tus medios para iniciar sesion
                    })
                }
            }
                    //QUE EL USUARIO NO HAYA SIDO ENCONTRADO EN LA BASE DE DATOS => USUARIO NUEVO
                    else {
                        const passwordHash= bcryptjs.hashSync(password, 10)
                        //CREO DENTRO DE LA BASE DE DATOS UN NUEVO USUARIO Y LE GUARDO LO QUE NECESITO DENTRO DEL MODELO
                        const newUser= await new User({
                            name,
                            lastName,
                            country,
                            imageUser,
                            email,
                            password:[passwordHash], //A PASSWORD DENTRO DEL ARRAY LE GUARDO EL VALOR DE LA CONTRASEÑA HASHEADA, NO LO PUSHEO PORQUE ES EL PRIMER REGISTRO QUE VA A TENER EL USUARIO
                            from : [from] 
                        })
                        // VERIFICO SI EL FROM ES DIFERENTE A MI FORMULARIO DE REGISTRO
                        if(from !== 'form-signUp'){
                            await newUser.save()
                            res.json({
                                response: true,
                                from:'signup',
                                message: 'User successfully created with' + from //Usuario creado correctamente con signup
                                })
                        } 
                        else{
                            //EN CASO DE QUE LA CREACION DEL USUARIO SEA CON NUESTRO FORMULARIO DE SINGUP MANDAMOS A VERIFICAR EL GMAIL
                            await newUser.save()
                            res.json({
                                response: true,
                                from:'signup',
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
        
        } 

}
module.exports= userControllers
