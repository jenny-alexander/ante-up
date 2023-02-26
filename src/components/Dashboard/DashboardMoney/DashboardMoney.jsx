import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import './DashboardMoney.scss';

function DashboardMoney(props) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const bank = useSelector((store) => store.bank );   
    const week = useSelector((store) => store.week);
    const allowance = useSelector((store) => store.allowance); //TODO: rename as store (i.e. allowanceStore)
    const dailyTotalChorePayment = useSelector((store) => store.dashboard.dailyTotalChorePayment); 
    const weeklyTotalChorePayment = useSelector((store) => store.dashboard.weeklyTotalChorePayment);
    const adhocTotalChorePayment = useSelector((store) => store.dashboard.adhocTotalChorePayment);
    const[nextAllowance, setNextAllowance] = useState('');
    const[allowanceAmounts, setAllowanceAmounts] = useState({});
    const[allowanceGoal, setAllowanceGoal] = useState({});
    const[totalDailyChorePayment, setTotalDailyChorePayment] = useState(0);
    const[totalWeeklyChorePayment, setTotalWeeklyChorePayment] = useState(0);
    const[totalAdhocChorePayment, setTotalAdhocChorePayment] = useState(0);  

    useEffect(()=>{
        if (Object.entries(week).length > 0 && Object.entries(user).length > 0 ) {
            setNextAllowance(week.allowance_date.substring(0,10));
            dispatch( {type: 'GET_BANK_REQUESTED', payload: user.id}); // TODO: STICK WITH SAME NAMING CONVENTION (FETCH vs GET)      
            dispatch( { type: 'GET_TOTAL_DAILY_CHORE_PAYMENT', payload: {userID: user.id, weekID: week.id}});
            dispatch( { type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT', payload: {userID: user.id, weekID: week.id}});
            dispatch( { type: 'GET_TOTAL_ADHOC_CHORE_PAYMENT', payload: {userID: user.id, weekID: week.id}});            
        }        
    },[week, user])

    useEffect(() => {        
        setAllowanceGoal({...allowanceGoal, 
                          goalAmount: bank.bank.goal_amount,
                          goalDescription: bank.bank.goal_desc,                         
                        })
    },[bank.bank.goal_amount]);

    useEffect(() => {
        if (allowance && allowance.latest ) {            
            setAllowanceAmounts({...allowanceAmounts,
                spend: allowance.latestAllowance.spend,
                save: allowance.latestAllowance.save,
                share: allowance.latestAllowance.share,                
            })
        }

    },[allowance]);

    useEffect(() => {          
        if (weeklyTotalChorePayment != '' ) {
            setTotalWeeklyChorePayment(weeklyTotalChorePayment);
        } else {
            setTotalWeeklyChorePayment(0);
        }
    }, [weeklyTotalChorePayment]);

    useEffect(() => {     
        if (dailyTotalChorePayment != '') {
            setTotalDailyChorePayment(dailyTotalChorePayment);
        } else {
            setTotalDailyChorePayment(0);
        }     
    }, [dailyTotalChorePayment]);

    useEffect(() => {
        if (adhocTotalChorePayment != '') {
            setTotalAdhocChorePayment(adhocTotalChorePayment);
        }else {
            setTotalAdhocChorePayment(0);
        }        
    }, [adhocTotalChorePayment]);

    const CircleText = (props) => {
        return (
            <div className="res-circle"> 
                <div className="circle-text">
                    <div className="title">{props.title}:</div>
                    <div className="amount">${props.amount}</div>
                </div>                                        
            </div>            
        )
    }

    return (
        <div className="dashboard-money">            
            <div className="next-allowance-date">Next allowance is:          
                <div>{nextAllowance ? nextAllowance : null}</div>
            </div>
            <div className="allowance-circles"> 
                { allowance.latestAllowance ? 
                    <>
                        <CircleText title="Spend" amount={allowance.latestAllowance.spend} />
                        <CircleText title="Save" amount={allowance.latestAllowance.save} />
                        <CircleText title="Share" amount={allowance.latestAllowance.share} />
                        <CircleText title="Chores" amount={totalDailyChorePayment + totalAdhocChorePayment + totalWeeklyChorePayment} />
                    </>
                    : null    
                }
            </div>
            <div className="saving-for">
                <FontAwesomeIcon className="saving-for-icon" icon={faCircleRight} />                
                <div className="saving-for-text">
                    {allowanceGoal.goalAmount > 0 ? 
                        (<div>
                            You're saving ${allowanceGoal.goalAmount} for: {allowanceGoal.goalDescription.charAt(0).toLowerCase() + allowanceGoal.goalDescription.slice(1)}
                        </div>)
                    :
                    <div>Enter a Save Goal in the Money Section!</div>
    }
                </div>
            </div>
        </div>
    )
}
export default DashboardMoney;