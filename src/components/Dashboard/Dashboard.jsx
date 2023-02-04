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
        dispatch({type: 'GET_CHORE_REQUESTED', payload: props.user.id})
        //dispatch( {type: 'GET_DAILY_PAYMENT_REQUESTED', payload: {userID: props.user.id,weekID: 1}}); //<--TODO: set this dynamically
        //dispatch( {type: 'GET_WEEKLY_PAYMENT_REQUESTED', payload: {userID: props.user.id,weekID: 1}}); //<--TODO: set this dynamically
    },[])

    useEffect(()=>{
        if (chores.chore.length > 0) {
            setChoresExist(true);
            setUserChores(chores.chore)
        }
    },[chores.chore]);

    const DashboardContainer = () => {
        return (
            <div className="dashboard-main">                                   
                <DashboardCalendar user={props.user}/>
                <DashboardMoney 
                    user={props.user} 
                    weekInfo={props.week} />
                <DashboardChore                    
                    user={props.user}
                    chore={userChores} />                        
            </div>
        )
    }

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
                    chore={userChores} />                        
            </div>
        </div>
    )
}

export default Dashboard;