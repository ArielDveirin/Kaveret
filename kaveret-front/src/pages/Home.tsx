import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState({});

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
        <div>
            {name ? 'Hi ' + name : 'You are not logged in'}
        </div>


    );
};

export default Home;