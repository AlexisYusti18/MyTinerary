import React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'

function Alert(props) {
    //console.log(props)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({
            type: 'MESSAGE',
            payload:{
                view: false,
                message: '',
                success: false}
        })
    }
    const action = (
        <Box sx={{
            width: '100%',
            backgroundColor: props.alert.success ? 'green':'red',
            color: 'white',
            borderRadius: '4px',
            padding: '4px',
            fontWeight: '400'}}>
            {(typeof props.alert.message) === "string" ?
                (<p sx={{backgroundColor:'green'}}>{props.alert.message}</p>) :
                <div>{props.alert.message.map((message,index) =><p key={index} sx={{backgroundColor:'red'}}>{message.message}</p>)}</div>
            }

        </Box>
    )

    return (
        <Snackbar
            open={props.alert.view}
            autoHideDuration={5000}
            onClose={handleClose}
            action={action}
            message={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            } 
        />
    )
}

const mapStateToProps = (state) => {
    return {
        alert: state.userReducer.alert
    }
}

export default connect(mapStateToProps, null)(Alert)