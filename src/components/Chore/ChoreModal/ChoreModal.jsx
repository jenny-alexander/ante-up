import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './ChoreModal.scss';

function Modal(props) {
    const dispatch = useDispatch();
    const[suggestChore, setSuggestChore] = useState(false);
    const [userChoresExist, setUserChoresExist] = useState(false);

    // useEffect(() => {
    //     console.log('props in modal are:', props);
    // },[])

    useEffect(() => {
        console.log('in useEffect for user chores in MODAL!');
        if (Object.entries(props.content.userChores).length > 0) {
            setUserChoresExist(true);
            // setUserChores(chores.userChore.chore)
        }
    },[props.content.userChores]);

    const addChore = (chore) => {
        console.log('in addChore and chore param is:', chore);
        dispatch( {type: 'ASSIGN_CHORE_TO_USER', 
                   payload: {
                        choreId: chore.id, 
                        userId: props.user.id},
                    });
    }

    const removeChore = (chore) => {
        console.log('in removeChore and chore parm is:', chore);
        dispatch( {type: 'REMOVE_CHORE_FROM_USER', 
        payload: {
             choreId: chore.id, 
             userId: props.user.id},
         });
    }

    if ( props.show ) {
        return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">{props.title}</div>
                    <button className="close-user-menu" 
                            onClick={props.close}
                    >
                        {/* <FontAwesomeIcon icon={faXmark} /> */}
                        Close
                    </button>
                </div>
                {/* <div><button className="add-chore-btn" onClick={()=>setAddChore(!suggestChore)}>Suggest New Chore</button></div> */}
                <div className="modal-body-container">
                <div className="modal-body">                    
                    { suggestChore ?
                        <div>
                            I will add a chore soon
                        </div> : null }

                        <div className={`${suggestChore ? 'modal-chore-list hide' : 'modal-chore-list'}`} >
                            { Object.entries(props.content.allChores).length > 0 ?
                                props.content.allChores.map((content,i) => {
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
                                                    userChoresExist ? 
                                                        props.content.userChores.find(chore => chore.id === content.id) ? <button onClick={()=> removeChore(content)}>Remove</button> 
                                                            : <button onClick={()=> addChore(content)}>Add</button>
                                                
                                                        : <button onClick={()=> addChore(content)}>Add</button>
                                                }
                                                {/* <button onClick={()=> addChore()}>Add</button> */}
                                            </div> 
                                        </div>
                                    )
                                })
                                : <div>Nothing here</div>
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