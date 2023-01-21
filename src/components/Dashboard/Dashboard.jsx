import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.scss';
import DashboardCalendar from '../Dashboard/DashboardCalendar/DashboardCalendar';
import DashboardMoney from '../Dashboard/DashboardMoney/DashboardMoney';
import DashboardChore from '../Dashboard/DashboardChore/DashboardChore';

function Dashboard(props) {
    const chores = useSelector((store) => store.chore);
    const [userChores, setUserChores] = useState([]);
    const [choresExist, setChoresExist] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'GET_CHORE_REQUESTED', payload: props.user.id})
    },[])

    useEffect(()=>{
        console.log('in Dashboard useEffect for chore store:', chores);
        if (chores.chore.length > 0) {
            setChoresExist(true);
            setUserChores(chores.chore)
        }
    },[chores.chore]);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-main">                                   
                <DashboardCalendar user={props.user}/>
                <DashboardMoney 
                    user={props.user} 
                    weekInfo={props.week} />
                <DashboardChore chore={userChores} />                        
            </div>
        </div>
    )
}

export default Dashboard;