import React, {useState, useEffect} from 'react';
import './Dashboard.scss';
import DashboardCalendar from '../Dashboard/DashboardCalendar/DashboardCalendar';
import DashboardMoney from '../Dashboard/DashboardMoney/DashboardMoney';
import DashboardChore from '../Dashboard/DashboardChore/DashboardChore';

function Dashboard(props) {
    const [weekInfo, setWeekInfo] = useState ({});

    useEffect(() => {
        console.log('in useEffect and week info is:', props.week)
        setWeekInfo({...weekInfo,
            startDate: props.week.start_date,
            endDate: props.week.end_date,
        })
    },[props.week])

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-main">   
                <div className="dashboard-week">Week of Dec. 26 - Jan. 1 2023
                <br/>
                
                </div>                                      
                <DashboardCalendar user={props.user}/>
                <DashboardMoney user={props.user} />
                <DashboardChore />                        
            </div>
        </div>
    )
}

export default Dashboard;