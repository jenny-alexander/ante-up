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
    //const[ deposited, setDeposited ] = useState(props.money[0].spend_weekly_deposited);
    const[depositDetails, setDepositDetails] = useState({});

    useEffect(()=> {
        console.log('ARF in Allowance useEffect')
        setSpend(props.allowance?.latestAllowance.spend);
        setSave(props.allowance?.latestAllowance.save);
        setShare(props.allowance?.latestAllowance.share);
    },[props.allowance])

    useEffect(() => {
        if ( props.bankError != null) {
            console.log('props.bankError are:', props.bankError)
            showErrorModal();
        }
    },[props.bankError])

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
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
    const deposit = () => {
        console.log('in deposit and depositDetails are:', depositDetails);
        dispatch({
            type: 'DEPOSIT_BANK',
            payload: {
                userID: user.id,
                depositDetails: depositDetails,
            },
        });
    }
    // const closeDepositModal = () => {
    //     console.log('closing modal');
    //     setShowDepositModal(false);
    // }

    // const openDepositModal = () => {
    //     setShowDepositModal(!showDepositModal);
    // }
    // const depositSpend = () => {
    //     console.log('depositSpend!');
    //     setDepositDetails({...depositDetails,
    //         amount : spend,
    //         toAccount: 'spend',
    //         dbAccountName: 'spend_weekly_deposited',
    //     });
    //     //openDepositModal();
    //     openSWALModal();
    // }
    // const depositSave = () => {
    //     console.log('depositSave!');
    //     setDepositDetails({...depositDetails,
    //         amount : save,
    //         toAccount: 'save',
    //         dbAccountName: 'save',
    //     });
    //     openDepositModal();
    // }
    // const depositShare = () => {
    //     console.log('depositShare!');
    //     setDepositDetails({...depositDetails,
    //         amount : share,
    //         toAccount: 'share',
    //         dbAccountName: 'share_weekly_deposited',
    //     });
    //     openDepositModal();
    // }
    const openSWALModal = (amount, toAccount, accountName, dbAccountName) => {
        console.log('in openSWAL and props are:', amount, toAccount, accountName, dbAccountName);
        setDepositDetails({...depositDetails,
            amount : amount,
            toAccount: toAccount,
            dbAccountName: dbAccountName,
        });
        Swal.fire({
            title: `Deposit ${accountName} Allowance`,
            text: 'Do you want to deposit your allowance?',
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#007E58',
            //allowOutsideClick:false,
        }).then((result) => {
            if (result.isConfirmed) {
            //   Swal.fire('Saved!', '', 'success')
            console.log('user is confirming deposit');
            deposit();
            } else if (result.isDenied) {
              Swal.fire('Allowance not deposited.', '', 'info')
            }
          })              
    }
    return (
        <div className="allowance">
            {/* <button onClick={showErrorModal}>Toggle SWAL modal</button> */}
            {/*  My custom modal & it works*/}
            {/* <Modal title='Deposit Allowance'
                   show={showDepositModal}
                   close={() => {closeDepositModal()}}
                   actions = {[ { name:'Confirm', method: () => deposit() }]}
            />      */}

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
                            <td>{ props.allowance ? Constants.dollarUS.format(props.allowance?.latestAllowance.spend) : ''}</td>
                            <td>
                            {     
                               props.allowance && props.allowance?.spend_deposited ? <p>Deposited</p> :                               
                                    <button className="allowance-button" 
                                            // onClick={() => deposit(props.allowance.latestAllowance.spend,'spend', 'spend_weekly_deposited')}
                                            // onClick={(openDepositModal)}
                                            onClick={ () => openSWALModal(props.allowance.latestAllowance.spend,'spend', 'Spend','spend_weekly_deposited')}
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
                                            //onClick={() => deposit(props.allowance.latestAllowance.save,'save', 'save_weekly_deposited')}
                                            // onClick={depositSave}
                                            onClick={ () => openSWALModal(props.allowance.latestAllowance.save,'save','Save','save_weekly_deposited')}
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
                                            //onClick={() => deposit(props.allowance.latestAllowance.share,'share', 'share_weekly_deposited')}
                                            // onClick={depositShare}
                                            onClick={ () => openSWALModal(props.allowance.latestAllowance.share,'share','Share','share_weekly_deposited')}
                                    > Deposit</button>
                                } 
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <button className='deposit-whole-allowance'>Deposit ALL</button> */}
         </div>
    )
}

export default Allowance;