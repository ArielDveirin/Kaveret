import { Grid, Paper, Avatar, TextField, Button} from '@mui/material'
import {Link} from "react-router-dom"

import React, { useState } from 'react'



const Login=()=> {
    const paperStyle={padding : 20, height:'70vh', width:300, margin:"20px auto"}
    const avatarStyle={backgroundColor:'green'}
    const btnStyle={backgroundColor:'#fbcb05'}

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const [data, setData] = useState({data: []})
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
    
        try {
          const response = await fetch('http://localhost:3002/login', {
            method: 'POST',
            body: JSON.stringify({
                Username: username,
                Password: password,
             }),
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          } 
        } 
        
        catch(error)
        {
            setErr('Error');
        }
        finally {
          setIsLoading(false);
        }
        
    }


    return (
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid>
                    <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Username'   color="warning"
placeholder='Enter Username' fullWidth required onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField label='Password'   color="warning"
placeholder='Enter Password'  fullWidth required onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <br/>

                    <Button style={btnStyle} type='submit' variant='contained' color='primary' onClick={handleClick} fullWidth>Sign In</Button>
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