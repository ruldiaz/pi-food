import React from 'react';
import {Link} from 'react-router-dom';
import './landing.css';

export default function LandingPage(){
    return (
        <div className='landing-page'>
            <h1>Welcome to my Food Individual Project</h1>
            <Link to="/home">
                <button>Start</button>
            </Link>
            <footer>Developed by Raul, using react, express, node, sequelize, and postgres</footer>
        </div>
        
    );
}