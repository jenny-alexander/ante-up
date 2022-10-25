import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Common/Button/Button';
import './Allowance.scss';

function Allowance(props) {

    const getDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];

        return monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    return (
        <div className="allowance">
            <div className='allowance-title'>This Week's Allowance: {getDate()}</div>
                <table className="allowance-table">
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
                                { props.money ? props.money.spend_weekly : '' }
                                {/* {props.money[0].spend_weekly} */}
                                {/* 70.00 */}
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
                                {props.money ? props.money.save_weekly : ''}
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
                                {props.money ? props.money.share_weekly : ''}
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