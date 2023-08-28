import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ItemPanel=()=> {
    const [isAdmin, setIsAdmin] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        (
            async () => {

        try {
            const response = await fetch('http://localhost:3002/isAdmin', {
              method: 'GET',
              credentials: 'include',
            });
        
            if (response.ok) {
              setIsAdmin(true)
            }
          } 
          catch(error)
          {
              setErr('Error');
          }
        }
            
            
        )();
    });

    return (
        <div>
            {isAdmin ? 'Hi Admin User' : 'You are not Admin'}
        </div>
    );
};

export default ItemPanel