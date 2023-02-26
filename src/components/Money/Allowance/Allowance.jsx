import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Constants from '../../../constants/index';
import './Allowance.scss';
import Swal from 'sweetalert2';

function Allowance(props) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const[lastDeposited, setLastDeposited] = useState('');
    const[updatedLatestAllowance, setUpdatedLatestAllowance] = useState({});
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    useEffect(()=> {
        setUpdatedLatestAllowance(props.allowance.latestAllowance);        
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
                    bankChangeType: 'deposit',
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
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,            
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Deposited Successfully!',
            showClass: {
                backdrop: 'swal2-noanimation',
                popup: 'swal2-noanimation',
                icon: 'swal2-noanimation'
              },
          })
    }
    const AllowanceRow = (props) => {
        return (
            <tr>
                <td>{props.amountType}</td>                           
                <td>{ Constants.dollarUS.format(props.amount)}</td>
                <td>
                {
                    props.deposited ? <p>Deposited</p> :                               
                        <button className="allowance-button" 
                                onClick={ () => openAllowanceModal(props.amount,props.toAccount, props.accountName,props.dbAccountName)}
                        > Deposit</button>
                }
                </td>
        </tr>
        )
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
                        { 
                            props.allowance?.latestAllowance ? 
                                <>
                                    <AllowanceRow amountType="Spend"
                                                  amount={props.allowance.latestAllowance?.spend}
                                                  deposited={props.allowance.latestAllowance.spend_deposited}
                                                  toAccount="spend" 
                                                  accountName="Spend"
                                                  dbAccountName="spend_deposited"
                                    />
                                    <AllowanceRow amountType="Save"
                                                  amount={props.allowance.latestAllowance?.save} 
                                                  deposited={props.allowance.latestAllowance.save_deposited}
                                                  toAccount="save" 
                                                  accountName="Save"
                                                  dbAccountName="save_deposited"
                                    />
                                    <AllowanceRow amountType="Share"
                                                  amount={props.allowance.latestAllowance?.share}
                                                  deposited={props.allowance.latestAllowance.share_deposited}
                                                  toAccount="share" 
                                                  accountName="Share"
                                                  dbAccountName="share_deposited"
                                    />
                                </> : null
                        }

                    </tbody>
                </table>                
            </div>
        )
}

export default Allowance;