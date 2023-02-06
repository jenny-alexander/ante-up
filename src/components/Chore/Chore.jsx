import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ChoreModal from './ChoreModal/ChoreModal';
//import Modal from '../Common/Modal/Modal';
import './Chore.scss';

function Chore(props) {
    const dispatch = useDispatch();    
    const chores = useSelector((store) => store.chore);
    //const chores = useSelector((store) => store.chore.userChore);
    //const allChores = useSelector((store) => store.chore.allChore);
    const chorePayment = useSelector((store) => store.chorePayment);
    const [userChores, setUserChores] = useState([]);
    const [allChores, setAllChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);
    const [frequencySelected, setFrequencySelected] = useState('All');      
    const [selectedRow, setSelectedRow] = useState(-1);    
    const [checkedDailyState, setCheckedDailyState] = useState([]);
    const [checkedWeeklyState, setCheckedWeeklyState] = useState([]);
    const [choreTotalPayment, setChoreTotalPayment] = useState(0);
    const [scheduleIsDisabled, setScheduleIsDisabled] = useState(true);
    const [allChoresPayment, setAllChoresPayment] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const options = [
        { value: 'All', label: 'All'},
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Ad Hoc', label: 'Ad Hoc'}
      ]

    useEffect(() => {
            dispatch( {type: "GET_CHORE_REQUESTED", payload: props.user.id});
            dispatch( {type: "GET_ALL_CHORE_REQUESTED"});
            dispatch( {type: 'GET_DAILY_PAYMENT_REQUESTED', payload: {userID: props.user.id,weekID: 1}}); //<--TODO: set this dynamically
            dispatch( {type: 'GET_WEEKLY_PAYMENT_REQUESTED', payload: {userID: props.user.id,weekID: 1}}); //<--TODO: set this dynamically
    },[])

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

    useEffect(() => {
        if (chores.userChore.chore.length > 0) {
            console.log('chores.chore is:', chores.userChore.chore)
            setChoresExist(true);
            setUserChores(chores.userChore.chore)
        }
    },[chores.userChore.chore]);

    useEffect(() => {
        if (chores.allChore.chore.length > 0) {
            console.log('chores.allChore.chore is:', chores.allChore.chore)
            //setChoresExist(true);
            setAllChores(chores.allChore.chore)
        }
    },[chores.allChore.chore]);

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
            }
            choreTotal = newObject.totalPayment + choreTotal;
            newStateArray.push(newObject);
        })  
        if (paymentType === 'daily')
            setCheckedDailyState(newStateArray); 
        else if (paymentType === 'weekly'){
            setCheckedWeeklyState(newStateArray);
        }
        console.log(paymentType, 'BOO allChoresPayment is:', allChoresPayment);
        console.log(paymentType, 'BOO choreTotal is:', choreTotal);
        console.log('BOO total is:', allChoresPayment + choreTotal)
        setAllChoresPayment(allChoresPayment + choreTotal);
    }

    const handleFrequencyChange = (selected) => {
        if (selected.value==='All') {
            setUserChores(chores.chore);
        } else {
            const filteredChores = chores.chore.filter(a =>
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
        };
        dispatch( { 
                    type: `UPDATE_${frequency.toUpperCase()}_PAYMENT`, 
                    payload: {
                        id: paymentForThisChore[0].id,
                        schedule: paymentForThisChore[0].schedule,
                        totalPayment: paymentForThisChore[0].totalPayment,
                }
        });

        //loop through checked weekly state and 
        const mergeChores = [...checkedWeeklyState, ...checkedDailyState];
        let total = 0;
        for(let i = 0; i< mergeChores.length; i++) {
            console.log('mergeChores at i is:', mergeChores[i]);
            total = total + mergeChores[i].totalPayment;
        }        
        setAllChoresPayment(total);
        setScheduleIsDisabled(!scheduleIsDisabled);
    }

    const showAddChoreModal = () => {
        console.log('clicked on add chore modal');
        setShowModal(true);
    }
    const hideChoreModal = () => {
        setShowModal(false);
    }

    const filterChores = () => {
        const result = [];
        if ( userChores && allChores ) {
            result = allChores.filter(all => 
                userChores.every(user => user.id !== all.id));                
        }
        return result;
    }
    const closeModal = () => {
        setShowModal(false);
    }


    const ChoreListComponent = () => {
        return (
            
            <div className="chore-main">
                {/* <button onClick={() => filterObjectArray(allChores, userChores)}>Click me</button> */}
                <ChoreModal close={hideChoreModal}
                            show={showModal} 
                            title={'Assign Chore'}
                            content={allChores.filter(all=>userChores.every(user => user.id !== all.id))} 
                            actions={[{name: 'Assign', action: 'addChore'},
                                //   {name: 'Cancel', action: 'hideChoreModal'}
                                ]}
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
                        <button onClick={() => {showAddChoreModal()}}>Assign Chore</button>
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
                        : ''
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

    const renderSchedule = (frequency, choreID, chorePayment) => {
        let paymentsForThisChore;
        if ( frequency === 'Daily') {
            paymentsForThisChore = checkedDailyState.filter(payment => payment.choreID == choreID);
        } else {
            paymentsForThisChore = checkedWeeklyState.filter(payment => payment.choreID === choreID);
        }
        if ( paymentsForThisChore.length > 0 ) {
            const paymentObj = paymentsForThisChore[0];            
            setChoreTotalPayment(paymentObj.totalPayment);
            //buildPaymentsArray(paymentObj.choreID, paymentObj.totalPayment);
            return (
                Object.keys(paymentObj.schedule).map((key, index) => {                                        
                    if ( key.substring(key.length - 3) === 'day' ) {                       
                        return (
                        <div className="daily-chore">                            
                                <label htmlFor={`custom-checkbox-${index}`}>{key.substring(0,1).toUpperCase()}
                                    <input className="schedule-checkbox"
                                        disabled={scheduleIsDisabled}
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={key}
                                        value={key}
                                        checked={paymentObj.schedule[key]}
                                        onChange={() => handleDailyScheduleChange(choreID, key, chorePayment)}                                
                                    />
                                </label>                                           
                        </div>
                        );
                    } else if( key === 'weekly') {                        
                        return(
                            <div className="weekly-chore">                                                
                                <label className="weekly" htmlFor={`custom-checkbox-${index}`}>Completed
                                    <input className="schedule-checkbox"
                                        disabled={scheduleIsDisabled}
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={key}
                                        value={key}
                                        checked={paymentObj.schedule[key]}
                                        onChange={() => handleWeeklyScheduleChange(choreID, key, chorePayment)}                                
                                    />
                                </label>                                           
                            </div>
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