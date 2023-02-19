import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ChoreForm.scss';

function ChoreForm(props) {
    const[choreName, setChoreName] = useState('');
    const[choreDescription, setChoreDescription] = useState(''); //TODO: probably won't use it
    const[choreFrequency, setChoreFrequency] = useState('');
    const[chorePayment, setChorePayment] = useState(0);
    const[assignToUser, setAssignToUser] = useState(true);
    const dispatch = useDispatch();  

    const addNewChore = () => {
        console.log('in addNewChore!');
    }
    const callback = () => {
        setAssignToUser(!assignToUser);
        //onClick(!assignToUser);
      };

  return (
    <div className="new-chore-container">
        <form onSubmit={addNewChore}>        
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
                        <input id="chorePayment" type="text"
                            value={chorePayment}
                            onChange={(event) => setChorePayment(event.target.value)}
                            required />              
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
                    <button type="submit" className="green-button add">Add Chore</button>
                    <button 
                        // onClick=
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