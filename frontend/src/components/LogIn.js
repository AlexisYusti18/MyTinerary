import React from 'react';
import '../styles/style.css';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import { Link as LinkRouter } from 'react-router-dom';
import LogInGoogle from './LogInGoogle';

function LogIn(props){

    const handleSubmit= async (event)=>{
        event.preventDefault()
        const logInUser= {
            email: event.target[0].value,
            password: event.target[1].value,
            from: "logIn"
        }
        console.log(event)
        props.logIn(logInUser)
        console.log(logInUser);
    }
    
    return(
        <div className='signup-ctn'>
            <h1>LogIn</h1>
            <form onSubmit={handleSubmit}>
                <input className='input-form'  name='email' type="email"  placeholder='Email'/>
                <input className='input-form'  name='password' type="text"  placeholder='Password'/>
                <button type="submit" value="submit">log in</button>
            </form>
            <div>
                <LogInGoogle/>
            </div>
            <LinkRouter to="/signUp">
            <button>Do not you have an account yet? create one now!</button>
          </LinkRouter>
        </div>
    )

}
const mapDispatchToProps= {
    logIn: userActions.logIn
  }
export default connect(null, mapDispatchToProps)(LogIn)