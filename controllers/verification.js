const nodemailer = require('nodemailer') //REQUIERO NODE MAILER
const {google} = require('googleapis') // REQUIERO GOOGLEAPIS Y ME SACO GOOGLE
const OAuth2 = google.auth.OAuth2 //DE ESTE PAQUETE DE GOOGLE ME METO DENTRO DE LAS CONFIGURACIONES DE OAUTH2 QUE CONFIGURE


//FUNCION ASINCRONA QUE DEPENDE DE DOS PARAMETRO=> EMAIL Y UNIQUESTRING
const verificacion = async (email, uniqueString) => {

    //CREO LAS CONFIGURACIONES DE OAUTH2 CON 3 PARAMETROS => EL  CLIENTID, CLIENTSECRET Y LA URL DEL PLAYGROUND
    const myOAuth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.SECRET_CLIENT,
        "https://developers.google.com/oauthplayground"
    )
    console.log('myOAuth2Client'+ myOAuth2Client)

    //A LAS CONFIGURACIONES LE APLICO EL METODO setCredentials QUE APLICA EL REFRESHTOKEN
    myOAuth2Client.setCredentials({
        refresh_token:process.env.REFRESH_TOKEN
    })

    //LUEGO GENERO EL ACCESTOKEN=> ES UN TOKEN QUE TIENE CIERTA CADUCIDAD, ENTONCES EL ACCESS TOKEN LO GENERA EL OBJETO CON LAS CONFIGURACIONES CON EL METODO getAccessToken()=> METODO QUE UTILIZA LOS 3 PARAMETROS(VARIBALES DE ENTORNO)
    const accessToken= myOAuth2Client.getAccessToken()
    console.log('accessToken'+ accessToken)

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
        subject: 'VERIFY ACCOUNT',
        //CONTIENE EL CUERPO DEL MENSAJE=> LA URL CONTIENE EL CONTROLADOR QUE VERIFICA LA CUENTA(PEDIDO GET)
        html: `
        <div style="background-image:url(https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=855&q=80); height: 100vh; display: flex; justify-content: center; align-items: center; flex-direction:column; background-repeat: no-repeat; background-size: cover; background-position: center;">
                <a style="color:white; font-size: 3rem; font-weight: 800;" href=http://localhost:4000/api/verify/${uniqueString}>Click here to confirm!</a>
          </div> `
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