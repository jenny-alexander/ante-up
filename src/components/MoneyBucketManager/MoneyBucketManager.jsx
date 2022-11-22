import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MoneyBucketManager.scss';
import * as Constants from '../../constants/index';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function MoneyBucketManager(props) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    useEffect(() => { 
        console.log('in useEffect for bank changes and props.bank are:', props.bank)
        if (props.bank.depositSuccess === true) {
            launchSuccessToast();
        }
    }, [props.bank.bank, props.bank.depositSuccess])

    const launchSuccessToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            //animation: false,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Deposited Successfully!'
          })
    }

    const changeAmount = (changeType) => {

        const changeAmountSWAL =  {
            //console.log('in changeBucketAmount and params are:', bucketType, changeType);
            title: `Enter amount to ${changeType}`,
            focusConfirm: false,
            html: `<input class="swal2-input" id="amount" type="number" placeholder="$0.00" />
                   <br />
                   <textarea class="swal2-textarea" id="bucket-comments" placeholder="Enter comments here..."></textarea>
                   `
                   ,
            // type: 'warning',
            iconHtml: '<img src="images/ante_up.png" alt="ante up logo">',
            customClass: {
              icon: 'no-border'
            },
            showCancelButton: true,
            cancelButtonColor: 'grey',
            confirmButtonColor: '#007E58',
            confirmButtonText: 'Confirm',
            allowOutsideClick: false,
            customClass: {
                title: 'allowance swal2-title',
            },
            preConfirm: () => ({
                amountValue: document.getElementById('amount').value,
                comments: document.getElementById('bucket-comments').value,
            })          
        }

        return changeAmountSWAL;
    }
    
    const handleChangeBankAmount = async (bucketType, changeType) => {
        console.log('in handleChangeBankAmount with bucketType:', bucketType, 'and changeType', changeType);
        const changeBankAmount = async () => {
            const swalval = await MySwal.fire(changeAmount(changeType));
            let v = swalval && swalval.value || swalval.dismiss;
            console.log('v is:', v);
            if (v && v.amountValue  || v === 'cancel') {
                if (v !== 'cancel') {
                    //setformdata(swalval);
                    dispatch({
                        type: 'DEPOSIT_BANK',
                        payload: {
                            userID: user.id,
                            allowanceDeposit: false,
                            depositDetails: { 
                                amount : v.amountValue,
                                toAccount: bucketType,
    
                            }
                        },
                    });
                }
            } else {
              await MySwal.fire({ 
                type: 'error', 
                icon: 'warning',
                title: 'An amount is required!',
                confirmButtonColor: '#007E58',
                // confirmButtonColor: 'red',
             });
              changeBankAmount();
            }
          }
          changeBankAmount();
        }

    return (
        <div className="bucket-container">
            <div className="bucket-title">
                Money Bucket Manager
            </div>
            <div className="small-bucket">
                <div className="bucket spend">
                    <div className="spend-title">
                        Spend
                    </div>
                    <div className="spend-total">
                        {
                            props.bank && props.bank.bank ? Constants.dollarUS.format(props.bank.bank.spend) : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button" onClick={() => {handleChangeBankAmount('spend', 'deposit')}}>+</button>
                        <button className="deposit-button" onClick={() => {handleChangeBankAmount('spend', 'withdraw')}}>-</button>
                    </div>
                </div>
                <div className="bucket share">
                    <div className="spend-title">
                        Share
                    </div>
                    <div className="spend-total">
                    {
                            props.bank && props.bank.bank ? Constants.dollarUS.format(props.bank.bank.share) : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button">+</button>
                        <button className="deposit-button">-</button>
                    </div>
                </div>
                <div className="bucket save">
                    <div className="spend-title">
                        Save
                    </div>
                    <div className="spend-total">
                    {
                            props.bank && props.bank.bank ? Constants.dollarUS.format(props.bank.bank.save) : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button">+</button>
                        <button className="deposit-button">-</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MoneyBucketManager;