import { Grid, Paper, Avatar, TextField, Button} from '@mui/material'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react'


const Login=()=> {
    const navigate = useNavigate();

    const paperStyle={padding : 20, height:'70vh', width:300, margin:"20px auto"}
    const avatarStyle={backgroundColor:'green'}
    const btnStyle={backgroundColor:'#fbcb05'}

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [direct, setRedirect] = useState(false);
    const [data, setData] = useState({data: []})
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    //const response = await fetch('http://localhost:3002/login', {
  
    const handleClick = async () => {
    
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
      
            const result = await response.json();
      
            console.log('result is: ', JSON.stringify(result, null, 4));
            
            const content = await response.json();



            setData(result);
          } 
          catch(error)
          {
              setErr('Error');
          }
          finally {
            setIsLoading(false);

            setRedirect(true);
          }
          
        
    }
    if (direct) {
            navigate('/');
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