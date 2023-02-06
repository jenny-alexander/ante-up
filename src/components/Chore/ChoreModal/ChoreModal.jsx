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
                <div className="modal-body">
                    <button className="add-new-chore" onClick={()=>setAddChore(!addChore)}>Add New Chore</button>
                    { addChore ?
                        <div>
                            I will add a chore soon
                        </div> : null }

                        <div>
                            { props.content.length > 0 ?
                                props.content.map((content,i) => {
                                    return (
                                        <div className="modal-content">
                                            <input type="checkbox" />
                                            <div>{content.name}</div>
                                        </div>
                                    )
                                })
                                : <div>Nothing here</div>
                            }
                        </div>
                    
                    
                    <div className="modal-actions">                    
                        <div className="action-buttons">
                        
                            {
                                props.actions.map(action => {
                                    return (
                                        <button key="modal-action" onClick={action.method}>{action.name}</button>
                                    )
                                })
                            }
                            <button onClick={props.close}>Cancel</button>
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