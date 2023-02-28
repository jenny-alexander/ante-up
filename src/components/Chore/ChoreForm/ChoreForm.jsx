import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import './ChoreForm.scss';

function ChoreForm(props) {
    const[choreName, setChoreName] = useState('');   
    const[chorePayment, setChorePayment] = useState(0);
    const[assignToUser, setAssignToUser] = useState(true);
    const [frequencySelected, setFrequencySelected] = useState('Daily');      
    const dispatch = useDispatch();  

    const options = [        
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Ad hoc', label: 'Ad hoc'}
      ]
    const addNewChore = () => {
        event.preventDefault();
        dispatch({type: 'ADD_NEW_CHORE', 
                  payload: {
                    userId: props.userId,
                    weekID: props.weekID,
                    choreName: choreName,
                    chorePayment: chorePayment,
                    choreFrequency: frequencySelected.value,
                    assignToUser: assignToUser,
        }})
    }
    const assign = () => {
        setAssignToUser(!assignToUser);
      };

      const handleFrequencyChange = (selected) => {    
        console.log('*** frequency selected is:', selected);          
        setFrequencySelected(selected);
    }

  return (
    <div className="new-chore-container">
        <div className="new-chore-title">Add a New Chore</div>
            <form onSubmit={addNewChore}>
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
                                    defaultValue={options[0]}
                            />
                        </div>            
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <div className="assign-chore-checkbox">
                            <label>
                                <input  type="checkbox" defaultChecked={assignToUser} onClick={assign} />
                                <span></span>
                                <strong>Assign To Me</strong>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="add-chore-form-buttons">
                    <button 
                        type="submit"
                        className="green-button add">Add Chore</button>
                    <button 
                        className="white-button cancel"
                        onClick={props.cancel}>Cancel
                    </button>
                </div>
        </div>
        </form>
    </div>
  )
}

export default ChoreForm;