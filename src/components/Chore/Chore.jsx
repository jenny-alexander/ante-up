import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card/Card';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Chore.scss';
import { ConstructionOutlined } from '@mui/icons-material';

function Chore(props) {
    const dispatch = useDispatch();    
    const chores = useSelector((store) => store.chore);
    const chorePayment = useSelector((store) => store.chorePayment);
    const MySwal = withReactContent(Swal); 
    const [userChores, setUserChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);
    const [frequencySelected, setFrequencySelected] = useState('All');
    //const [choreDetails, setChoreDetails] = useState({});       
    const [selectedRow, setSelectedRow] = useState(-1);    
    //const [allowPaymentUpdate, setAllowPaymentUpdate] = useState(false);
    const [checkedDailyState, setCheckedDailyState] = useState([]);
    const [checkedWeeklyState, setCheckedWeeklyState] = useState([]);
    const [choreTotalPayment, setChoreTotalPayment] = useState(0)
    const [scheduleIsDisabled, setScheduleIsDisabled] = useState(true)

    const options = [
        { value: 'All', label: 'All'},
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Ad Hoc', label: 'Ad Hoc'}
      ]

    useEffect(() => {
            dispatch( {type: "GET_CHORE_REQUESTED", payload: props.user.id});
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
            console.log('chorePayment in useEffect (weekly) is:', chorePayment.weeklyPayment.payment)
            buildPaymentState(chorePayment.weeklyPayment.payment, 'weekly');   
        }
    },[chorePayment.weeklyPayment.payment]);

    useEffect(() => {
        if (chores.chore.length > 0) {
            setChoresExist(true);
            setUserChores(chores.chore)
        }
    },[chores.chore]);

    const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

    const buildPaymentState = ( payment, paymentType ) => {        
        const newStateArray = [];        
        payment.map((item) => {
            const newObject = { choreID: item.chore_id,
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
            newStateArray.push(newObject);
        })  
        if (paymentType === 'daily')
                setCheckedDailyState(newStateArray); 
        else if (paymentType === 'weekly'){
            setCheckedWeeklyState(newStateArray);
        }         
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

    const handleDailyScheduleChange = (choreID, key) => {        
        const updatedState = checkedDailyState.map(obj => {
            if (obj.choreID === choreID) {
                let checkValue = obj.schedule[key];
                let payment;
                if (checkValue) {
                    payment = obj.totalPayment - 1;
                }
                else {
                    payment = obj.totalPayment + 1;
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

    const handleWeeklyScheduleChange = (choreID, key) => {
    setCheckedWeeklyState(current =>
        current.map(obj => {
            if (obj.choreID === choreID) {
            let checkValue = obj.schedule[key];
            return {...obj, 
                    schedule: { ...obj.schedule,
                    [key]: !checkValue,
                }
            };
            }
            return obj;
        }),
        );
    };

    const showDetails = (i) => {   
        setScheduleIsDisabled(true);
        if (selectedRow === i) {
            setSelectedRow(-1);
        }else {
            setSelectedRow(i);            
        }        
    }
    
    const saveScheduleChange = (choreID) => {
        console.log('in saveScheduleChange and payment info is:', checkedDailyState);
        console.log('chore passed as param is:', choreID);
        //send only the chore that was updated in the payload.
        const paymentForThisChore = checkedDailyState.filter(payment => payment.choreID == choreID);
        console.log('paymentForThisChore is:', paymentForThisChore);

        //TODO: need to confirm that user wants to save the changes.

        dispatch( { 
                    type: 'UPDATE_DAILY_PAYMENT', 
                    payload: {
                        userID: props.user.id,
                        choreID: choreID,
                        schedule: paymentForThisChore[0].schedule,
                        totalPayment: paymentForThisChore[0].totalPayment,
                }
        });
        setScheduleIsDisabled(!scheduleIsDisabled);
    }
    const ChoreListComponent = () => {
        return (
            <div className="chore-main">
                <div className="chore-selector">                    
                    <div className="selector-title">Frequency:</div>
                    <div className="selector-dropdown">
                        <Select options={options}
                                onChange={handleFrequencyChange}                                
                                value={frequencySelected}
                        />
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
                                    {/* <tr>                                                                             */}
                                        <td data-th="Name">{chore.name}</td>
                                        <td data-th="Frequency">{chore.frequency}</td>
                                        <td data-th="Payment" className='td-center'>${chore.payment}</td>
                                        <td data-th="expand" className='td-center'>
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
                                                        <button onClick={()=>saveScheduleChange(chore.id)}>Save</button>
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
            </div>            
        )
    }

    const renderSchedule = (frequency, choreID) => {    
        let paymentForThisChore;
        if ( frequency === 'Daily') {
            paymentForThisChore = checkedDailyState.filter(payment => payment.choreID == choreID);
        } else {
            paymentForThisChore = checkedWeeklyState.filter(payment => payment.choreID === choreID);
        }
        if ( paymentForThisChore.length > 0 ) {
            const paymentObj = paymentForThisChore[0];            
            setChoreTotalPayment(paymentObj.totalPayment);
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
                                        onChange={() => handleDailyScheduleChange(choreID, key)}                                
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
                                        onChange={() => handleWeeklyScheduleChange(choreID, key)}                                
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