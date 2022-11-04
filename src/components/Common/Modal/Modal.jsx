import React, {useState, useEffect} from 'react';
import './Modal.scss';

function Modal(props) {
    useEffect(() => {
        console.log('in useEffect of MODAL and show is:', props.show);
    })

    if ( props.show ) {
        return (
        <div className="modal">
            <h2>Hello Modal</h2>
            <div className="modal-content">
                I'll be the content
            </div>
            <div className="modal-actions">
                I'll be the actions(buttons)!
                <button onClick={props.close}>Close</button>
            </div>

        </div>
        )
    } else {
        return null;
    }

}
export default Modal;