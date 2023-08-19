import React, {useEffect, useState} from 'react';
import './App.css';

import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from './pages/login';
import SearchAppBar from './components/Nav';
import ResponsiveAppBar from './components/Nav';

function App() {
    const [name, setName] = useState('');

    

    /*
    return (
        <div className="App">
                <SearchAppBar/>
                
                <main className="form-signin">
                    <Routes>
                        <Route path="/"  Component={() => <Home name={name}/>}/>
                        <Route path="/login" Component={() => <Login setName={setName}/>}/>
                        <Route path="/register" Component={Register}/>
                    </Routes>
                </main>
        </div>
    );*/
    return (
        <div className="App">
            <BrowserRouter>
                <ResponsiveAppBar/>

                <Routes>

                    <Route path="/"  element={<Home name={''} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;