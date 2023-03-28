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
              //timer: 11100,
              customClass: {
                title: 'money-bucket-toast swal2-title',
            },
          })
    }

    const changeAmount = (changeType, bucketType) => {
        setChangeType(changeType);
        const getTitle = () => {
            if(changeType === 'withdraw') {
                return 'from';
            }else {
                return 'into';
            }
        }
        const changeAmountSWAL =  {            
            title: `Enter amount to ${changeType} ${getTitle()} ${bucketType} account`,
            focusConfirm: false,
            html: `<input class="swal2-input" id="amount" type="number" placeholder="0.00" />`,         
            showClass: {                
                popup: 'swal2-noanimation money-bucket',
                title: 'swal2-title money-bucket',
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
            })          
        }

        return changeAmountSWAL;
    }
    
    const handleChangeBankAmount = async (bucketType, changeType, bucketAmount) => {
        const changeBankAmount = async () => {
            const swalval = await MySwal.fire(changeAmount(changeType, bucketType, bucketAmount));
            let v = swalval && swalval.value || swalval.dismiss;
            if (v && v.amountValue  || v === 'cancel') {                
                if ( changeType === 'withdraw' && Number(v.amountValue) > Number(bucketAmount)) {                    
                    await MySwal.fire({ 
                        type: 'error', 
                        icon: 'warning',
                        title: 'Withdrawal amount too much!',
                        confirmButtonColor: '#007E58',    
                        showClass: {
                            icon: 'swal2-noanimation'
                          },            
                     });
                       changeBankAmount();
                } else if (changeType === 'deposit' && Number(v.amountValue > 10000)) {
                    await MySwal.fire({ 
                        type: 'error', 
                        icon: 'warning',
                        title: `Amount can't be over $10,000`,
                        confirmButtonColor: '#007E58',    
                        showClass: {
                            icon: 'swal2-noanimation'
                          },            
                     });
                       changeBankAmount();
                }
                 else {
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
                    }
                }
                
            } else {
              await MySwal.fire({ 
                type: 'error', 
                icon: 'warning',
                title: 'An amount is required!',
                confirmButtonColor: '#007E58',    
                showClass: {
                    icon: 'swal2-noanimation'
                  },            
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
                <div className="spend-total">{Constants.dollarUS.format(props.amount)}</div>
                <div className="buttons">
                    <button className="deposit-button" onClick={() => {handleChangeBankAmount(props.bucket, 'deposit', props.amount)}}>
                        <FontAwesomeIcon className="icon-center" icon={faPlus} />
                    </button>
                    <button className="deposit-button" onClick={() => {handleChangeBankAmount(props.bucket, 'withdraw', props.amount)}}>
                        <FontAwesomeIcon className="icon-center" icon={faMinus} />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bucket-container">
            <div className="bucket-title">
                Bank Accounts
            </div>
            <div className="small-bucket">
                <Bucket className = "bucket spend" 
                        amount={props.bank && props.bank.bank ? props.bank.bank.spend : ''}
                        bucket={'spend'}
                />
                <Bucket className = "bucket save" 
                        amount={props.bank && props.bank.bank ? props.bank.bank.save : ''}
                        bucket="save"
                />
                <Bucket className = "bucket share" 
                        amount={props.bank && props.bank.bank ? props.bank.bank.share : ''}
                        bucket="share"
                />                
            </div>
        </div >
    )
}

export default MoneyBucketManager;