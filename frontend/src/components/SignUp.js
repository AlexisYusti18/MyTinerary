import React from 'react';
import '../styles/style.css';
import { Link as LinkRouter } from 'react-router-dom';
//import {useDispatch, useSelector} from 'react-redux';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import SignUpGoogle from './SignUpGoogle';
import logo from '../assets/logo.png'

function SignUp(props){
  const roles= ["Select rol", "user"]
  const countrys= ["Select Country","Argentina", "Uruguay","Chile","Bolivia","Peru","Brazil","Colombia","Venezuela","Paraguay","Ecuador"]
  //CADA VEZ QUE HAGO SUBMIT SE LLAMA A ESTA FUNCION
  const handleSubmit=(event)=>{
    event.preventDefault() //PARA QUE NO RECARGUE LA APGINA
    const userData ={
      name:event.target[0].value,
      lastName:event.target[1].value,
      email:event.target[2].value,
      password:event.target[3].value,
      country:event.target[4].value,
      imageUser:event.target[5].value,
      role:event.target[6].value,
      from:'signUp'
    }
    event.target.reset()
    //console.log(event);
    props.signUp(userData)
    //console.log(userData);
  }

  return (
    <div className='signup-ctn'>
      <form className='form-signup' onSubmit={handleSubmit}>
        <img src={logo} style={{height:'50px', width:'50px'}} alt="logo"/>
        <h1 style={{fontWeight:'900', color:'black'}}>Sign up</h1>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <p>Do you already have an account?</p>
          <LinkRouter to="/logIn"><span>Log In</span></LinkRouter>
        </div>
        <input className='input-form'  name='name' type="text" placeholder='Name' />
        <input className='input-form'  name='lastName' type="text"  placeholder='LastName'/>
      
        <input className='input-form'  name='email' type="email"  placeholder='email'/>
        
        <input className='input-form'  name='password' type="text"  placeholder='Password'/>
        <select className='input-form' style={{cursor:'pointer'}} name='country'>
                  {countrys.map((country,index)=>
                      <option style={{cursor:'pointer'}} key={index}>{country}</option>
                    )}
        </select>
        <input className='input-form'  name='imageUser' type="text"  placeholder='Profile Pic'/>
        <select className='input-form' style={{cursor:'pointer'}} name='country'>
                  {roles.map((rol,index)=>
                      <option key={index}>{rol}</option>
                    )}
        </select>
        <button className='form-env' type="submit" value="submit">Create Account</button>
        <div style={{marginTop:'1rem'}}>
          <SignUpGoogle/>
        </div>
      </form>
      
    </div>
  );
}

const mapDispatchToProps= {
  signUp: userActions.signUp
}
export default connect(null, mapDispatchToProps)(SignUp);
