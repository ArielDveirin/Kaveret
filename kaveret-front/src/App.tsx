import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3000/validate', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>

                <main className="form-signin">
                    <Route path="/"  Component={() => <Home name={name}/>}/>
                    <Route path="/login" Component={() => <Login setName={setName}/>}/>
                    <Route path="/register" Component={Register}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;