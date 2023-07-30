import { Grid, Paper, Avatar, TextField, Button} from '@mui/material'
import {Link} from "react-router-dom"
import React, { Component } from 'react'
import {useState} from 'react';


const Register=()=> {
    const paperStyle={padding : 20, height:'70vh', width:300, margin:"20px auto"}
    const avatarStyle={backgroundColor:'green'}
    const btnStyle={backgroundColor:'#fbcb05'}
    
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const [data, setData] = useState({data: []})
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
    
        try {
          const response = await fetch('http://localhost:8080/post', {
            method: 'POST',
            body: JSON.stringify({
                Username: username,
                Password: password,
                'Email': email,
             }),
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
    
          console.log('result is: ', JSON.stringify(result, null, 4));
    
          setData(result);
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
                    <h2>Register</h2>
                    </Grid>
                    <TextField label='Username'   color="warning" placeholder='Enter Username' fullWidth required onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField label='Email'   color="warning" placeholder='Enter Email'  fullWidth required onChange={e => setEmail(e.target.value)} />
                    <br/>
                    <br/>
                    <TextField label='Password'  color="warning" placeholder='Enter Password' type='password' fullWidth required onChange={e => setPassword(e.target.value)} />
                    <br/>
                    <br/>

                    

                    <Button style={btnStyle} type='submit' variant='contained' color='primary' fullWidth onClick={handleClick}>Sign UP</Button>
                    <br/>
                    <br/>
                    <Link
                        to="/login">
                    Already have an account?
                    </Link>
                    
                </Paper>
            </Grid>
        )
}

export default  Register