import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import * as Constants from '../../constants/index';
import * as Constants from '../../../constants/index';
import './Allowance.scss';
import Swal from 'sweetalert2';
import { Day } from 'react-day-picker';

function Allowance(props) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const[lastDeposited, setLastDeposited] = useState('');
    const[updatedLatestAllowance, setUpdatedLatestAllowance] = useState({});
    const[allowanceDay, setAllowanceDay] = useState('');

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    useEffect(()=> {
        setUpdatedLatestAllowance(props.allowance.latestAllowance);
        setAllowanceDay(getDayOfWeek(props.allowance.latestAllowance.allowance_date)); 
    },[props.allowance.latestAllowance])

    useEffect(() => {
        if ( props.bank.error != null) {            
            showErrorModal();
        }
    },[props.bank.error])

    useEffect(() => {        
        if (props.bank.allowanceDepositSuccess === true) {            
            dispatch({type:'CLEAR_DEPOSIT_SUCCESS_FLAG'});
        }
    }, [])

    useEffect(() => { 
        if (props.bank.allowanceDepositSuccess === true) {
            dispatch( {
                type: 'UPDATE_ALLOWANCE',
                payload: {
                    updatedLatestAllowance,
                    userID: user.id,
                    allowanceID: props.allowance.latestAllowance.id,
                    depositedFlagColumn: lastDeposited,
                }
            })
            launchSuccessToast();
        }
    },[props.bank.allowanceDepositSuccess])
    
    const showErrorModal = () => {
        Swal.fire({
            icon: 'error',  
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
    const deposit = (amount, toAccount, dbAccountName) => {
        setLastDeposited(dbAccountName);
        dispatch({
            type: 'CHANGE_BANK',
            payload: {
                userID: user.id,
                allowanceDeposit: true,
                depositDetails: { 
                    bankChangeType: 'deposit', //+ for deposit, - for withdrawal
                    amount : amount,
                    toAccount: toAccount,
                }
            },
        });
        dispatch({
            type: 'ADD_BANK_TRANSACTION',
            payload: {
                userId: user.id,
                type: 'deposit',
                timestamp: new Date().toISOString(),
                amount: amount,
                notes: 'Allowance deposit',
            }
        })
    }
    const openAllowanceModal = (amount, toAccount, accountName, dbAccountName) => {        
        Swal.fire({
            title: `Deposit ${accountName} Allowance?`,            
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#007E58',
            customClass: {
                popup: 'swal2-popup allowance',
                title: 'swal2-title allowance',
                icon:'swal2-icon allowance',              
            },
            showClass: {
                popup: 'swal2-noanimation',
                icon: 'swal2-noanimation'
              },
        }).then((result) => {
            if (result.isConfirmed) {
            deposit(amount, toAccount, dbAccountName);
            } 
        })              
    }
    const launchSuccessToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            //animation: false,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,
            //timerProgressBar: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Deposited Successfully!',
            showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: 'swal2-noanimation',
                icon: 'swal2-noanimation'
              },
          })
    }
    const getDayOfWeek = (date) => {
        const datum = new Date(date);
        const dayOfWeek = weekday[datum.getDay()];
        return dayOfWeek;
    }

        return (           
            <div className="allowance">                                                
                <div className='allowance-title'>  
                    Allowance info                  
                </div>                
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
                            <td>{ Constants.dollarUS.format(props.allowance?.latestAllowance?.spend)}</td>
                            <td>
                                {
                                props.allowance?.latestAllowance?.spend_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.spend,'spend', 'Spend','spend_deposited')}
                                    > Deposit</button>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Save</td>                            
                            <td>{Constants.dollarUS.format(props.allowance?.latestAllowance?.save)}</td>
                            <td>
                            {     
                                props.allowance?.latestAllowance?.save_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.save,'save','Save','save_deposited')}
                                    > Deposit</button>                                    
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Share</td>                            
                            <td>{ Constants.dollarUS.format(props.allowance?.latestAllowance?.share)}</td>
                            <td>
                            {     
                                props.allowance?.latestAllowance?.share_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.share,'share','Share','share_deposited')}
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