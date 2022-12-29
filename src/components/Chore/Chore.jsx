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

    const ChoreComponent = () => {
        return (
            
            <div className="chore-main">
                <div className="chore-selector">
                    <div className="selector-title">Frequency:</div>
                    <Select options={options}
                            defaultValue={options[0]}
                            onChange={handleFrequencyChange}
                    />
                </div>
                <div className="chore-list">
                    {
                        choresExist ? 
                        (<div>
                            <table className='chore-table'>
                                <thead className='chore-head'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Frequency</th>
                                        <th>Payment</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                {chores.chore.map(chore=> 
                                    <tr>
                                    <td>{chore.name}</td>
                                    <td>{chore.frequency}</td>
                                    <td>{chore.payment}</td>
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

    return (
        <div className='chore'>
            <div className='chore-container'>
                <h1 className="chore-title">Chores</h1>
                <Card component={<ChoreComponent />} />
            </div>
        </div>
    )
}

export default Chore;