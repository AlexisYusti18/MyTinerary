import React from 'react';
import '../styles/style.css';
import { Link as LinkRouter } from 'react-router-dom';
//import {useDispatch, useSelector} from 'react-redux';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import SignUpGoogle from './SignUpGoogle';
import logo from '../assets/logo.png';
import { useState } from 'react';

function SignUp(props){
  const roles= ["Select rol", "user"]
  
  const countrys= ["unselected","Argentina", "Uruguay","Chile","Bolivia","Peru","Brazil","Colombia","Venezuela","Paraguay","Ecuador"]
  const[selectCountry, setSelectCountry]= useState("unselected")

  function selected(event){
    console.log(event.target.value)
    setSelectCountry(event.target.value)
  }


  //CADA VEZ QUE HAGO SUBMIT SE LLAMA A ESTA FUNCION
  const handleSubmit=(event)=>{
    event.preventDefault()
    const userData ={
      name:event.target[2].value,
      lastName:event.target[3].value,
      email:event.target[4].value,
      password:event.target[5].value,
      imageUser:event.target[6].value,
      role:event.target[7].value,
      from:'signUp',
      country:selectCountry
    }
    event.target.reset()
    console.log(event);
    props.signUp(userData)
    console.log(userData);
  }

  return (
    <>
      <div className='signup-ctn'>
      <form className='form-signup' onSubmit={handleSubmit}>
         <img src={logo} style={{height:'50px', width:'50px'}} alt="logo"/>
         <h1 style={{fontWeight:'900', color:'black'}}>Sign up</h1>
          <div className='title-form' style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
            <p>Do you already have an account?</p>
              <LinkRouter to="/logIn">
                <button className='button-sigin-log'>LogIn</button>
              </LinkRouter>
          </div>
         <div>
           <select className='input-form' style={{cursor:'pointer'}} name='country' onChange={selected}>
                   {countrys.map((country,index)=>
                      <option style={{cursor:'pointer'}} key={index}>{country}</option>
                    )}
          </select>
        </div>
        {selectCountry !== "unselected" ?
          <>
            <input className='input-form'  autoComplete='off' name='name' type="text" placeholder='Name' />
            <input className='input-form'  autoComplete='off' name='lastName' type="text"  placeholder='LastName'/>
            <input className='input-form'  autoComplete='off' name='email' type="email"  placeholder='Email'/>
            <input className='input-form'  autoComplete='off' name='password' type="password"  placeholder='Password'/>
            <input className='input-form'  autoComplete='off' name='imageUser' type="text"  placeholder='Profile Pic'/>
            <select className='input-form' style={{cursor:'pointer'}} name='country'>
                  {roles.map((rol,index)=>
                      <option key={index}>{rol}</option>
                      )}
            </select>
            <button className='form-env' type="submit" value="submit">Create Account</button>
            <p style={{textAlign:'center'}}>or</p>
            <div style={{marginTop:'1rem', textAlign:'center'}}>
              <SignUpGoogle country={selectCountry}/>
            </div>
      
          </>
              : <h1 className='title-all'>Select a country to continue</h1>
        }
      </form>
    </div>

  </>
    
  );
}

const mapDispatchToProps= {
  signUp: userActions.signUp
}
export default connect(null, mapDispatchToProps)(SignUp);
