import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardMoney.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';

function DashboardMoney(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);    
    const[nextAllowance, setNextAllowance] = useState('');
    const[allowanceGoal, setAllowanceGoal] = useState({});

    useEffect(() => {
        dispatch({ type: 'GET_NEXT_ALLOWANCE_INFO', payload: props.user.id,});
        dispatch( {type: "GET_BANK_REQUESTED", payload: user.id})
    },[])

    useEffect(() => {
        setNextAllowance(allowance.nextAllowance.allowance_date);
    },[allowance.nextAllowance]);

    useEffect(() => {        
        setAllowanceGoal({...allowanceGoal, 
                          goalAmount: bank.bank.goal_amount,
                          goalDescription: bank.bank.goal_desc,                         
                        })
    },[bank.bank])

    return (
        <div className="dashboard-money">            
            <div className="next-allowance-date">Next allowance is:          
                <div>{nextAllowance ? nextAllowance.slice(0,10) : null}</div>
            </div>
            <div className="allowance-circles">
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Spend:</div>
                        <div className="amount">${allowance.nextAllowance ? allowance.nextAllowance.spend : null}</div>
                    </div>                                        
                </div>
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Save:</div>
                        <div className="amount">${allowance.nextAllowance ? allowance.nextAllowance.save : null}</div>
                    </div>
                </div>
                <div className="res-circle">
                    <div className="circle-text">
                        <div className="title">Share:</div>
                        <div className="amount">${allowance.nextAllowance ? allowance.nextAllowance.share : null}</div>
                    </div>
                </div>
                
            </div>
            <div className="saving-for">
                <FontAwesomeIcon className="saving-for-icon" icon={faCircleRight} />                
                <div className="saving-for-text">
                    {allowanceGoal ? (<div>You're saving ${allowanceGoal.goalAmount} for {allowanceGoal.goalDescription}</div>)
                    :
                    <div>Hi</div>
    }
                </div>
            </div>
        </div>
    )
}
export default DashboardMoney;