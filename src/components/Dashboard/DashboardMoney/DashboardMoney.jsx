import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardMoney.scss';

function DashboardMoney(props) {
    const dispatch = useDispatch();
    //const bankTransaction = useSelector((store) => store.bankTransaction);

    useEffect(() => {
        console.log('in useEffect of DashboardMoney');
        // dispatch({ type: 'GET_LAST_BANK_TRANSACTION', 
        //             payload: props.user.id,
        //             })
        dispatch({ type: 'GET_NEXT_ALLOWANCE_INFO',
                   payload: props.user.id,});
    },[dispatch])

    return (
        <div className="dashboard-money">
            <h3>Next allowance is:</h3>
        </div>
    )
}
export default DashboardMoney;