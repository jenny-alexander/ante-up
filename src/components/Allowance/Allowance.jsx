import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
//import Button from '../Common/Button/Button';
import './Allowance.scss';

function Allowance(props) {
    //const money = useSelector((store) => store.money);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    //const[ deposited, setDeposited ] = useState(props.money[0].spend_weekly_deposited);
    

    const getDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];
        return monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    useEffect(() => {
        console.log('MEOW in useEffect of Allowance!!!')
        console.log('PROPS of allowance are:', props.money);
        // dispatch({
        //     type: 'FETCH_MONEY',
        //     payload: user.id,
        // })
    },[props.money])

    const deposit = (amount, toAccount, flagAccount) => {
        // console.log('Deposit amount is:', amount);
        // console.log('toAccount is:', toAccount);
        // console.log('flagAccount is:', flagAccount);

        dispatch({
            type: 'DEPOSIT_MONEY',
            payload: {
                amount: amount,
                toAccount: toAccount,
                depositFlag: flagAccount,
            },
        });

        dispatch({
            type: 'FETCH_MONEY',
            payload: user.id,
          })
    }

    return (
        <div className="allowance">
            {/* <p>Deposited is:{JSON.stringify(deposited)}</p> */}
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
                            <td>{ props.money ? props.money[0]?.spend_weekly : ''}</td>
                            <td>
                            {     
                               props.money && props.money[0]?.spend_weekly_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={() => deposit(props.money[0].spend_weekly,'spend_total', 'spend_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Save</td>
                            <td>{ props.money ? props.money[0]?.save_weekly : ''}</td>
                            <td>
                            {     
                               props.money && props.money[0]?.save_weekly_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={() => deposit(props.money[0].save_weekly,'save_total', 'save_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Share</td>
                            <td>{ props.money ? props.money[0]?.share_weekly : ''}</td>
                            <td>
                            {     
                               props.money && props.money[0]?.share_weekly_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={() => deposit(props.money[0].share_weekly,'share_total', 'share_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                    </tbody>
                </table>
         </div>
    )
}

export default Allowance;