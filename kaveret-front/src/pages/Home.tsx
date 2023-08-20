import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = (props: { name: string }) => {

    return (
        <div>
            {props.name ? 'Hi ' + props.name : 'You are not logged in'}
        </div>


    );
};

export default Home;