import React, { useState, useEffect } from 'react';

const Home = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3002/validate', {
                    method: "GET",
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.message);
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