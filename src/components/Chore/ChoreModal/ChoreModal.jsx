import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ChoreForm from '../ChoreForm/ChoreForm';
import './ChoreModal.scss';

function ChoreModal(props) {
    const dispatch = useDispatch();
    const[allChores, setAllChores] = useState([]);
    const[addNewChore, setAddNewChore] = useState(false); //TODO: Need this when suggesting a new chore    

    // useEffect(() => {
    //     console.log('*** in useEffect of ChoreModal')
    //     setAllChores(props.content.allChores);
    // },[])

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
        const userChore = props.content.userChores.find(userChore => userChore.id === chore.id);        
        dispatch( {type: 'REMOVE_CHORE_FROM_USER', 
            payload: {
                userChoreId: userChore.user_chore_id,
                choreId: chore.id, 
                userId: props.user.id,
                weekId: props.weekID,
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
                            <FontAwesomeIcon onClick={props.close} className="fa-Xmark" fixedWidth icon={faXmark} />                                      
                        </div>
                    </div>
                    <div className="add-chore-btn-container">
                        <button className={`${addNewChore ? 'add-chore-btn disable' : 'add-chore-btn'}`}
                                disabled={addNewChore} 
                                onClick={()=>setAddNewChore(!addNewChore)}>
                                Add New Chore
                            </button>
                    </div>
                </div>
                <div className="modal-body-container">
                    <div className="modal-body">                    
                        { addNewChore ?
                            <ChoreForm userId={props.user.id}
                                    weekID={props.weekID} 
                                    cancel={() => setAddNewChore(!addNewChore)}
                            />
                        :
                            <div className='modal-chore-list'>
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
ChoreModal.PropTypes = {
    title: PropTypes.string,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    actions: PropTypes.array,
    content: PropTypes.array,
}
export default ChoreModal;