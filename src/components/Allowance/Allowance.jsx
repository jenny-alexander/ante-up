import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Constants from '../../constants/index';
import Modal from '../Common/Modal/Modal';
import './Allowance.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert/src/sweetalert.css';

function Allowance(props) {
    //const money = useSelector((store) => store.money);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const[showDepositModal, setShowDepositModal] = useState(false);
    const[spend, setSpend] = useState((props.allowance?.latestAllowance.spend));
    const[save, setSave] = useState((props.allowance?.save_weekly));
    const[share, setShare] = useState((props.allowance?.share_weekly));

    useEffect(()=> {
        console.log('ARF in Allowance useEffect')
        setSpend(props.allowance?.latestAllowance.spend);
        setSave(props.allowance?.latestAllowance.save);
        setShare(props.allowance?.latestAllowance.share);
    },[props.allowance])

    useEffect(() => {
        if ( props.bank.error != null) {
            console.log('props.bank.error are:', props.bank.error)
            showErrorModal();
        }
    },[props.bank.error])

    useEffect(() => {
        console.log('in the useEffect for depositSuccess, props.depositSuccess is:',props.bank.depositSuccess)
        if (props.bank.depositSuccess === true) {
            console.log('deposit was successful');
            showDepositSuccessModal();
        }
    }, [props.bank.depositSuccess])

    const getDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];
        return monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
    const showDepositSuccessModal = () => {
        Swal.fire({
            icon: 'success',
            title: 'Deposit successful',
          });
          
    }
    const showErrorModal = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
    const deposit = (amount, toAccount, dbAccountName) => {
        //console.log('in deposit and depositDetails are:', depositDetails);
        dispatch({
            type: 'DEPOSIT_BANK',
            payload: {
                userID: user.id,
                depositDetails: { 
                    amount : amount,
                     toAccount: toAccount,
                     dbAccountName: dbAccountName,
                }
            },
        });
    }

    const openAllowanceModal = (amount, toAccount, accountName, dbAccountName) => {
        console.log('in openSWAL and props are:', amount, toAccount, accountName, dbAccountName);
        Swal.fire({
            title: `Deposit ${accountName} Allowance?`,
            // text: 'Do you want to deposit your allowance?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#007E58',
            customClass: {
                title: 'allowance swal2-title',
            }
            //allowOutsideClick:false,
        }).then((result) => {
            if (result.isConfirmed) {
            //   Swal.fire('Saved!', '', 'success')
            console.log('user is confirming deposit');
            deposit(amount, toAccount, dbAccountName);
            } 
          })              
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
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.spend) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.spend_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.spend,'spend', 'Spend','spend_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Save</td>
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.save) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.save_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.save,'save','Save','save_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Share</td>
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.share) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.share_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.share,'share','Share','share_weekly_deposited')}
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