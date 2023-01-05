import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.scss';
import DashboardCalendar from '../Dashboard/DashboardCalendar/DashboardCalendar';
import DashboardMoney from '../Dashboard/DashboardMoney/DashboardMoney';
import DashboardChore from '../Dashboard/DashboardChore/DashboardChore';

function Dashboard(props) {
    // const dispatch = useDispatch();
    const [weekInfo, setWeekInfo] = useState ({});

    useEffect(() => {
        console.log('props in Dashboard useEffect are:',props)
        if (props.week && props.week.week) {
            if (Object.entries(props.week.week).length !== 0) {                
                setWeekInfo({...weekInfo,
                    week_no: props.week.week.week_no,
                    allowanceDate: props.week.week.allowance_date.substring(0,10),
                    startDate: props.week.week.start_date.substring(0,10),
                    endDate: props.week.week.end_date.substring(0,10),                    
                })                
            }
        }
    },[props.week])

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-main">                                   
                <DashboardCalendar user={props.user}/>
                <DashboardMoney 
                    user={props.user} 
                    weekInfo={weekInfo} /> {/* TODO --> CHECK IF WE CAN DO THIS IN THE MONEY COMP */}
                    {/* allowance={allowance}/> */}
                <DashboardChore />                        
            </div>
        </div>
    )
}

export default Dashboard;