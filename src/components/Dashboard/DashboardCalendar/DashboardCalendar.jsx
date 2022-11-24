import { React } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DashboardCalendar.scss';

function DashboardCalendar(props) {
    return (
        <DayPicker className='dashboard-calendar' />
    )
}
export default DashboardCalendar;
