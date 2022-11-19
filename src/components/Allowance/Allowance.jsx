import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Constants from '../../constants/index';
import './Allowance.scss';
import Swal from 'sweetalert2';

function Allowance(props) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const[spend, setSpend] = useState(props.allowance?.latestAllowance.spend);
    const[save, setSave] = useState(props.allowance?.latestAllowance.save_weekly);
    const[share, setShare] = useState(props.allowance?.latestAllowance.share_weekly);    
    const[lastDeposited, setLastDeposited] = useState('');
    const[updatedLatestAllowance, setUpdatedLatestAllowance] = useState({});

    useEffect(()=> {
         console.log('ARF in Allowance useEffect & props are:', props.allowance)
        setUpdatedLatestAllowance(props.allowance?.latestAllowance);
        //TODO: Look at latestAllowance instead?
        setSpend(props.allowance.latestAllowance.spend);
        setSave(props.allowance.latestAllowance.save);
        setShare(props.allowance.latestAllowance.share);        
    },[props.allowance.latestAllowance])


    useEffect(() => {
        if ( props.bank.error != null) {            
            showErrorModal();
        }
    },[props.bank.error])

    useEffect(() => { 
        if (props.bank.depositSuccess === true) {
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
    }, [props.bank.depositSuccess])

    const getDate = () => {
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[date.getMonth()];
        return monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
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
        // console.log('in openSWAL and props are:', amount, toAccount, accountName, dbAccountName);
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
            animation: false,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            // didOpen: (toast) => {
            //   toast.addEventListener('mouseenter', Swal.stopTimer)
            //   toast.addEventListener('mouseleave', Swal.resumeTimer)
            // }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Deposited Successfully!'
          })
    }
    return (
        <div className="allowance">

            {/* <button onClick={launchToast}>Launch toast</button> */}
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
                            <td>{ props.allowance?.latestAllowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.spend) : ''}</td>
                            <td>
                                {
                               props.allowance && props.allowance?.latestAllowance.spend_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.spend,'spend', 'Spend','spend_deposited')}
                                    > Deposit</button>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Save</td>
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.save) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.latestAllowance.save_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            onClick={ () => openAllowanceModal(props.allowance.latestAllowance.save,'save','Save','save_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                        <tr>
                            <td>Share</td>
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.share) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance.latestAllowance?.share_deposited ? <p>Deposited</p> :                               
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