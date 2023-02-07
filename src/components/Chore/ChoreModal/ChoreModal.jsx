import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './ChoreModal.scss';

function Modal(props) {
    const[addChore, setAddChore] = useState(false);

    useEffect(() => {
        console.log('props in modal are:', props);
    },[])

    if ( props.show ) {
        return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">{props.title}</div>
                    <button className="close-user-menu" 
                            onClick={props.close}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                {/* <div><button className="add-chore-btn" onClick={()=>setAddChore(!addChore)}>Suggest New Chore</button></div> */}
                <div className="modal-body">                    
                    { addChore ?
                        <div>
                            I will add a chore soon
                        </div> : null }

                        <div className={`${addChore ? 'modal-chore-list hide' : 'modal-chore-list'}`} >
                            { props.content.length > 0 ?
                                props.content.map((content,i) => {
                                    return (
                                        <div className="modal-content">
                                            <div className="modal-chore-details">
                                                <div className="modal-chore-payment">${content.payment}</div>
                                                <div>
                                                    <div className="chore-name">{content.name}</div>
                                                    <div className="chore-frequency">{content.frequency}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <button>Assign</button>
                                            </div> 
                                            {/* <div className="modal-chore-payment">$3</div>
                                            <div className="modal-chore">
                                                <div className="chore-name">{content.name}</div>
                                                <div className="chore-frequency">Daily</div>
                                            </div>

                                            */}

                                            {/* <div className="modal-chore-payment">$3</div>
                                            <div className="modal-chore">
                                                <div className="chore-name">{content.name}</div>
                                                <div className="chore-frequency">Daily</div>
                                            </div>
                                            <div>
                                                <button>Assign</button>
                                            </div> */}
                                        </div>
                                    )
                                })
                                : <div>Nothing here</div>
                            }
                        </div>                                        
                    <div className="modal-actions">                    
                        <div className="action-buttons">
                        
                            {/* {
                                props.actions.map(action => {
                                    return (
                                        <button key="modal-action" onClick={action.method}>{action.name}</button>
                                    )
                                })
                            } */}
                            <button onClick={props.close}>Close</button>
                        </div>
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