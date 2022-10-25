import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import Button from '../Common/Button/Button';
import './Allowance.scss';

function Allowance(props) {
    const money = useSelector((store) => store.money);
    const getDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];
        return monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    const deposit = (amount) => {
        console.log('Deposit amount is:', amount);
        //DISPATCH Deposit money
    }

    return (
        <div className="allowance">
            <div className='allowance-title'>This Week's Allowance: {getDate()}</div>
                <table className="allowance-table">
                    <thead className="allowance-head">
                        <tr>
                            <th>Money Bucket</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Spend</td>
                            <td>{ money && money[0] ? money[0].spend_weekly : ''}</td>
                            <td>
                            { money[0] && money[0].spend_weekly_deposited ? <p>Deposited</p> :                                     
                                    <button className="allowance-button" onClick={() => deposit(money[0].spend_weekly)}>Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Save</td>
                            <td>{ money[0] ? money[0].save_weekly : ''}</td>
                            <td>
                                { money[0] && money[0].save_weekly_deposited ? <p>Deposited</p> :                                     
                                    <button className="allowance-button" onClick={() => deposit(money[0].save_weekly)}>Deposit</button>
                                } 
                                </td>
                        </tr>
                        <tr>
                            <td>Share</td>
                            <td>{ money[0] ? money[0].share_weekly : ''}</td>
                            <td>
                                { money[0] && money[0].share_weekly_deposited ? <p>Deposited</p> :                                     
                                    <button className="allowance-button" onClick={() => deposit(money[0].share_weekly)}>Deposit</button>
                                } 
                                </td>
                        </tr>                      
                    </tbody>
                </table>
         </div>
    )
}

export default Allowance;