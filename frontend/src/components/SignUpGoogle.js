import React,{useEffect} from "react";
import jwt_decode from 'jwt-decode'; //IMPORTO LIBRERIA JWT CODE
import userActions from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

export default function SignUpGoogle(){
    const dispatch= useDispatch(); //EN UNA CONSTANTE GUARDO EL USEDISPATCH()
    //const ref= useRef(null)

    //FUNCION PARA MANEJAR LA RESPUESTA DEL FORMULARIO
    const handleCallbackResponse=(response)=>{
        //userObject= CON JWT CODE  DECOFICO EL TOKEN QUE NOS TRAE INFO ADENTRO
        let userObject = jwt_decode(response.credential)
        console.log(userObject);

        //USO LA ACTION DE SIGNUP Y DESPACHO UN OBJETO HACIA EL BACK DEL CONTROLADOR 
        dispatch(userActions.signUp({
            userData:{
                name: userObject.given_name,
                lastName: userObject.family_name,
                email:userObject.email,
                password: userObject.sub,
                imageUser: userObject.picture,
                from:'google'
            }
        }))
    }
    //INICIALIZO EL SERVICIO DE GOOGLE ACCOUNTS
    useEffect(()=>{
        /* global google */
        window.onload =function(){
            google.accounts.id.initialize({
                client_id:'756989628379-agrhbg2tkjaa328te0j5nipgqfh6iopg.apps.googleusercontent.com',
                //CLIENT_ID: CLIENT_ID QUE CREE DESDE GOOGLE CLOUD
                callback: handleCallbackResponse, //FUNCION QUE CREE ARRIBA PARA MANDAR LA INFO QUE RECIBA DE GOOGLE A NUESTRO BACK Y ASI GUARDARLA EN LA BASE DE DATOS Y LUEPO PODER VERIFICAR AL USUARIO
                context:"signup"
            });
        
       
        //AGARRO EL BOTON Y LO RENDERIZO CON ALGUNAS CONFIGURACIONES DE ESTILO
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            //ref.buttonDiv,
            {theme:'outline', size:'medium'}
        )
        //google.accounts.id.prompt();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    
    return(
        <div id='buttonDiv'></div>
        //<div ref={ref}></div>
    )
}