import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ChoreForm from '../ChoreForm/ChoreForm';
import './ChoreModal.scss';

function ChoreModal(props) {
    const dispatch = useDispatch();
    const chores = useSelector((store) => store.chore);
    const[allChores, setAllChores] = useState([]);
    const [userChores, setUserChores] = useState([]);
    const[addNewChore, setAddNewChore] = useState(false); //TODO: Need this when suggesting a new chore  
    const [scrollTop, setScrollTop] = useState(0);
    const scrollRef = useRef(null);    

    console.log('***rendering ChoreModal.jsx');
    
    useEffect(() => {
        const sessionScrollTop = window.sessionStorage.getItem('scroll-top');
        if (sessionScrollTop > 0 ) {
            scrollRef.current.scrollTo({
            top: sessionScrollTop,
            left: 0,
            behavior: "smooth",});            
        }
    }, [])
    useEffect(() => {
        if (chores.allChore.chore.length > 0) {
            setAllChores(chores.allChore.chore)
        }
    },[chores.allChore.chore]);



    useEffect(() => {
        //setChoresExist(chores.userChore.chore.length > 0);
        setUserChores(chores.userChore.chore);
    },[chores.userChore.chore]);

    const assignChore = (chore) => {     
        console.log('*** in assignChore & value in allChores is:', allChores);   
        //storeScrollTop(scrollTop);
        dispatch( {type: 'ASSIGN_CHORE_TO_USER', 
                   payload: {
                        choreId: chore.id,
                        userId: props.user.id,                                                
                        weekID: props.weekID,
                        frequency: chore.frequency, }, 
        });
    }

    const removeChore = (chore) => {
        //storeScrollTop(scrollTop);
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
         setUserChores((currentChore) =>
            currentChore.filter((thisChore) => thisChore.id !== currentChore.id)
       );
    }

    // const storeScrollTop = (scrollValue) => {
    //     window.sessionStorage.removeItem('scroll-top');
    //     window.sessionStorage.setItem('scroll-top', scrollValue);
    // }

    // const handleScroll = (event) => { setScrollTop(event.currentTarget.scrollTop); };

    if ( props.show ) {
        // if ( isOpen ) {
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
                    <div className="add-chore-btn-container">                        
                        <button className={`${addNewChore ? 'add-chore-btn disable' : 'add-chore-btn'}`}
                                disabled={addNewChore} 
                                onClick={()=>setAddNewChore(!addNewChore)}>
                                Add New Chore
                            </button>
                            
                    </div>
                </div>
                <div className="modal-body-container"  >
                    <div className="modal-body" >                    
                        { addNewChore ?
                            <ChoreForm userId={props.user.id}
                                    weekID={props.weekID} 
                                    cancel={() => setAddNewChore(!addNewChore)}
                            />
                        :                        
                            <div className='modal-chore-list' 
                                ref={scrollRef} 
                                //onScroll={handleScroll}
                            >
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
                                                <div className="manage-chore-btn">
                                                    {
                                                        userChores?.length > 0  && userChores?.find(chore => chore.id === content.id) ? 
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
export default React.memo(ChoreModal);