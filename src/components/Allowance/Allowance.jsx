import { React, useState } from 'react';

function Allowance(props) {

    return (
        <div className="allowance-table pb-8 sm:px-24 md:px-44 lg:px-64 xl:px-96 ">
            <div className="table-title font-bold text-xl text-center py-4">
                This week's allowance
            </div>
            <table className="min-w-full shadow-xl  ">
                <thead className="border-b">
                    <tr className="bg-green-600 text-white uppercase text-sm text-left">
                        <th scope="col" className="pl-8 py-4">
                            Money Bucket
                        </th>
                        <th scope="col" className="px-8 py-4">
                            Amount
                        </th>
                        <th scope="col" className="px-8 py-4">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* TODO: Add config to tailwind config file for button styling */}
                <tbody>
                    <tr className="bg-white border-b text-sm text-gray-900">
                        <td className="px-8 py-4">
                            Spend
                        </td>
                        <td className="px-8 py-4">
                            $50.00
                        </td>
                        <td className="px-8 py-4">
                            <button className="bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded">Deposit</button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b text-sm text-gray-900">
                        <td className="px-8 py-4">
                            Save
                        </td>
                        <td className="px-8 py-4">
                            $25.00
                        </td>
                        <td className="px-8 py-4">
                            <button className="bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded">Deposit</button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b text-sm text-gray-900">
                        <td className="px-8 py-4">
                            Share
                        </td>
                        <td className="px-8 py-4">
                            $5.00
                        </td>
                        <td className="px-8 py-4">
                            <button className="bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 text-white text-center py-2 px-4 rounded">Deposit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Allowance;