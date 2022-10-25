import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';
import './Money.scss';

function Money(props) {

    const dispatch = useDispatch();
    //const money = useSelector((store) => store.money);
    const user = useSelector((store) => store.user);

    useEffect(()=> {
        console.log('BOOOO in useEffect of Money!');
        dispatch( { type: 'FETCH_MONEY', payload: user.id} );
    },[])

    return (
        <div className="money">            
            <div className="money-allowance">
                {/* <Allowance /> */}
                <Card component={<Allowance />} />
            </div>

            {/* <div className="money-chart">
                money && <Card component={<MoneyPie money={money[0]} />} />
            </div> */}

            {/* <div className="money-bank">
                <Card component={<MoneyBucketManager />} />
            </div>  */}
        </div >
    )
}

export default Money;