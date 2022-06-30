const nodemailer = require('nodemailer') //REQUIERO NODE MAILER
const {google} = require('googleapis') // REQUIERO GOOGLEAPIS Y ME SACO GOOGLE
const OAuth2 = google.auth.OAuth2 //DE ESTE PAQUETE DE GOOGLE ME METO DENTRO DE LAS CONFIGURACIONES DE OAUTH2 QUE CONFIGURE


//FUNCION ASINCRONA QUE DEPENDE DE DOS PARAMETRO=> EMAIL Y UNIQUESTRING
const verificacion = async (email, string) => {

    //CREO LAS CONFIGURACIONES DE OAUTH2 CON 3 PARAMETROS => EL  CLIENTID, CLIENTSECRET Y LA URL DEL PLAYGROUND
    const myOAuth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.SECRET_CLIENT,
        "https://developers.google.com/oauthplayground"
    )

    //A LAS CONFIGURACIONES LE APLICO EL METODO setCredentials QUE APLICA EL REFRESHTOKEN
    myOAuth2Client.setCredentials({
        refresh_token:process.env.REFRESH_TOKEN
    })

    //LUEGO GENERO EL ACCESTOKEN=> ES UN TOKEN QUE TIENE CIERTA CADUCIDAD, ENTONCES EL ACCESS TOKEN LO GENERA EL OBJETO CON LAS CONFIGURACIONES CON EL METODO getAccessToken()=> METODO QUE UTILIZA LOS 3 PARAMETROS(VARIBALES DE ENTORNO)
    const accessToken= myOAuth2Client.getAccessToken()

    //CONTRUYO UN TRANSPORTER Y USO EL METODO createTransport DE NODEMAILER QUE CONTIENE LOS DATOS DEL SERVICIO QUE VOY A UTILIZAR PARA EL ENVIO DE GMAIL, LOS DATOS DE AUTORIZACION DEL USUARIO
    const transporter = nodemailer.createTransport({
        service:'gmail',
        //LE PASO EL USER, EL TIPO, PASO LOS DATOS DE 
        auth: {
            user: process.env.USER,
            type:'OAuth2',
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.SECRET_CLIENT,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
        //TLS ES UNA CONFIGURACION QUE EVITA QUE EL ANTIVIRUES BLOQUEE
    })
    //CONFIGURO EL EMAIL
    let emailOptions = {
        //DESDE MI EMAIL
        from: process.env.USER,
        //HACIA EL EMAIL QUE LE PASO COMO PARAMETRO
        to: email,
        //LO QUE APARECE ANTES DE ABRIR EL EMAIL
        subject: 'VERIFY ACOUNT',
        //CONTIENE EL CUERPO DEL MENSAJE=> LA URL CONTIENE EL CONTROLADOR QUE VERIFICA LA CUENTA(PEDIDO GET)
        html: `
        
                <a href=http://localhost:4000/api/verify/${string}>CLICK ACA</a>
                <h3>TO CONFIRM !</h3>
               `
    }   

    //SEND MAIL METODO DE NODEMAIL QUE DEPENDE DE EMAILOPTIONS Y DE UNA FUNCION QUE DEPENDE DE LA RESPUESTA Y EL ERROR
    transporter.sendMail(emailOptions, function (error, response){
        if(error){
            console.log(error);
        } else {
            console.log(`check ${email}`);
        }
    })

}
module.exports=verificacion