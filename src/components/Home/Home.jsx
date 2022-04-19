import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PropertyCard from '../PropertyCard/PropertyCard';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';

function Home() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const cardProps = [
        {
            icon: <CurrencyDollarIcon />,
            text: 'Allowance'
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
        console.log('You clicked on the Allowance button!')

    }
    const onChoresClick = () => {
        console.log('You clicked on the Chores button!')
    }

    const onSettingsClick = () => {
        console.log('You clicked on the Allowance button!')
    }

    return (
        <div className="relative flex-col justify-center mx-auto w-full max-w-lg pt-10">
            <div className="bg-white shadow-md rounded-lg px-8 pt-1 pb-8 mb-4" >
                <div className="text-center">
                    <h1 className="mt-4 text-2xl font-bold leading-tight sm:mt-8 sm:text-3xl lg:text-3xl xl:text-4xl">
                        Hi {user.username}!
                    </h1>
                    <h2 className="mt-6 mb-10 text-lg leading-tight sm:mt-8 sm:text-2xl lg:text-2xl xl:text-3xl">
                        What do you want to do today?
                    </h2>
                    <div className="flex flex-row items-center justify-center gap-4 mx-6">
                        <div className="basis-1/6 bg-green-300 shadow-md rounded-lg px-10 hover:bg-green-400 cursor-pointer" onClick={onAllowanceClick} >
                            <PropertyCard cardProps={cardProps[0]} />

                        </div>
                        <div className="basis-1/6 bg-zinc-300 shadow-md rounded-lg px-12 py-3 hover:bg-zinc-400 cursor-pointer" onClick={onChoresClick}>
                            <PropertyCard cardProps={cardProps[1]} />
                        </div>
                        <div className="basis-1/6 bg-blue-300 shadow-md rounded-lg px-11 py-2 hover:bg-blue-400 cursor-pointer" onClick={onSettingsClick}>
                            <PropertyCard cardProps={cardProps[2]} />

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;