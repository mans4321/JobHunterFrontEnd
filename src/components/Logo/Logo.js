import React from 'react';
import { Link } from 'react-router-dom';
import jobHunter from '../../assets/images/JobHunter.png';
import  './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <Link to='/'>
            <img src={jobHunter} alt="MyBurger" />
        </Link>
        
    </div>
);
export default logo;