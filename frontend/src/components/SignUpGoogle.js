import React,{useEffect} from "react";
import jwt_decode from 'jwt-decode'; //IMPORTO LIBRERIA JWT CODE
import userActions from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

function SignUpGoogle(props){
    const dispatch= useDispatch();
    
    const handleCallbackResponse=(response)=>{
        
        let userObject = jwt_decode(response.credential)
        //console.log(userObject);

        dispatch(userActions.signUp({
                name: userObject.given_name,
                lastName: userObject.family_name,
                email:userObject.email,
                password: userObject.sub,
                imageUser: userObject.picture,
                role: 'user',
                from:'google',
                country: props.country,
        }))
    }
    //INICIALIZO EL SERVICIO DE GOOGLE ACCOUNTS
    useEffect(()=>{
        /* global google */
            google.accounts.id.initialize({
                client_id:'756989628379-agrhbg2tkjaa328te0j5nipgqfh6iopg.apps.googleusercontent.com',
                callback: handleCallbackResponse,
                context:"signup"
            });
        
       
        
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme:'outline', size:'medium', text:'signup_with' ,locale:'en-IN'}
        )
        //google.accounts.id.prompt();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])   
    
    return(
        <div id='buttonDiv'></div>
    )
}
const mapDispatchToProps={
    signUp: userActions.signUp
}
export default connect(null, mapDispatchToProps)(SignUpGoogle)