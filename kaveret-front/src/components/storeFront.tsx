import { Grid, Paper, Avatar, TextField, Button, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent} from '@mui/material'
import {Link} from "react-router-dom"
import React, { Component } from 'react'
import {useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';


const StoreFront=()=> {
    const paperStyle={padding : 20, height:'70vh', width:300, margin:"20px auto"}
    


    return (

            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <h2>Register</h2>
                    
                    <br/>
        
                    
                </Paper>
            </Grid>
        )
        

}

export default  StoreFront