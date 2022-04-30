import { React } from 'react';

function Allowance(props) {

    return (
        <div className="flex flex-col">
            <div className="allowance-table px-24 py-10 ">
                <table className="min-w-full shadow-lg">
                    <thead className="border-b">
                        <tr className="bg-green-100 uppercase">
                            <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                Money Bucket
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                Amount
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                Paid
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                Spend
                            </td>
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                $50.00
                            </td>
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                <input type="checkbox"></input>
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                Save
                            </td>
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                $25.00
                            </td>
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                <input type="checkbox"></input>
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                Share
                            </td>
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                $5.00
                            </td>
                            <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                <input type="checkbox"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        // </div >


    )
}

export default Allowance;