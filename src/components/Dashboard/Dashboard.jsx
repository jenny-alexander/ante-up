import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.scss';
import DashboardCalendar from '../Dashboard/DashboardCalendar/DashboardCalendar';
import DashboardMoney from '../Dashboard/DashboardMoney/DashboardMoney';
import DashboardChore from '../Dashboard/DashboardChore/DashboardChore';

function Dashboard(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);    
    const [weekInfo, setWeekInfo] = useState ({});

    useEffect(()=> {
        dispatch( { type: 'FETCH_ALLOWANCE', payload: props.user.id} );
    },[])

    useEffect(() => {        
        if (props.week && props.week.week) {
            if (Object.entries(props.week.week).length !== 0) {                
                setWeekInfo({...weekInfo,
                    allowanceDate: props.week.week[0].allowance_date.substring(0,10),
                    startDate: props.week.week[0].start_date.substring(0,10),
                    endDate: props.week.week[0].end_date.substring(0,10),
                    //nextAllowanceDate: getNextAllowanceDate(props.week.week[0].allowance_date.substring(0,10)),                
                })                
            }
        }
    },[props.week])

    // const getNextAllowanceDate = (d) => {
    //     let date = new Date(d);
    //     date.setDate(date.getDate() + 7);
    //     const year = date.getUTCFullYear();
    //     const month = padTo2Digits(date.getUTCMonth() + 1);
    //     const day = padTo2Digits(date.getUTCDate());
    //     const dateWithHyphens = [year, month, day].join('-');
    //     return dateWithHyphens;
             
    // }
    // const padTo2Digits= (num) => {
    //     return num.toString().padStart(2, '0');
    //   }

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-main">                   
                {/* <div className="dashboard-week">Week of {weekInfo.startDate}</div>                                       */}
                <DashboardCalendar user={props.user}/>
                <DashboardMoney 
                    user={props.user} 
                    weekInfo={weekInfo} />
                    {/* allowance={allowance}/> */}
                <DashboardChore />                        
            </div>
        </div>
    )
}

export default Dashboard;