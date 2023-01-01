import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card/Card';
import './Chore.scss';

function Chore(props) {
    const dispatch = useDispatch();
    const chores = useSelector((store) => store.chore);
    const [userChores, setUserChores] = useState({});
    const [choresExist, setChoresExist] = useState(false);
    const [frequencySelected, setFrequencySelected] = useState('all');
    const [choreDetails, setChoreDetails] = useState({});

    const options = [
        { value: 'all', label: 'All'},
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'ad hoc', label: 'Ad Hoc'}
      ]

    useEffect(() => {
        console.log('in useEffect of CHORE!!!');
            dispatch( {type: "GET_CHORE_REQUESTED", payload: props.user.id})
    },[])
    useEffect(() => {
        console.log('chores is:', chores);
        if (chores.chore.length > 0) {
            setChoresExist(true);
        }
    },[chores])

    const handleFrequencyChange = (selected) => {
        console.log('in handleFrequencyChange with:', selected);
    }

    const showChoreDetails = (chore) => {
        console.log('clicked on the row and the chore id is:', chore);
        setChoreDetails({...choreDetails,
            name: chore.name,
            description: chore.description,
            frequency: chore.frequency,
            payment: chore.payment,
            })
    }

    const ChoreComponent = () => {
        return (
            
            <div className="chore-main">
                <div className="chore-selector">
                    <div className="selector-title">Frequency:</div>
                    <div className="selector-dropdown">
                        <Select options={options}
                                defaultValue={options[0]}
                                onChange={handleFrequencyChange}
                        />
                    </div>
                </div>
                <div className="chore-list">
                    {
                        choresExist ? 
                        (<div>
                            <table className='chore-table'>
                                <thead className='chore-head'>
                                    <tr>
                                        <th>Chore</th>
                                        <th>Frequency</th>
                                        <th>Payment</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                {chores.chore.map(chore=> 
                                    <tr onClick={()=>showChoreDetails(chore)}>
                                    <td>{chore.name}</td>
                                    <td>{chore.frequency}</td>
                                    <td className='td-center'>{chore.payment}</td>
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
    
    const ChoreDetailsComponent = () => {
        return (
            <div className='chore-details'>
                <div className='chore-details-frequency'>{choreDetails.frequency}</div>    
                <div className='chore-details-name'>{choreDetails.name}
                    <div id="line"><hr /></div>
                </div>
                <div className='chore-details-payment'>${choreDetails.payment}</div>
                <div className='chore-details-description'>
                    {choreDetails.description}
                </div>
                
                {/* <div>
                    <label>Name:</label>{choreDetails.name}</div>
                <div>{choreDetails.description}</div>
                <div>{choreDetails.frequency}</div>
                <div>{choreDetails.payment}</div> */}
                {
                    <div className='chore-details-schedule'>
                        { renderFrequencySchedule(choreDetails.frequency) }
                    </div>
                }
                {/* <div className='chore-details-comments'>
                    <label className='chore-comments-label'>Comments:</label>
                    <input className='chore-comments-input' type="textarea"></input>
                </div> */}
            </div>
        )
    }

    const renderFrequencySchedule = (frequency) => {

        switch(frequency){
            case 'Daily':
                return (
                    <div className="daily-chore">
                        <div className="daily">
                            <label>M</label>
                            <input type="checkbox"></input></div>                                             
                        <div className="daily">
                            <label>T</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>W</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Th</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>F</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Sat</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Sun</label>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                    )
            case 'Weekly':
                return (<div>I am a weekly chore</div>)
            case 'Monthly':
                return (<div>I am a monthly chore</div>)
            case 'Ad hoc':
                return (<div>I am an ad hoc chore</div>)
            default:
                return null;
        }

    }

    return (
        <div className='chore'>
            <div className='chore-container'>
                <h1 className="chore-title">Chores</h1>
                <Card component={<ChoreComponent />} />
                
                {
                    choreDetails ?

                    <Card component={<ChoreDetailsComponent />} />
                    : <div>Nothing here</div>
                }
            </div>
        </div>
    )
}

export default Chore;