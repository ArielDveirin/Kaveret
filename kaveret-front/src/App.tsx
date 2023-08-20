import React, {useEffect, useState} from 'react';
import './App.css';

import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from './pages/login';
import SearchAppBar from './components/Nav';
import ResponsiveAppBar from './components/Nav';
import { stringify } from 'querystring';
import { Console } from 'console';

function App() {
    const [name, setName] = useState('');


    useEffect(() => {
        (
            async () => {


                const response = await fetch('http://localhost:3002/validate', {
                    method: "GET",
                    credentials: 'include',
                }).then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    return response.json();
                  })
                  .then(data => {
                    // Update the state with the received JSON data
                    setName(data.message.Username);
                  })
                  .catch(error => {
                    console.error('Error fetching data:', error);
                  });
                
            }
            
            
        )();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <ResponsiveAppBar name={name} setName={setName}/>
                
                <Routes>

                    <Route path="/"  element={<Home name={name}/>} />
                    
                    <Route path="/כניסה" element={<Login/>}/>

                    <Route path="/הרשמה" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;