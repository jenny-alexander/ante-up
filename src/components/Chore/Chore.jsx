import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ChoreModal from './ChoreModal/ChoreModal';
import './Chore.scss';

function Chore(props) {
    const dispatch = useDispatch();    
    const chores = useSelector((store) => store.chore);
    const chorePayment = useSelector((store) => store.chorePayment);
    const week = useSelector((store) => store.week);
    const user = useSelector((store) => store.user);
    const [userChores, setUserChores] = useState([]);
    const [allChores, setAllChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);
    const [frequencySelected, setFrequencySelected] = useState('All');      
    const [selectedRow, setSelectedRow] = useState(-1);    
    const [checkedDailyState, setCheckedDailyState] = useState([]);
    const [checkedWeeklyState, setCheckedWeeklyState] = useState([]);
    const [checkedAdHocState, setCheckedAdHocState] = useState([]);
    const [choreTotalPayment, setChoreTotalPayment] = useState(0);
    const [scheduleIsDisabled, setScheduleIsDisabled] = useState(true);
    const [allChoresPayment, setAllChoresPayment] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [totalDailyChorePayment, setTotalDailyChorePayment] = useState(0);
    const [totalWeeklyChorePayment, setTotalWeeklyChorePayment] = useState(0);
    const [totalAdhocChorePayment, setTotalAdhocChorePayment] = useState(0);  

    const options = [
        { value: 'All', label: 'All'},
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Ad hoc', label: 'Ad hoc'}
      ]

    useEffect(() => {
        getTotal();
    },[totalDailyChorePayment, totalWeeklyChorePayment, totalAdhocChorePayment])

    useEffect(()=>{             
        if (Object.entries(week).length !==0 && (Object.entries(user).length !==0 ) ) {       
            dispatch( {type: "GET_USER_CHORE_REQUESTED", payload: {userID: user.id, weekID: week.id}});     
            dispatch( {type: 'GET_DAILY_PAYMENT_REQUESTED', payload: {userID: user.id,weekID: week.id}});
            dispatch( {type: 'GET_WEEKLY_PAYMENT_REQUESTED', payload: {userID: user.id,weekID: week.id}});
            dispatch( {type: 'GET_ADHOC_PAYMENT_REQUESTED', payload: {userID: user.id,weekID: week.id}});
        }        
    },[week, user]);

    //Use these to build up the payment states
    useEffect(()=> {
        if (chorePayment.dailyPayment.payment.length > 0) {   
            buildPaymentState(chorePayment.dailyPayment.payment, 'daily'); 
        }                        
    },[chorePayment.dailyPayment.payment]);

    useEffect(()=> {        
        if (chorePayment.weeklyPayment.payment.length > 0) {                           
            buildPaymentState(chorePayment.weeklyPayment.payment, 'weekly');   
        }
    },[chorePayment.weeklyPayment.payment]);

    useEffect(()=> {        
        if (chorePayment.adhocPayment.payment.length > 0) {      
            buildPaymentState(chorePayment.adhocPayment.payment, 'adhoc');   
        }
    },[chorePayment.adhocPayment.payment]);
    //<--- END BUILD UP PAYMENT STATES

    useEffect(() => {
        setChoresExist(chores.userChore.chore.length > 0);
        setUserChores(chores.userChore.chore);
    },[chores.userChore.chore]);

    useEffect(() => {
        if (chores.allChore.chore.length > 0) {
            setAllChores(chores.allChore.chore)
        }
    },[chores.allChore.chore]);

    const getTotal = () => {
        const mergeChores = [...checkedWeeklyState, ...checkedDailyState, ...checkedAdHocState];
        let total = 0;        
        for(let i = 0; i< mergeChores.length; i++) {            
            total = total + mergeChores[i].totalPayment;
        }
        setAllChoresPayment(total);  
    }

    const buildPaymentState = ( payment, paymentType ) => {      
        const newStateArray = [];   
        let choreTotal = 0;     
        payment.map((item) => {                  
            const newObject = { id: item.id,
                                choreID: item.chore_id,
                                totalPayment: item.total_payment,
                                schedule: {} };            
            if ( paymentType === 'daily') {
                Object.keys(item).map((key) => {
                    if ( key.substring(key.length - 3) === 'day' ) {   
                        newObject.schedule[key] = item[key];
                    }
                })  
            } else if (paymentType === 'weekly') {
                newObject.schedule.weekly = item.weekly;
            } else if (paymentType === 'adhoc') {
                newObject.schedule.adhoc = item.adhoc;
            }
            choreTotal = newObject.totalPayment + choreTotal;
            newStateArray.push(newObject);
        })   
        if (paymentType === 'daily') {                        
            setTotalDailyChorePayment(choreTotal);
            setCheckedDailyState(newStateArray);                        
        }else if (paymentType === 'weekly'){
            setTotalWeeklyChorePayment(choreTotal)
            setCheckedWeeklyState(newStateArray);
        } else if (paymentType === 'adhoc'){
            setCheckedAdHocState(newStateArray);
            setTotalAdhocChorePayment(choreTotal);
        }; 
    }

    const handleFrequencyChange = (selected) => {        
        if (selected.value==='All') {
            setUserChores(chores.userChore.chore);
        } else {
            const filteredChores = chores.userChore.chore.filter(a =>
                a.frequency === selected.value);
            setUserChores(filteredChores);
        }        
        setFrequencySelected(selected);
        setSelectedRow(-1);
    }

    const handleDailyScheduleChange = (choreID, key, chorePayment) => {        
        const updatedState = checkedDailyState.map(obj => {            
            if (obj.choreID === choreID) {
                let checkValue = obj.schedule[key];
                let payment;
                if (checkValue) {
                    payment = obj.totalPayment - chorePayment;
                }
                else {
                    payment = obj.totalPayment + chorePayment;
                }
                return {...obj, 
                        schedule: { ...obj.schedule, [key]: !checkValue},
                        totalPayment: payment,
                };
              } 
              return obj;
        })
        setCheckedDailyState(updatedState);
    }

    const handleWeeklyScheduleChange = (choreID, key, chorePayment) => {
        const updatedState = checkedWeeklyState.map(obj => {
            if (obj.choreID === choreID) {                
                let checkValue = obj.schedule[key];
                let payment;                
                if (checkValue) {
                    payment = obj.totalPayment - chorePayment;
                }else {
                    payment = obj.totalPayment + chorePayment;
                }
                return {...obj, 
                    schedule: { ...obj.schedule, [key]: !checkValue},
                    totalPayment: payment,
                };
            }
            return obj;
        })
        setCheckedWeeklyState(updatedState);
    };

    const handleAdHocScheduleChange = (choreID, key, chorePayment) => {
        const updatedState = checkedAdHocState.map(obj => {
            if (obj.choreID === choreID) {                
                let checkValue = obj.schedule[key];
                let payment;                
                if (checkValue) {
                    payment = obj.totalPayment - chorePayment;
                }else {
                    payment = obj.totalPayment + chorePayment;
                }
                return {...obj, 
                    schedule: { ...obj.schedule, [key]: !checkValue},
                    totalPayment: payment,
                };
            }
            return obj;
        })
        setCheckedAdHocState(updatedState);
    };

    const showDetails = (i) => {   
        setScheduleIsDisabled(true);
        if (selectedRow === i) {
            setSelectedRow(-1);
        }else {
            setSelectedRow(i);            
        }        
    }
    
    const saveScheduleChange = (choreID, frequency) => {        
        let paymentForThisChore;
        if (frequency === 'Daily') {
            paymentForThisChore = checkedDailyState.filter(payment => payment.choreID == choreID);   
        } else if( frequency === 'Weekly') {
            paymentForThisChore = checkedWeeklyState.filter(payment => payment.choreID == choreID);
        } else if( frequency === 'Ad hoc') {
                paymentForThisChore = checkedAdHocState.filter(payment => payment.choreID == choreID);                
                frequency = 'adhoc';
        };        
        dispatch( { 
                    type: `UPDATE_${frequency.toUpperCase()}_PAYMENT`, 
                    payload: {
                        id: paymentForThisChore[0].id,
                        schedule: paymentForThisChore[0].schedule,
                        totalPayment: paymentForThisChore[0].totalPayment,
                }
        });
        getTotal();      
        setScheduleIsDisabled(!scheduleIsDisabled);
    }

    const showManageChoreModal = () => {        
        setShowModal(true);
    }
    const hideChoreModal = () => {
        setShowModal(false);
    }

    const ChoreListComponent = () => {
        return (
            
            <div className="chore-main">
                <ChoreModal user={props.user}
                            close={hideChoreModal}
                            show={showModal} 
                            title={'Manage My Chores'}
                            weekID={week.weekID}
                            content={
                                        {allChores: allChores, 
                                        userChores: userChores}
                                    } 
                            actions={[{name: 'Assign', action: 'addChore'},]}
                        />
                <div className="frequency-selector">                    
                    <div className="frequency-title">Frequency:</div>
                    <div className="frequency-dropdown">
                        <Select options={options}
                                onChange={handleFrequencyChange}                                
                                value={frequencySelected}
                        />
                    </div>
                    <div className="chore-actions">
                        <button onClick={() => {showManageChoreModal()}}>Manage My Chores</button>
                    </div>
                </div>
                <div className="chore-list">
                    {
                        choresExist ? 
                        (<div >
                            <table className='chore-table mobile-optimised'>
                                <thead className='chore-head'>
                                    <tr>
                                        <th>Chore</th>
                                        <th>Frequency</th>
                                        <th>Payment</th>
                                        <th></th>
                                    </tr>  
                                </thead>
                                <tbody>
                                {userChores.map((chore,i)=> 
                                    <tr >                                    
                                        <td data-th="Name:">{chore.name}</td>
                                        <td data-th="Frequency:">{chore.frequency}</td>
                                        <td data-th="Payment:" className='payment-offset'>${chore.payment}</td>
                                        <td data-th="Schedule:" className='td-center'>
                                            <button 
                                                className='chore-btn'
                                                onClick={()=>showDetails(i)}>
                                                    { selectedRow === i ? (
                                                        <FontAwesomeIcon icon={faChevronUp} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faChevronDown} />
                                                    )}
                                            </button>
                                        </td>
                                        <td className={`${selectedRow===i ? 'expanded-row-content show-row': 'expanded-row-content hide-row'}`}>
                                            { selectedRow === i ?                                                                      
                                                <div className='chore-details-schedule'>                                                    
                                                    { renderSchedule(chore.frequency, chore.id, chore.payment)}                                                                                                                
                                                </div> : null                                                                                                    
                                            }
                                            <div className="edit-schedule">                                            
                                                { scheduleIsDisabled ? 
                                                <button onClick={()=>setScheduleIsDisabled(!scheduleIsDisabled)}>Edit schedule</button>
                                                :
                                                    <>
                                                        <button onClick={()=>saveScheduleChange(chore.id, chore.frequency)}>Save</button>
                                                        <button onClick={()=>setScheduleIsDisabled(!scheduleIsDisabled)}>Cancel</button>
                                                    </>
                                            }
                                            </div>
                                            <div className='chore-details-payment'>Total payment for this week: ${choreTotalPayment}</div>                                            
                                        </td>
                                    </tr>
                                 )}
                                </tbody>
                            </table>
                        </div>)                                             
                        : `Use the 'Manage My Chores' button to add/assign chores.`
                    }
                </div>
                
                <div className="all-chores-payment">
                    <div className="all-chores-payment-title">Total chore payments this week:</div>
                    <div className="all-chores-payment-amount">${allChoresPayment}
                    </div>
                </div>
            </div>            
        )
    }

    const ScheduleInput = (props ) => {
        return (
            <>
                <div className={`${props.frequency.toLowerCase()}-chore`}>
                    <label htmlFor={`custom-checkbox-${props.index}`}>{props.mapKey.substring(0,1).toUpperCase()}                                    
                        <input className={`schedule-checkbox ${props.scheduleIsDisabled ? ' disabled' : ''}`} 
                            disabled={props.disabled}
                            type="checkbox"
                            id={`custom-checkbox-${props.index}`}
                            name={props.mapKey}
                            value={props.mapKey}
                            checked={props.paymentObject.schedule[props.mapKey]}
                            onChange={() => props.handleChange(props.choreID, props.mapKey, props.payment)}                                
                        />
                    </label>                                           
                </div>
            </>
        )
    }

    const renderSchedule = (frequency, choreID, chorePayment) => {        
        let paymentsForThisChore;
        if ( frequency === 'Daily') {
            paymentsForThisChore = checkedDailyState.filter(payment => payment.choreID == choreID);
        } else if ( frequency === 'Weekly' ) {
            paymentsForThisChore = checkedWeeklyState.filter(payment => payment.choreID === choreID);
        } else if ( frequency === 'Ad hoc' ) {            
            paymentsForThisChore = checkedAdHocState.filter(payment => payment.choreID === choreID);
        }        
        if ( paymentsForThisChore.length > 0 ) {
            const paymentObj = paymentsForThisChore[0];            
            setChoreTotalPayment(paymentObj.totalPayment);
            return (
                Object.keys(paymentObj.schedule).map((key, index) => {                                          
                    if ( key.substring(key.length - 3) === 'day' ) {                                             
                        return (
                            <ScheduleInput
                                disabled={scheduleIsDisabled}
                                mapKey={key}
                                index={index}
                                choreID={choreID}
                                frequency={frequency}
                                payment={chorePayment}
                                paymentObject={paymentObj}
                                handleChange={handleDailyScheduleChange}
                            />
                        );
                    } else if( key === 'weekly' ) {                                          
                        return(
                            <ScheduleInput
                                disabled={scheduleIsDisabled}
                                mapKey={key}
                                index={index}
                                choreID={choreID}
                                frequency={frequency}
                                payment={chorePayment}
                                paymentObject={paymentObj}
                                handleChange={handleWeeklyScheduleChange}
                            />
                        )
                    } else if( key === 'adhoc') {                            
                        return(
                            <ScheduleInput
                                disabled={scheduleIsDisabled}
                                mapKey={key}
                                index={index}
                                choreID={choreID}
                                frequency={frequency}
                                payment={chorePayment}
                                paymentObject={paymentObj}
                                handleChange={handleAdHocScheduleChange}
                            />
                        )
                    }
              })              
            )
        } else {
            setChoreTotalPayment(0);
            return null;
        }    
    }

    return (
        <div className='chore'>
            <div className='chore-container'>
                <h1 className="chore-title">My Chores</h1>
                <Card component={<ChoreListComponent />} />   
            </div>
        </div>
    )
}

export default Chore;