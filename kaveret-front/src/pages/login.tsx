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
              credentials: 'include',
              body: JSON.stringify({
                  Username: username,
                  Password: password,
               }),
            });
      
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
      
            const result = await response.json();
            setData(result);
          } 
          catch(error)
          {
              setErr('Error');
          }
          finally {
            setRedirect(true);
          }
          
        
    }
    if (direct) {
            navigate('/');
    }
        
    


    return (
            <Grid dir='rtl'>
                <Paper elevation={10} style={paperStyle}>
                    <Grid>
                    <h2>כניסה למערכת</h2>
                    </Grid>
                    <TextField label='שם משתמש'  dir='rtl' color="warning"
placeholder='הכנס שם משתמש' fullWidth required onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField label='סיסמא'  dir='rtl' color="warning"
placeholder='הכנס סיסמא'  fullWidth required onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <br/>

                    <Button style={btnStyle} type='submit' variant='contained' color='primary' onClick={handleClick} fullWidth>כניסה</Button>
                    <br/>
                    <br/>
                    <Link
                        to="/הרשמה">
                    רוצה להרשם?
                    </Link>
                    
                </Paper>
            </Grid>
        )
}

export default Login