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
        setName("hi")
        const data = async () => {
            const response = await fetch("http://localhost:3002/validate", {
                headers: {'Content-Type': 'application/json'},
                'credentials':'include',

            })

            const content = await response.json();
            console.log(content)
            const details = content.message

            setName(details)

        }}
    
        


       
    );
    return (
        <div className="App">
            <BrowserRouter>
                <ResponsiveAppBar />
                
                <Routes>

                    <Route path="/"  element={<Home/>} />
                    
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;