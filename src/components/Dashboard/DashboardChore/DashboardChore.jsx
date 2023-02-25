import React, {useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardChore.scss';

function DashboardChore(props) {
    const[userChores, setUserChores] = useState([]);
    const week = useSelector((store) => store.week);
    const user = useSelector((store) => store.user);
    
    const dispatch = useDispatch();
    const chorePayments = useSelector((store) => store.dashboard.individualChorePayments);

    useEffect(()=>{
        if (Object.entries(week).length > 0 && Object.entries(user).length > 0 ) {
            dispatch( { type: 'GET_INDIVIDUAL_CHORE_PAYMENT', 
            payload: { 
                    userID: user.id, 
                    weekID: week.id} });   
        }        
    },[week, user])

    useEffect(()=>{  
        setUserChores(chorePayments);      
    },[chorePayments]);

    return (
        <div className="dashboard-chore">
            <div className="dashboard-chore-title">This week's chores</div>
            {
            userChores.length > 0 ?
                userChores.map((chore,i) =>                 
                    <div className="dashboard-chore-card">
                        <div className="dashboard-chore-name">{chore.name}</div>
                        {/* <div className="dashboard-chore-time">Time:{chore.time}</div> */}
                        <div className="dashboard-chore-payment">Total earned: ${chore.total_payment}</div>
                    </div>
                ) 
                : 'No Chores Assigned to You'
            }
        </div>
    )
}
export default DashboardChore;