import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Constants from '../../constants/index';
import Modal from '../Common/Modal/Modal';
import './Allowance.scss';

function Allowance(props) {
    //const money = useSelector((store) => store.money);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const[showModal, setShowModal] = useState(false);
    const[spend, setSpend] = useState((props.allowance?.spend_weekly));
    const[save, setSave] = useState((props.allowance?.save_weekly));
    const[share, setShare] = useState((props.allowance?.share_weekly));
    //const[ deposited, setDeposited ] = useState(props.money[0].spend_weekly_deposited);
    

    const getDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];
        return monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    const deposit = (amount, toAccount, flagAccount) => {
        // console.log('Deposit amount is:', amount);
        // console.log('toAccount is:', toAccount);
        // console.log('flagAccount is:', flagAccount);

        dispatch({
            type: 'DEPOSIT_ALLOWANCE',
            payload: {
                amount: amount,
                toAccount: toAccount,
                depositFlag: flagAccount,
            },
        });

        dispatch({
            type: 'FETCH_ALLOWANCE',
            payload: user.id,
          })
    }
    const closeModal = () => {
        console.log('closing modal');
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div className="allowance">
            <button onClick={openModal}>Toggle modal</button>
            <Modal title='Deposit Allowance'
                   show={showModal}
                   close={() => {closeModal()}}
                   actions = {[ { name:'Confirm', method: () => deposit(spend, save, share)   }]}
            />     
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
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.spend_weekly) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.spend_weekly_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={() => deposit(props.allowance.spend_weekly,'spend_total', 'spend_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Save</td>
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.save_weekly) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.save_weekly_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={() => deposit(props.allowance.save_weekly,'save_total', 'save_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Share</td>
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.share_weekly) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.share_weekly_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={() => deposit(props.allowance.share_weekly,'share_total', 'share_weekly_deposited')}
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