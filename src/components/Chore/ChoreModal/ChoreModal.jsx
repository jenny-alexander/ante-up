import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

import './ChoreModal.scss';

function Modal(props) {
    const dispatch = useDispatch();
    const[addNewChore, setAddNewChore] = useState(false); //TODO: Need this when suggesting a new chore    

    const assignChore = (chore) => {
        dispatch( {type: 'ASSIGN_CHORE_TO_USER', 
                   payload: {
                        choreId: chore.id,
                        userId: props.user.id,                                                
                        weekID: props.weekID,
                        frequency: chore.frequency, }, 

        });
    }

    const removeChore = (chore) => {
        dispatch( {type: 'REMOVE_CHORE_FROM_USER', 
            payload: {
                choreId: chore.id, 
                userId: props.user.id,
                weekID: props.weekID,
                frequency: chore.frequency,
                },
         });
    }

    if ( props.show ) {
        return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-header-container">
                        <div className="modal-title">{props.title}</div>
                        <div className="chore-btns">
                            {/* <FontAwesomeIcon className="fa-plus" fixedWidth icon={faPlus} />   */}
                            <button className="add-chore-btn" onClick={()=>setAddNewChore(!addNewChore)}>Add New Chore</button>
                            <FontAwesomeIcon onClick={props.close} className="fa-Xmark" fixedWidth icon={faXmark} />                                      
                        </div>
                    </div>

                                            {/* <button className="add-chore-btn" onClick={()=>setAddChore(!suggestChore)}>Add New Chore</button>
                        <button className="close-chore-btn" onClick={props.close}>Close</button>                     */}
                </div>
                
                <div className="modal-body-container">
                <div className="modal-body">                    
                    { addNewChore ?
                        <div>
                            I will add a chore soon
                        </div> : null }

                        <div className={`${addNewChore ? 'modal-chore-list hide' : 'modal-chore-list'}`} >
                            { Object.entries(props.content.allChores).length > 0 ?
                            
                                props.content.allChores.map((content,i) => {
                                    console.log('refiguring out the things')
                                    return (
                                        <div className="modal-content">
                                            <div className="modal-chore-details">
                                                <div className="modal-chore-payment">${content.payment}</div>
                                                <div>
                                                    <div className="chore-name">{content.name}</div>
                                                    <div className="chore-frequency">{content.frequency}</div>
                                                </div>
                                            </div>
                                            <div className="manage-chore-btn">
                                                {
                                                    props.content.userChores.length > 0  && props.content.userChores.find(chore => chore.id === content.id) ? 
                                                        <button onClick={()=> removeChore(content)}>Remove</button> 
                                                        : <button onClick={()=> assignChore(content)}>Assign</button>
                                                }
                                            </div> 
                                        </div>
                                    )
                                })
                                : null
                            }
                        </div>                                        
                    {/* <div className="modal-actions">                    
                        <div className="action-buttons">
                        
                            {
                                props.actions.map(action => {
                                    return (
                                        <button key="modal-action" onClick={action.method}>{action.name}</button>
                                    )
                                })
                            }
                            <button onClick={props.close}>Close</button>
                        </div>
                    </div> */}
                </div>
                </div>
            </div>
        </div>
        )
    } else {
        return null;
    }

}
Modal.PropTypes = {
    title: PropTypes.string,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    actions: PropTypes.array,
    content: PropTypes.array,
}
export default Modal;