import { useReducer } from 'react';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import {Link as LinkRouter} from "react-router-dom"
import {MenuItem,Typography} from '@mui/material';
function LogOut(props){

    const logOut=()=>{
        props.logOut(props.user.email)
    }
    return(
        <div>
        
            <LinkRouter to="/home" style={{textDecoration:'none'}}>
                <MenuItem>
                    <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
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