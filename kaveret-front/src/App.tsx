import React, {useEffect, useState} from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from './pages/login';
import AdminPanel from './pages/adminPanel'
import ItemPanel from './pages/ItemPanel'

import ResponsiveDrawer from './components/ResponsiveDrawer';
import { ShoppingCartProvider } from './components/ShoppingCartContext';
import ReceiptShowcase from './pages/reciepts';
import Sweets from './pages/Sweets';
import Salty from './pages/Salty';
import Drinks from './pages/Drinks';
import Dairy from './pages/Dairy';
import Search from './pages/Search';

interface Item {
  ID?: number;
  Name: string;
  Price: string;
  Quantity: string;
  ImageUrl: string;
}

function App() {
    const [name, setName] = useState('');
    const [items, setItems] = useState<Item[]>([]);

    const [didValidate, setDidValidate] = useState(false);
    
    
    useEffect(() => {
        (
          
            async () => {

              if (name == "")
              {
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
                    setName(data.message.Username);
                  })
                  .catch(error => {
                    console.error('Error fetching data:', error);
                  });


                  
                    try {
                      const response = await fetch('http://localhost:3002/getItems', {
                        method: 'GET',
                        credentials: 'include',
                      });
              
                      if (response.ok) {
                        const responseBody = await response.text(); // Get the response text
                        
                        const jsonItems = JSON.parse((responseBody.toString()));
            
                        setItems(jsonItems.items);
                        
                      } else {
                        // Handle the case where the API request is not successful
                      }
                    } catch (error) {
                      // Handle any other errors that may occur during the API request
                    }
                  
                  
                  
            }
          }
            
        )();
    });
  
    const [searchFilter, setSearchFilter] = useState("");

  const handleSearchFilterChange = (newSearchFilter: string) => {
    setSearchFilter(newSearchFilter);
  };

    return (
        <div className="App">
                <ShoppingCartProvider items = {items} username={name}>

            <BrowserRouter>
                <ResponsiveDrawer onSearchFilterChange={handleSearchFilterChange} username={name} setName={function (name: string): void {
                    throw new Error('Function not implemented.');
                } }/>
                
                <Routes>

                    <Route path="/"  element={<Home name={name}/>} />
                    
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/item management" element={<ItemPanel searchWord={searchFilter} />} />
                  <Route path="/user management" element={<AdminPanel searchWord={searchFilter} />} />
                  <Route path="/receipts" element={<ReceiptShowcase username={name} items={items} />} />
                  <Route path="/sweets" element={<Sweets/>} />
                  <Route path="/salty" element={<Salty/>} />
                  <Route path="/drinks" element={<Drinks/>} />
                  <Route path="/dairy" element={<Dairy/>} />
                  <Route path="/Search" element={<Search/>} />


                </Routes>
            </BrowserRouter>
            </ShoppingCartProvider>

        </div>
    );
}

export default App;