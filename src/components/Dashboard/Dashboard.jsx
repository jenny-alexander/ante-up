import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.scss';
import DashboardCalendar from '../Dashboard/DashboardCalendar/DashboardCalendar';
import DashboardMoney from '../Dashboard/DashboardMoney/DashboardMoney';
import DashboardChore from '../Dashboard/DashboardChore/DashboardChore';

function Dashboard(props) {
    const chores = useSelector((store) => store.chore);
    const chorePayment = useSelector((store) => store.chorePayment);
    const dispatch = useDispatch();
    const [totalWeeklyChorePayment, setTotalWeeklyChorePayment] = useState(0);
    const [userChores, setUserChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);    

    useEffect(() => {
        dispatch( {type: "GET_USER_CHORE_REQUESTED", payload: {userID: props.user.id, weekID: props.week.weekID}});  
    },[])

    useEffect(()=>{
        if (chores.userChore.chore.length > 0) {
            setChoresExist(true);
            setUserChores(chores.chore)
        }
    },[chores.userChore.chore]);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-main">                                   
                <DashboardCalendar user={props.user}/>
                <DashboardMoney 
                    user={props.user} 
                    weekInfo={props.week} />
                <DashboardChore                    
                    user={props.user}
                    chore={userChores}
                    weekInfo={props.week} />                        
            </div>
        </div>
    )
}

export default Dashboard;