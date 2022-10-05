import { React, useState } from 'react';
import './Card.scss';

function Card(props) {
    return (
        <div className="card">
            {props.component}
        </div>
    )
}

export default Card;