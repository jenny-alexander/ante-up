import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

function Modal(props) {

    if ( props.show ) {
        return (
        <div className="modal-container">
            <div className="modal">
                <h2>{props.title}</h2>
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
                        {/* <button onClick={props.close}>Close</button> */}
                        {
                            props.actions.map(action => {
                                return (
                                    <button key="modal-action" onClick={action.method}>{action.name}</button>
                                )
                            })
                        }
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