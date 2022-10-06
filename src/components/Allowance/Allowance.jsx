import { React, useState } from 'react';
import Button from '../Common/Button/Button';
import './Allowance.scss';

function Allowance(props) {

    const getDate = () => {
        const date = new Date();
        const day = date.getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();

        return monthName + ' ' + day + ', ' + year;
    }

    return (
        <div className="money">
            <div className='allowance-title'>This Week's Allowance: {getDate()}</div>
                <table  className="allowance-table">
                    <thead className="allowance-head">
                        <tr>
                            <th>
                                Money Bucket
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Spend
                            </td>
                            <td>
                                50.00
                            </td>
                            <td>
                                <Button className="allowance-button"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Save
                            </td>
                            <td>
                                25.00
                            </td>
                            <td>
                            <Button className="allowance-button"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Share
                            </td>
                            <td>
                                5.00
                            </td>
                            <td>
                            <Button className="allowance-button"/>
                            </td>
                        </tr>                        
                    </tbody>
                </table>
         </div>
    )
}

export default Allowance;