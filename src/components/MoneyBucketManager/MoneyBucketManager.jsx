import { React, useState, useEffect } from 'react';
import './MoneyBucketManager.scss';
import * as Constants from '../../constants/index';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function MoneyBucketManager(props) {
    // const[showModal, setShowModal] = useState(false);

    // const closeModal = () => {
    //     console.log('in closeModal')
    //     setShowModal(false);
    // }
    const MySwal = withReactContent(Swal);
    const[amountValue, setAmountValue] = useState();

    useEffect(() => {
        console.log('bank props are:', props.bank)
    },[props.bank]);

    const changeAmountSWAL = {
        //console.log('in changeBucketAmount and params are:', bucketType, changeType);
        title: 'Enter amount to withdraw',
        focusConfirm: false,
        html: '<duet-number-input id="amount" value="0" min="-999999" step="1" unit="€" />',
        html: `
          <input class="swal2-input" id="amount" type="number" 
          
          placeholder="Enter Amount" /><br />
        `,
        // iconHTML: '<img className="logo" src="images/ante_up.png" alt="ante up logo"></img>',
         type: 'warning',
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
        })          
    }
    
    const handleChangeBankAmount = async (bucketType, changeType) => {
        console.log('in handleChangeBankAmount with bucketType:', bucketType, 'and changeType', changeType);
        const changeBankAmount = async () => {
            const swalval = await MySwal.fire(changeAmountSWAL);
            let v = swalval && swalval.value || swalval.dismiss;
            if (v && v.amountValue  || v === 'cancel') {
                if (v !== 'cancel') {
                    setformdata(swalval);
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
                            props.bank && props.bank ? Constants.dollarUS.format(props.bank.spend) : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button" onClick={() => {handleChangeBankAmount('spend', 'deposit')}}>+</button>
                        <button className="deposit-button">-</button>
                    </div>
                </div>
                <div className="bucket share">
                    <div className="spend-title">
                        Share
                    </div>
                    <div className="spend-total">
                    {
                            props.bank && props.bank ? Constants.dollarUS.format(props.bank.share) : ''
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
                            props.bank && props.bank ? Constants.dollarUS.format(props.bank.save) : ''
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