const joi= require('joi') //IMPORTO JOI

const validator= (req, res , next) =>{
    const schema = joi.object({ //CREO UNA CONSTANTE Y CON EL METODO JOI.OBJET CREO UN OBJETO DONDE VOY A GUARDAR LAS VALIDACIONES
        name: joi.string()
        .min(4)
        .max(20)
        .required()
        .messages({
            'string.min':'"name": error min 4 characters',
            'string.max':'"name": error max 20 characters'
        }),
        lastName: joi.string()
        .min(4)
        .max(20)
        .required()
        .messages({
            'string.min':'"lastName": error min 4 characters',
            'string.max':'"lastName": error max 20 characters'
        }),
        email: joi.string()
            .email({minDomainSegments:2})
            .required()
            .messages({ 'string.email':'"email": incorrect format'
        }),
        
        password: joi.string()
        .min(5)
        .max(20)
        .required()
        .messages({
            'string.min':'"password": error min 5 characters',
            'string.max':'"password": error max 20 characters'
        }),
        country:joi.string()
        .required()
        .min(2)
        .max(20)
        .messages({
            'string.min':'"country": error min 2 characters',
            'string.max':'"country": error max 20 characters'
        }),
        imageUser:joi.string()
        .min(3)
        .messages({
            'string.min':'"imageUser": error min 3 characters',
        }),
                
        from: joi.string().required()
    })
        //LEUGO DE ESTABLECER LOS CRITERIOS DE VALIDACION, USAMOS METODO VALIDATE() Y LE PASAMOS POR PARAMETRO LOS DATOS QUE VIENEN POR BODY DESDE EL FRONTEND Y CON abortEarly LO INDICAMOS EN FALSE PARA QUE REALIZE TODAS LAS VERIFICAIONES Y NOS DE UNA RESPUESTA EN ARRAY
        const validation= schema.validate(req.body.userData, {abortEarly:false})
            if(validation.error) {
                //console.log(validation);
                return res.json({
                    success: false,
                    from:"validator",
                    message: validation.error.details, test: validation

                })
        }
    next() //SI ESTA TODO OK, EJECUTA EL NEXT, ENTONCES PASA AL CONTROLADOR
}
module.exports= validator