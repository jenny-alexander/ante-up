import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import './Money.scss';

function Money(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);
    // const bank = useSelector((store) => store.bank.bank );
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);
    const[editSaveFor, setEditSaveFor] = useState(false);
    const[savingFor, setSavingFor] = useState('');

    useEffect(()=> {
        //console.log('in Money useEffect');
        dispatch( { type: 'FETCH_ALLOWANCE', payload: user.id} );
        dispatch( { type: 'FETCH_LATEST_ALLOWANCE', payload: user.id });
        //dispatch( { type: 'FETCH_BANK', payload: user.id })
         dispatch( {type: "GET_BANK_REQUESTED", payload: user.id})
    },[])

    // useEffect(() => {
    //     console.log('allowance changed! it is now:', allowance)
    // },[allowance])

    const updateSavingFor = (e) => {
        setSavingFor(e.target.value);
    }

    useEffect(() => {
        console.log('latest allowance changed! it is now:', allowance.latestAllowance)
    },[allowance.latestAllowance])

    return (
        <div className="money">
            <h1 className="money-title">Money</h1>
            {/* <div className="money-saving"> 
                <input className="saving-for" type="text" placeholder="What are you saving for?"/> 
                <div>
                    <button className="btn-saving-for">
                        <FontAwesomeIcon className="fa-edit" icon={faEdit} />
                    </button>
                </div>
            </div> */}
            <div className="money-saving"> 
                <div className="saving-title">Saving Goal:</div>
                <div className="money-input-group">
                    <div className="saving-goal-desc">
                        <label for="saving-goal">Description:</label>
                        <input type="text"/>
                    </div>
                    <div className="saving-goal-amount">
                        <label for="saving-goal">Amount:</label>
                        <input type="text"/>
                    </div>
                </div>
            </div>


            <div className="money-allowance">
                <Card component={<Allowance allowance={allowance} bank={bank} />}
                />
            </div>

            <div className="money-bank-chart">
                <Card component={<MoneyPie bank={bank.bank}/>} />
            </div>

            <div className="money-bank">
                <Card component={<MoneyBucketManager bank={bank} />} />
            </div> 
        </div >
    )
}

export default Money;