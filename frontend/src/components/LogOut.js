import { useReducer } from 'react';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import {Link as LinkRouter} from "react-router-dom"

function LogOut(props){

    const logOut=()=>{
        props.logOut(props.user.email)
    }
    return(
        <div>
            <LinkRouter to="/home">
                <h1 onClick={logOut}>LogOut</h1>
            </LinkRouter>
        </div>

    )


}

const mapDispatchToProps={
    logOut:userActions.logOut
}
const mapStateToProps=(state)=>{
    return{
        user:useReducer.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogOut)