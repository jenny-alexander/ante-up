import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropertyCard from '../PropertyCard/PropertyCard';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';
import './Home.scss'

function Home() {
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const cardProps = [
        {
            icon: <CurrencyDollarIcon />,
            text: 'Money'
        },
        {
            icon: <TrashIcon />,
            text: 'Chores'
        },
        {
            icon: <UserIcon />,
            text: 'Settings'
        },
    ]

    const onAllowanceClick = () => {
        console.log('You clicked on the Money button!')
        //now direct user to the Money page - use router
        history.push('/money');
    }
    const onChoresClick = () => {
        console.log('You clicked on the Chores button!')
    }

    const onSettingsClick = () => {
        console.log('You clicked on the Settings button!')
    }

    return (
        <div className = "home-top">
        <div className="home-main">
                {/* <div className="text-center"> */}
                    <h1 className="home-title">
                        Hi {user.username}!
                    </h1>
                    <h2 className="home-subtitle">
                        What do you want to do today?
                    </h2>                    
                     <div className="home-options">
                       <div className="home-money"
                            onClick={onAllowanceClick}
                        >
                            <PropertyCard cardProps={cardProps[0]} />
                        </div>
                        <div className="home-chores"
                            onClick={onChoresClick}
                        >
                            <PropertyCard cardProps={cardProps[1]} />
                        </div>
                        <div className="home-settings"
                            onClick={onSettingsClick}
                        >
                            <PropertyCard cardProps={cardProps[2]} />
                        </div>
                    </div>
             </div>
        </div>

    )
}

export default Home;