import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Utility from '../../../utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import 'react-tooltip/dist/react-tooltip.css';
import './MoneySaving.scss';

function MoneySaving(props) {
    const dispatch = useDispatch();
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);
    const[editSavingFor, setEditSavingFor] = useState(false);
    const[savingFor, setSavingFor] = useState({description: '', amount: ''});

    const saveGoalChanges = () => {        
        dispatch( { type: 'SAVE_BANK_GOAL', payload: { amount: savingFor.amount, 
                                            description: Utility.replaceApostrophe(savingFor.description),
                                            userID: user.id}})                
        setEditSavingFor(!editSavingFor);                                         
    }

    useEffect(() => {
        setSavingFor({...savingFor,amount: bank.bank.goal_amount, description: bank.bank.goal_desc})
    },[bank.bank])

        return (           
            <div className="money-saving">
                <div className="saving-title-section">
                    <div className="saving-title">Saving Goal</div>
                    <FontAwesomeIcon id="info-snippet" className="saving-info-icon" icon={faCircleInfo} />
                    <Tooltip anchorId="info-snippet" place={'right'} content="Saving for a specific goal can keep you motivitated!" />
                </div>

                <div className="money-input-group">
                    <div className="saving-goal-amount">
                        <label id="goal-amount-label" htmlFor="saving-goal">Amount:</label>
                        <input id="goal-amount-input"
                            type="number"
                            disabled={!editSavingFor}
                            value={savingFor.amount}
                            onChange={(e) => { setSavingFor({ ...savingFor, amount: e.target.value }); } } />
                    </div>                    
                    <div className="saving-goal-desc">
                        <label id="goal-desc-label" htmlFor="saving-goal">Description:</label>
                        <input id="goal-desc-input"
                            type="text"
                            disabled={!editSavingFor}
                            value={savingFor.description}
                            onChange={(e) => { setSavingFor({ ...savingFor, description: e.target.value }); } } />
                    </div>

                </div>
                <div className="saving-goal-buttons">
                    {editSavingFor ?
                        (<>
                            <button onClick={() => { saveGoalChanges(); } }>Save</button>
                            <button onClick={() => { setEditSavingFor(false); } }>Cancel</button>
                        </>)
                        :
                        (<button onClick={() => {
                            setEditSavingFor(true);
                        } }>Edit</button>)}
                </div>
            </div>
        )
}

export default MoneySaving;