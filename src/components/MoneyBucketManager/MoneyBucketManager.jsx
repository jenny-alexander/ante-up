import { React, useState } from 'react';

function MoneyBucketManager(props) {

    // TODO: Add entry in tailwindcss config file for '+' and '-' button css.
    return (
        <div className="money-bucket">
            <div className="bucket-title font-bold text-xl text-center py-6">
                Money Bucket Manager
            </div>
            <div className='flex flex-row justify-center px-6 gap-6'>
                <div className="spend bg-orange-400 w-full text-center rounded-md">
                    <div className="spend-title text-lg font-semibold py-2 border-b border-black">
                        Spend
                    </div>
                    <div className="spend-total text-xl pt-1">
                        $130.00
                    </div>
                    <div className="spend-buttons flex justify-center text-white font-bold py-4 gap-2">
                        <button className="deposit-button rounded-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800">+</button>
                        <button className="deposit-button rounded-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800">-</button>
                    </div>
                </div>
                <div className="spend bg-teal-300 w-full text-center rounded-md">
                    <div className="spend-title text-lg font-semibold py-2 border-b border-black">
                        Share
                    </div>
                    <div className="spend-total text-xl pt-1">
                        $70.00
                    </div>
                    <div className="spend-buttons flex justify-center text-white font-bold py-4 gap-2">
                        <button className="deposit-button rounded-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800">+</button>
                        <button className="deposit-button rounded-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800">-</button>
                    </div>
                </div>
                <div className="spend bg-yellow-300 w-full text-center rounded-md">
                    <div className="spend-title text-lg font-semibold py-2 border-b border-black">
                        Save
                    </div>
                    <div className="spend-total text-xl pt-1">
                        $180.00
                    </div>
                    <div className="spend-buttons flex justify-center text-white font-bold py-4 gap-2">
                        <button className="deposit-button rounded-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800">+</button>
                        <button className="deposit-button rounded-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800">-</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MoneyBucketManager;