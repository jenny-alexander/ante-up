import { React, useState } from 'react';

function Card(props) {
    return (
        <div className="chart bg-white shadow-lg mb-10 sm:mx-24 md:mx-44 lg:mx-64 xl:mx-96  ">
            {props.component}
        </div>
    )
}

export default Card;