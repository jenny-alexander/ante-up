import React, { useEffect } from 'react';
import Modal from '../../modules/modals/components/Modal';
import ModalBody from '../../modules/modals/components/ModalBody';
import ModalHeader from '../../modules/modals/components/ModalHeader';
import ModalFooter from '../../modules/modals/components/ModalFooter';

export default function AllowanceModal(props) {
  useEffect(() => {
    console.log('AllowanceModal props are:', props);
  },[])
  return (
    <Modal>
      <ModalHeader>
        <h2>Money</h2>
      </ModalHeader>
      <ModalBody className="modal-body">
        <p>Body of modal #1</p>
      </ModalBody>
      {/* <ModalFooter className="modal-actions"> */}
      <div className="modal-actions">
        <div className="action-buttons">
          <button onClick={ props.close } >Close Modal</button>
          <button onClick={ props.confirm }>Confirm</button>
        </div>
        </div>
        
      {/* </ModalFooter> */}
    </Modal>
  );
}