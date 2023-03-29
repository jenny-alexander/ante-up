import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ChoreForm from '../ChoreForm/ChoreForm';
import Swal from 'sweetalert2';
import './ChoreModal.scss';

function ChoreModal(props) {
    const dispatch = useDispatch();
    const chores = useSelector((store) => store.chore);    
    const[allChores, setAllChores] = useState([]);
    const [userChores, setUserChores] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [addNewChore, setAddNewChore] = useState(false);
    const [editChores, setEditChores] = useState(false);
    const [choreToEdit, setChoreToEdit] = useState({});

    useEffect(() => {
        setAllChores(chores.allChore.chore);
    },[chores.allChore.chore]);

    useEffect(() => {
        setUserChores(chores.userChore.chore);
    },[chores.userChore.chore]);

    useEffect(() => { 
        if (chores.allChore.addSuccess === true) {
            launchSuccessToast('Chore added!');
            dispatch({type:'CLEAR_ADD_SUCCESS_FLAG'});
        }
    },[chores.allChore.addSuccess]);

    useEffect(() => { 
        if (chores.allChore.deleteSuccess === true) {
            launchSuccessToast('Chore deleted!');
            dispatch({type:'CLEAR_DELETE_SUCCESS_FLAG'});
        }
    },[chores.allChore.deleteSuccess]);

    useEffect(() => { 
        if (chores.allChore.updateSuccess === true) {
            launchSuccessToast('Chore updated!');
            dispatch({type:'CLEAR_UPDATE_SUCCESS_FLAG'});
        }
    },[chores.allChore.updateSuccess]);

    const openDeleteChoreModal = (chore) => {
        Swal.fire({
            title: `Delete Chore?`,
            position: 'top',     
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#007E58',
            customClass: {
                popup: 'swal2-popup chore',
                title: 'swal2-title chore',
                icon:'swal2-icon chore',              
            },
            showClass: {
                popup: 'swal2-noanimation',
                icon: 'swal2-noanimation'
              },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteChore(chore)
            } 
        })              
    }

    const launchSuccessToast = (title) => {
        const Toast = Swal.mixin({
            toast: true,            
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 3500,            
          })
          
          Toast.fire({
            icon: 'success',
            title: title,
            showClass: {
                backdrop: 'swal2-noanimation',
                popup: 'swal2-noanimation',
                icon: 'swal2-noanimation'
              },
          })
    }

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
        const userChore = userChores.find(userChore => userChore.id === chore.id);        
        dispatch( {type: 'REMOVE_CHORE_FROM_USER', 
            payload: {
                userChoreId: userChore.user_chore_id,
                choreId: chore.id, 
                userId: props.user.id,
                weekId: props.weekID,
                frequency: chore.frequency,
                },
         });
         setUserChores((currentChore) => currentChore.filter((thisChore) => thisChore.id !== currentChore.id));         
    }

    const deleteChore = (chore) => {                
            dispatch({type: 'DELETE_CHORE', payload: {choreId: chore.id} })
    }

    const editChore = (chore) => {
        console.log('editChore and chore param is:', chore);
        setShowEditForm(!showEditForm)        
        setChoreToEdit(chore);
    }

    if ( props.show ) {
        return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-header-container">
                        <div className="modal-title">{props.title}</div>
                        <div className="chore-btns">
                            <FontAwesomeIcon                                 
                                onClick={props.close} 
                                className="fa-Xmark" 
                                fixedWidth icon={faXmark} />                                      
                        </div>
                    </div>
                    { addNewChore || showEditForm ? null 
                    :
                    <div className="manage-chore-btn-container">
                        { editChores ? 
                            <>
                            <button className={`${showEditForm ? 'manage-chore-btn disable' : 'manage-chore-btn'}`}
                                    id='cancel-edit'
                                    disabled={showEditForm} 
                                    onClick={()=>setEditChores(!editChores)}>Cancel Editing Chores</button>
                            </>
                            :
                            <>
                                <button className={`${addNewChore ? 'manage-chore-btn disable' : 'manage-chore-btn'}`}
                                        disabled={addNewChore} 
                                        onClick={()=>setAddNewChore(!addNewChore)}>
                                        Add New Chore
                                </button>
                                <button className={`${addNewChore ? 'manage-chore-btn disable' : 'manage-chore-btn'}`}
                                        onClick={()=>setEditChores(!editChores)}
                                >
                                    Edit Chores
                                </button>
                            </>  
                        }
                    </div>
                
                    }
                    </div>
                <div className="modal-body-container"  >
                    <div className="modal-body" >                    
                        { addNewChore ?
                            <ChoreForm 
                                type="add"
                                userId={props.user.id}
                                weekID={props.weekID}
                                close={() => setAddNewChore(!addNewChore)}
                                cancel={() => setAddNewChore(!addNewChore)}
                            />
                        :      
                        showEditForm ?
                            <ChoreForm 
                                type="edit"
                                userId={props.user.id}
                                weekID={props.weekID}
                                chore={choreToEdit}
                                close={() => setShowEditForm(!showEditForm)}
                                cancel={() => setShowEditForm(!showEditForm)}
                            />
                        :
                            <div className='modal-chore-list'>
                                { Object.entries(allChores).length > 0 ?                            
                                    allChores.map((content,i) => {
                                        return (
                                            <div className="modal-content">
                                                <div className="modal-chore-details">
                                                    <div className="modal-chore-payment">${content.payment}</div>
                                                    <div>
                                                        <div className="chore-name">{content.name}</div>
                                                        <div className="chore-frequency">{content.frequency}</div>
                                                    </div>
                                                </div>
                                                { editChores ?  
                                                <div className="edit-chore-btns">
                                                    
                                                    <button className="edit-btn">
                                                        <FontAwesomeIcon                                                                                             
                                                            //onClick={()=>setShowEditForm(!showEditForm)}
                                                            onClick={()=>{editChore(content)}}
                                                            fixedWidth icon={faEdit} 
                                                        />     
                                                    </button>
                                                    <button className="delete-btn">
                                                        <FontAwesomeIcon                                 
                                                            // onClick={()=>{deleteChore(content)}} 
                                                            onClick={()=>{openDeleteChoreModal(content)}} 
                                                            fixedWidth icon={faTrashCan} 
                                                        /> 
                                                    </button>
                                                    </div>
                                                    :
                                                    <div className="manage-chore-btn">
                                                        {
                                                            userChores?.length > 0  && userChores?.find(chore => chore.id === content.id) ? 
                                                                <button onClick={()=> removeChore(content)}>Remove</button> 
                                                                : <button onClick={()=> assignChore(content)}>Assign</button>
                                                        }
                                                    </div> 
                                                }
                                            </div>
                                        )
                                    })
                                    : <div className="empty-chores">
                                        <div>You don't have any chores yet!</div>
                                        <div>Start by clicking the 'Add New Chore' button</div>
                                        </div>
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

export default ChoreModal;