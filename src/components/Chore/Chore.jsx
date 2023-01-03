import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Common/Card/Card';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Chore.scss';

function Chore(props) {
    const dispatch = useDispatch();
    const initialChores = useSelector((store) => store.chore);
    const [userChores, setUserChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);
    const [frequencySelected, setFrequencySelected] = useState('All');
    const [choreDetails, setChoreDetails] = useState({});
    const MySwal = withReactContent(Swal);
    //const [allChores, setAllChores] = useState(chores.chore);

    const options = [
        { value: 'All', label: 'All'},
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Occasionally', label: 'Occasionally'}
      ]

    useEffect(() => {
        console.log('in useEffect of CHORE!!!');
            dispatch( {type: "GET_CHORE_REQUESTED", payload: props.user.id})
    },[])
    useEffect(() => {
        console.log('chores is:', initialChores);
        if (initialChores.chore.length > 0) {
            setChoresExist(true);
            setUserChores(initialChores.chore)
        }
    },[initialChores.chore]);

    const handleFrequencyChange = (selected) => {
        console.log('in handleFrequencyChange with:', selected);
        console.log('userChores is:', userChores);
        if (selected.value==='All') {
            console.log('initialChores is:', initialChores)
            setUserChores(initialChores.chore);
        }else {
            const filteredChores = initialChores.chore.filter(a =>
                a.frequency === selected.value);
            setUserChores(filteredChores);
        }        

        setFrequencySelected(selected);
        
        // setUserChores(
        //     userChores.filter(a =>
        //       a.frequency === selected.value
        //     )
        //   );
    }

    const showChoreDetails = (chore) => {
        console.log('clicked on the row and the chore id is:', chore);
        setChoreDetails({...choreDetails,
            name: chore.name,
            description: chore.description,
            frequency: chore.frequency,
            payment: chore.payment,
            })
    }

    const addChore = () => {
        //setChangeType(changeType)
        const addChoreSWAL =  {            
            title: `Enter new chore details`,
            focusConfirm: true,
            html: `
                    <div class="chore-modal-container">
                        <div class="chore-modal-row">
                            <label class="swal2-label chore-label" for="chore-name">Chore:</label>
                            <input class="swal2-input chore-input" id="chore-name" type="text" />
                        </div>
                        <div class="chore-modal-row">
                            <label class="swal2-label chore-label" for="chore-frequency">Frequency:</label>
                            <input class="swal2-input chore-input" id="chore-frequency" type="text" />
                        </div>
                        <div class="chore-modal-row">
                            <label class="swal2-label chore-label" for="chore-payment">Payment:</label>
                            <input class="swal2-input chore-input" id="chore-payment" type="text" />
                        </div>
                        <div class="chore-modal-row">
                            <label class="swal2-label chore-label" for="chore-description">Description:</label>
                            <input class="swal2-input chore-input" id="chore-description" type="text" />
                    </div>
                   </div>`                   
                   ,
            // iconHtml: '<img src="images/ante_up.png" alt="ante up logo">',
            showClass: {
                //backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: 'swal2-noanimation',                     // disable popup animation
                title: 'swal2-title bucket',
                //icon: 'swal2-noanimation'                       // disable icon animation
              },
            showCancelButton: true,
            cancelButtonColor: 'grey',
            confirmButtonColor: '#007E58',
            confirmButtonText: 'Confirm',
            allowOutsideClick: false,
            // customClass: {
            //     input: 'chore-input',
            // },
            preConfirm: () => ({
                choreName: document.getElementById('chore-name').value,
                choreFrequency: document.getElementById('chore-frequency').value,
                chorePayment: document.getElementById('chore-payment').value,
                choreDescription: document.getElementById('chore-description').value,
            })          
        }

        return addChoreSWAL;
    }    

    const showAddChoreModal = () => {
        console.log('you clicked on addChoreModal');
        //show add chore modal
        //dispatch({type: 'ADD_NEW_CHORE', payload: props.user.id})
        const addNewChore = async () => {
            const swalval = await MySwal.fire(addChore());
            let v = swalval && swalval.value || swalval.dismiss;            
            if (v && v.choreName  || v === 'cancel') {
                if (v !== 'cancel') {
                    console.log('about to dispatch to ADD_CHORE');
                    //setformdata(swalval);
                    dispatch({
                        type: 'ADD_CHORE',
                        payload: {
                            userID: props.user.id,
                            choreDetails: {
                                name: v.choreName,
                                frequency: v.choreFrequency,
                                payment : v.chorePayment,
                                description: v.choreDescription,                                
                            }
                        },
                    });
                    // dispatch({
                    //     type: 'ADD_BANK_TRANSACTION',
                    //     payload: {
                    //         userId: user.id,
                    //         type: changeType,
                    //         timestamp: new Date().toISOString(),
                    //         amount: v.amountValue,
                    //         notes: v.comments,
                    //     }
                    // })
                }
            } else {
              await MySwal.fire({ 
                type: 'error', 
                icon: 'warning',
                title: 'A chore name is required!',
                confirmButtonColor: '#007E58',
                // confirmButtonColor: 'red',
             });
             addNewChore();
            }
          }
          addNewChore();
    }

    const ChoreListComponent = () => {
        return (
            <div className="chore-main">
                <div className="chore-selector">
                    <div className="selector-title">Frequency:</div>
                    <div className="selector-dropdown">
                        <Select options={options}
                                //defaultValue={{label: 'All', value: 'All'}}
                                onChange={handleFrequencyChange}                                
                                value={frequencySelected}
                        />
                    </div>
                    <div>
                        <button className="add-chore-btn" onClick={showAddChoreModal}>Add chore</button>
                    </div>
                </div>
                <div className="chore-list">
                    {
                        choresExist ? 
                        (<div >
                            <table className='chore-table mobile-optimised'>
                                <thead className='chore-head'>
                                    <tr>
                                        <th>Chore</th>
                                        <th>Frequency</th>
                                        <th>Payment</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                {userChores.map(chore=> 
                                    <tr onClick={()=>showChoreDetails(chore)}>
                                    <td data-th="Name">{chore.name}</td>
                                    <td data-th="Frequency">{chore.frequency}</td>
                                    <td data-th="Payment" className='td-center'>{chore.payment}</td>
                                </tr>
                                 )}
                                </tbody>
                            </table>
                        </div>) 
                        
                        
                        : ''
                    }
                </div>
            </div>
            

        )
    }
    
    const ChoreDetailsComponent = () => {
        return (
            <div className='chore-details'>
                <div className='chore-details-frequency'>{choreDetails.frequency}</div>    
                <div className='chore-details-name'>{choreDetails.name}
                    <div id="line"><hr /></div>
                </div>
                <div className='chore-details-payment'>${choreDetails.payment}</div>
                <div className='chore-details-description'>
                    {choreDetails.description}
                </div>
                {
                    <div className='chore-details-schedule'>
                        { renderFrequencySchedule(choreDetails.frequency) }
                    </div>
                }
            </div>
        )
    }

    const renderFrequencySchedule = (frequency) => {
        switch(frequency){
            case 'Daily':
                return (
                    <div className="daily-chore">
                        <div className="daily">
                            <label>M</label>
                            <input type="checkbox"></input></div>                                             
                        <div className="daily">
                            <label>T</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>W</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Th</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>F</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Sat</label>
                            <input type="checkbox"></input>
                        </div>
                        <div className="daily">
                            <label>Sun</label>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                    )
            case 'Weekly':
                return (<div>I am a weekly chore</div>)
            case 'Monthly':
                return (<div>I am a monthly chore</div>)
            case 'Ad hoc':
                return (<div>I am an ad hoc chore</div>)
            default:
                return null;
        }

    }

    return (
        <div className='chore'>
            <div className='chore-container'>
                <h1 className="chore-title">Chores</h1>
                <Card component={<ChoreListComponent />} />                
                {
                     Object.entries(choreDetails).length != 0 ?
                        <Card component={<ChoreDetailsComponent />} />
                    : null
                }
            </div>
        </div>
    )
}

export default Chore;