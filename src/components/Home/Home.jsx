import React, { useState } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';

function Home() {
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

    return (
        <div className="text-center">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-3xl lg:text-3xl xl:text-4xl">
                Hi Ben!
            </h1>
            <h2 className="mt-6 mb-10 text-lg font-bold text-gray-900 leading-tight sm:mt-8 sm:text-2xl lg:text-2xl xl:text-3xl">
                What do you want to do today?
            </h2>
            <div className="flex flex-row items-center justify-center gap-4 mx-6">
                <div className="basis-1/3 bg-blue-300 shadow-md rounded-lg px-12 py-12" >
                    <PropertyCard cardProps={cardProps[0]} />
                </div>
                <div className="basis-1/3 bg-blue-300 shadow-md rounded-lg px-12 py-12">
                    <PropertyCard cardProps={cardProps[1]} />
                </div>
                <div className="basis-1/3 bg-blue-300 shadow-md rounded-lg px-12 py-12">
                    <PropertyCard cardProps={cardProps[2]} />
                </div>
            </div>
        </div>
    )
}

export default Home;