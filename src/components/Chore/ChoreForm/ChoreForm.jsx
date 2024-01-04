import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import './ChoreForm.scss';

function ChoreForm(props) {
    const [choreName, setChoreName] = useState('');
    const [chorePayment, setChorePayment] = useState(0);
    const [assignToUser, setAssignToUser] = useState(true);
    const [frequencySelected, setFrequencySelected] = useState('Daily');
    const dispatch = useDispatch();
    const [formError, setFormError] = useState({});

    const options = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Ad hoc', label: 'Ad hoc' }
    ];

    useEffect(() => {
        if (props.type === 'edit' && Object.entries(props.chore).length > 0) {
            setChoreName(props.chore.name);
            setChorePayment(props.chore.payment);
            setFrequencySelected({ label: props.chore.frequency, value: props.chore.frequency });
        }
    }, [props.chore])

    const addNewChore = () => {
        event.preventDefault();
        if (frequencySelected === '') {
            setFormError({ ...formError, frequency: true })
        } else {
            if (!formError.payment && !formError.frequency) {
                dispatch({
                    type: 'ADD_NEW_CHORE',
                    payload: {
                        userId: props.userId,
                        weekID: props.weekID,
                        choreName: choreName,
                        chorePayment: chorePayment,
                        choreFrequency: frequencySelected.value,
                        assignToUser: assignToUser,
                    }
                })
                props.close();
            }
        }
    }

    const editExistingChore = () => {
        event.preventDefault();
        dispatch({
            type: 'UPDATE_CHORE',
            payload: {
                choreId: props.chore.id,
                choreName: choreName,
                chorePayment: chorePayment,
                choreFrequency: frequencySelected.value,
            }
        })
        props.close();
    }

    const assign = () => {
        setAssignToUser(!assignToUser);
    };

    const handleFrequencyChange = (selected) => {
        setFrequencySelected(selected);
        setFormError({ ...formError, frequency: false })
    }

    const validatePayment = (value) => {
        setChorePayment(value);
        if (value > 99) {
            setFormError({ ...formError, payment: true });
        } else {
            setFormError({ ...formError, payment: false });
        }
    }

    return (
        <div className="chore-form-container">
            <div className="chore-form-title">{props.type === 'add' ? 'Add a New Chore' : 'Edit Chore'}</div>
            <form
                className="chore-form"
                onSubmit={props.type === 'add' ? addNewChore : editExistingChore}>
                <div className="form-body">
                    <div className="form-row">
                        {formError.payment ?
                            <p className="form-error">Amount must be less than $100</p> : ''
                        }
                        {formError.frequency ?
                            <p className="form-error">Please select a frequency</p> : ''
                        }
                        <div className="input-group">
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
                                // onChange={(event) => setChorePayment(event.target.value)}
                                onChange={(event) => validatePayment(event.target.value)}
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
                                //defaultValue={options[0]}                                    
                                />
                            </div>
                        </div>
                    </div>
                    {props.type === 'add' ?
                        <div className="form-row">
                            <div className="input-group">
                                <div className="assign-chore-checkbox">
                                    <label>
                                        <input type="checkbox" defaultChecked={assignToUser} onClick={assign} />
                                        <span></span>
                                        <strong>Assign To Me</strong>
                                    </label>
                                </div>
                            </div>
                        </div> : null}
                    <div className="chore-form-buttons">
                        <button
                            type="submit"
                            className="green-button add">{props.type === 'add' ? 'Add Chore' : 'Update'}</button>
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