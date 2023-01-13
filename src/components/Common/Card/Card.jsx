import { React, useState } from 'react';
import './Card.scss';

function Card({ className, component }) {
    return (
        <div className={`card ${className}`}>
            {component}
        </div>
    )
}

export default Card;