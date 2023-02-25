import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyPie from '../Money/MoneyPie/MoneyPie';
import MoneyBucketManager from '../Money/MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Money/Allowance/Allowance';
import MoneySaving from './MoneySaving/MoneySaving';
import Card from '../Common/Card/Card';
import 'react-tooltip/dist/react-tooltip.css';

import './Money.scss';

function Money(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);
    const[moneyInPie, setMoneyInPie] = useState(false);
    const [allowanceInfo, setAllowanceInfo] = useState ({});

    useEffect(()=> {
        dispatch( { type: 'GET_BANK_REQUESTED', payload: user.id})
    },[])

    useEffect(() => {
        setAllowanceInfo({...allowanceInfo, allowance})
    },[allowance])

    useEffect(() => {        
        if (bank.bank?.spend > 0 || bank.bank?.save > 0 || bank.bank?.share > 0 ) {            
            setMoneyInPie(true);
        } else {
            setMoneyInPie(false);
        } 
    },[bank.bank])

    return (                             
        <div className="money">
            <h1 className="money-title">Money</h1>  
                {Object.entries(allowanceInfo).length > 0 ? 
                <>
                    <div className="money-saving-for">
                        <Card component={<MoneySaving/>} />
                    </div>
                    <div className="money-allowance">
                        <Card component={<Allowance allowance={allowance} bank={bank} />} />
                    </div>
                    { moneyInPie ?
                    <div className="money-bank-chart">
                        <Card component={<MoneyPie bank={bank.bank} />} />
                    </div> : '' 
                    }
                    <div className="money-bank">
                        <Card component={<MoneyBucketManager bank={bank} />} />
                    </div>
                </> : '' }
        </div>
    )
}

export default Money;