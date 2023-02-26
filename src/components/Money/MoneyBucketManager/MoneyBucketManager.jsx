import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MoneyBucketManager.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../../../constants/index';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function MoneyBucketManager(props) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const [changeType, setChangeType] = useState('');

    useEffect(() => {         
        if (props.bank.changeSuccess === true) {
            launchSuccessToast();
        }
    }, [props.bank.bank, props.bank.changeSuccess])

    const launchSuccessToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            animation: false,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000,            
          })
          
          Toast.fire({
            icon: 'success',            
            title: `${changeType.charAt(0).toUpperCase() + changeType.slice(1)} was successful!`,
            showClass: {
                backdrop: 'swal2-noanimation',
                popup: 'swal2-noanimation',
                icon: 'swal2-noanimation'
              },
          })
    }

    const changeAmount = (changeType, bucketType) => {
        setChangeType(changeType)
        const changeAmountSWAL =  {            
            title: `Enter amount to ${changeType} into ${bucketType} account`,
            focusConfirm: false,
            html: `<label for="amount">Amount:</label>
                <input class="swal2-input" id="amount" type="number" placeholder="0.00" />
                   <br />
                   <label for"bucket-comments">Reason:</label>
                   <input class="swal2-input" id="bucket-comments"></input>`,            
            showClass: {                
                popup: 'swal2-noanimation',
                title: 'swal2-title bucket',
              },
            showCancelButton: true,
            cancelButtonColor: 'grey',
            confirmButtonColor: '#007E58',
            confirmButtonText: 'Confirm',
            allowOutsideClick: false,            
            customClass: {
                title: 'money-bucket swal2-title',
            },
            preConfirm: () => ({
                amountValue: document.getElementById('amount').value,
                comments: document.getElementById('bucket-comments').value,
            })          
        }

        return changeAmountSWAL;
    }
    
    const handleChangeBankAmount = async (bucketType, changeType) => {
        const changeBankAmount = async () => {
            const swalval = await MySwal.fire(changeAmount(changeType, bucketType));
            let v = swalval && swalval.value || swalval.dismiss;            
            if (v && v.amountValue  || v === 'cancel') {
                if (v !== 'cancel') {
                    dispatch({
                        type: 'CHANGE_BANK',
                        payload: {
                            userID: user.id,
                            allowanceDeposit: false,
                            depositDetails: {
                                bankChangeType: changeType,
                                amount : v.amountValue,
                                toAccount: bucketType,
                            }
                        },
                    });
                    dispatch({
                        type: 'ADD_BANK_TRANSACTION',
                        payload: {
                            userId: user.id,
                            type: changeType,
                            timestamp: new Date().toISOString(),
                            amount: v.amountValue,
                            notes: v.comments,
                        }
                    })
                }
            } else {
              await MySwal.fire({ 
                type: 'error', 
                icon: 'warning',
                title: 'An amount is required!',
                confirmButtonColor: '#007E58',                
             });
              changeBankAmount();
            }
          }
          changeBankAmount();
        }

    const Bucket = (props) => {
        return (
            <div className="bucket spend">
                <div className="spend-title">
                    {props.bucket.charAt(0).toUpperCase() + props.bucket.slice(1)}
                </div>
                <div className="spend-total">{props.amount}</div>
                <div className="buttons">
                    <button className="deposit-button" onClick={() => {handleChangeBankAmount(props.bucket, 'deposit')}}>
                        <FontAwesomeIcon className="icon-center" icon={faPlus} />
                    </button>
                    <button className="deposit-button" onClick={() => {handleChangeBankAmount(props.bucket, 'withdraw')}}>
                        <FontAwesomeIcon className="icon-center" icon={faMinus} />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bucket-container">
            <div className="bucket-title">
                Transfer Money
            </div>
            <div className="small-bucket">
                <Bucket className = "bucket spend" 
                        amount={props.bank && props.bank.bank ? Constants.dollarUS.format(props.bank.bank.spend) : ''}
                        bucket={'spend'}
                />
                <Bucket className = "bucket save" 
                        amount={props.bank && props.bank.bank ? Constants.dollarUS.format(props.bank.bank.save) : ''}
                        bucket="save"
                />
                <Bucket className = "bucket share" 
                        amount={props.bank && props.bank.bank ? Constants.dollarUS.format(props.bank.bank.share) : ''}
                        bucket="share"
                />                
            </div>
        </div >
    )
}

export default MoneyBucketManager;