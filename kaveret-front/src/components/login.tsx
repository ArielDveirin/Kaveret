import { Grid, Paper, Avatar, TextField, Button} from '@mui/material'
import {Link} from "react-router-dom"

import React from 'react'

const Login=()=> {
    const paperStyle={padding : 20, height:'70vh', width:300, margin:"20px auto"}
    const avatarStyle={backgroundColor:'green'}
    const btnStyle={backgroundColor:'#fbcb05'}


    return (
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid>
                    <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Username'   color="warning"
placeholder='Enter Username' fullWidth required/>
                    <br/>
                    <br/>
                    <TextField label='Email'   color="warning"
placeholder='Enter Email'  fullWidth required/>
                    <br/>
                    <br/>

                    <Button style={btnStyle} type='submit' variant='contained' color='primary' fullWidth>Sign In</Button>
                    <br/>
                    <br/>
                    <Link
                        to="/register">
                    Dont have an account?
                    </Link>
                    
                </Paper>
            </Grid>
        )
}

export default Login