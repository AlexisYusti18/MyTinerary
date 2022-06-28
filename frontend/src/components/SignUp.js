import React from 'react';
import '../styles/style.css'

export default function SignUp(){

  //CADA VEZ QUE HAGO SUBMIT SE LLAMA A ESTA FUNCION
  const handleSubmit=(event)=>{
    event.preventDefault() //PARA QUE NO RECARGUE LA APGINA
    
    const userData ={
      name:event.target.value,
      FirstName:event.target.value,
      country:event.target.value,
      email:event.target.value,
      password:event.target.value,
      imageUser:event.target.value,
      from:'singup'
    }
    
  }












  return (
    <div className='signup-ctn'>
      <form className='form-signup' onSubmit={handleSubmit}>
        <input className='input-form' type="text" placeholder='FirstName' />
        <input className='input-form'  type="text"  placeholder='LastName'/>
        <input className='input-form'  type="text"  placeholder='Country'/>
        <input className='input-form'  type="email"  placeholder='Email'/>
        <input className='input-form'  type="text"  placeholder='Password'/>
        <input className='input-form'  type="text"  placeholder='Profile Pic'/>
        <button type="submit" value="submit">send</button>
      </form>
    </div>
  );
}

