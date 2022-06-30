import React from 'react';
import '../styles/style.css';
import { Link as LinkRouter } from 'react-router-dom';
//import {useDispatch, useSelector} from 'react-redux';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import SignUpGoogle from './SignUpGoogle';
import logo from '../assets/logo.png'

function SignUp(props){
  
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
      from:'singUp'
    }
    console.log(event);
    props.signUp(userData)
    console.log(userData);
  }

  return (
    <div className='signup-ctn'>
      <form className='form-signup' onSubmit={handleSubmit}>
        <img src={logo} style={{height:'50px', width:'50px'}}/>
        <h1 style={{fontWeight:'900', color:'black'}}>Sign up</h1>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <p>Do you already have an account?</p>
          <LinkRouter to="/logIn"><span>Log In</span></LinkRouter>
        </div>
        <input className='input-form'  name='name' type="text" placeholder='Name' />
        <input className='input-form'  name='lastName' type="text"  placeholder='LastName'/>
        <input className='input-form'  name='email' type="email"  placeholder='Email'/>
        <input className='input-form'  name='password' type="text"  placeholder='Password'/>
        <select className='input-form' style={{cursor:'pointer'}} name='country'>
                  {countrys.map((country,index)=>
                      <option key={index}>{country}</option>
                    )}
        </select>
        <input className='input-form'  name='imageUser' type="text"  placeholder='Profile Pic'/>
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

// import React from 'react';
// import '../styles/style.css';
// import { Link as LinkRouter } from 'react-router-dom';
// //import {useDispatch, useSelector} from 'react-redux';
// import userActions from '../redux/actions/userActions';
// import {useDispatch } from 'react-redux';
// import SignUpGoogle from './SignUpGoogle';

// export default function SignUp(){
//    const dispatch= useDispatch()
//   //CADA VEZ QUE HAGO SUBMIT SE LLAMA A ESTA FUNCION
  
//   const handleSubmit=(event)=>{
//     event.preventDefault() //PARA QUE NO RECARGUE LA APGINA
    
//     dispatch(userActions.signUp({
//       userData :{
//         name:event.target[0].value,
//         lastName:event.target[1].value,
//         email:event.target[2].value,
//         password:event.target[3].value,
//         country:event.target[4].value,
//         imageUser:event.target[5].value,
//         from:'singUp'
//       }
//     }))
//     console.log(event);

    
//   }

//   return (
//     <div className='signup-ctn'>
//       <div className='ctn-down'>
//         <div>
//           <h1>Welcome</h1>
//           <p>Already have an account?</p>
//         </div>
//         <div>
//           <LinkRouter to="/logIn">
//             <button>Log In</button>
//           </LinkRouter>
//         </div>
//       </div>
//       <form className='form-signup' onSubmit={handleSubmit}>
//         <input className='input-form'  name='name' type="text" placeholder='Name' />
//         <input className='input-form'  name='lastName' type="text"  placeholder='LastName'/>
//         <input className='input-form'  name='email' type="email"  placeholder='Email'/>
//         <input className='input-form'  name='password' type="text"  placeholder='Password'/>
//         <input className='input-form'  name='country' type="text"  placeholder='Country'/>
//         <input className='input-form'  name='imageUser' type="text"  placeholder='Profile Pic'/>
//         <button type="submit" value="submit">Create Account</button>
//       </form>
//       <div style={{marginTop:'3rem'}}>
//           <SignUpGoogle/>
//       </div>
//     </div>
//   );
// }