import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopper } from 'react-popper';
import './DashboardMoney.scss';

function DashboardMoney(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);
    const [showPopper, setShowPopper] = useState(false); 
    const[nextAllowance, setNextAllowance] = useState('');
 

    useEffect(() => {
        dispatch({ type: 'GET_NEXT_ALLOWANCE_INFO',
                   payload: props.user.id,});
    },[])

    useEffect(() => {
        setNextAllowance(allowance.nextAllowance.allowance_date);
    },[allowance.nextAllowance]);

    return (
        <div className="dashboard-money">            
            <h3>Next allowance is:</h3>            
            <div className="next-allowance-date">
                 {nextAllowance ? nextAllowance.slice(0,10) : null}
            </div>
            <div className="allowance-circles">
                <div className="res-circle">
                    <div className="circle-text">Spend: ${allowance.nextAllowance ? allowance.nextAllowance.spend : null}</div>
                </div>
                <div className="res-circle">
                    <div className="circle-text">Save: ${allowance.nextAllowance ? allowance.nextAllowance.save : null}</div>
                </div>
                <div className="res-circle">
                    <div className="circle-text">Share: ${allowance.nextAllowance ? allowance.nextAllowance.share : null}</div>
                </div>
            </div>

        </div>
    )
}
export default DashboardMoney;