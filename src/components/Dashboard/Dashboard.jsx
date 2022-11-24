import { React } from 'react';
import './Dashboard.scss';
import DashboardCalendar from '../Dashboard/DashboardCalendar/DashboardCalendar';
import DashboardMoney from '../Dashboard/DashboardMoney/DashboardMoney';
import DashboardChore from '../Dashboard/DashboardChore/DashboardChore';

function Dashboard(props) {


    return (
        <div className="dashboard">                                   
            <DashboardCalendar />
            <DashboardMoney />
            <DashboardChore />            

            
        </div>
    )
}

export default Dashboard;