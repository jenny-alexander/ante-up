import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './ChoreForm.scss';

function ChoreForm(props) {
    const[choreName, setChoreName] = useState('');
    const[choreDescription, setChoreDescription] = useState(''); //TODO: probably won't use it    
    const[chorePayment, setChorePayment] = useState(0);
    const[assignToUser, setAssignToUser] = useState(true);
    const [frequencySelected, setFrequencySelected] = useState('Daily');      
    const [selectedRow, setSelectedRow] = useState(-1);    
    const dispatch = useDispatch();  

    const options = [        
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Ad hoc', label: 'Ad hoc'}
      ]
    const addNewChore = () => {
        console.log('in addNewChore!');
        console.log('chore frequency is:', frequencySelected.valueOf)
        dispatch({type: 'ADD_NEW_CHORE', 
                  payload: {
                    userId: props.userId,
                    weekID: props.weekID,
                    choreName: choreName,
                    chorePayment: chorePayment,
                    choreFrequency: frequencySelected.value,
        }})
    }
    const callback = () => {
        setAssignToUser(!assignToUser);
      };

      const handleFrequencyChange = (selected) => {              
        setFrequencySelected(selected);
        setSelectedRow(-1);
    }

  return (
    <div className="new-chore-container">
            <div className="new-chore-title">Add a New Chore</div>
            <div className="form-body">
                <div className="form-row">
                    <div className= "input-group">
                    <label for="choreName">
                        Chore Name
                    </label>
                    <input id="chorename" type="text" 
                        value={choreName}
                        onChange={(event) => setChoreName(event.target.value)}
                        required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label for="chorePayment">
                            Payment
                        </label>
                        <input id="chorePayment" 
                            type="number"
                            value={chorePayment}
                            onChange={(event) => setChorePayment(event.target.value)}
                            required />              
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label for="choreFrequency">
                            Frequency
                        </label>
                        <div className="add-chore-frequency">
                            <Select options={options}
                                    onChange={handleFrequencyChange}                                
                                    value={frequencySelected}
                            />
                        </div>            
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <div className="assign-chore-checkbox">
                            <label>
                                <input  type="checkbox" defaultChecked={assignToUser} onClick={callback} />
                                <span></span>
                                <strong>Assign To Me</strong>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="add-chore-form-buttons">
                    <button 
                        //type="submit" 
                        onClick={addNewChore}
                        className="green-button add">Add Chore</button>
                    <button 
                        className="white-button cancel"
                        onClick={props.cancel}>Cancel
                    </button>
                </div>
            </div>
    </div>
  )
}
export default ChoreForm;