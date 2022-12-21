import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DashboardCalendar.scss';

function DashboardCalendar(props) {
    const today = new Date();
    const[selectedDay, setSelectedDay] = useState(today);

    return (
        <div className="calendar-container">
            <DayPicker selected={selectedDay} />
        </div>
        
    )
}
export default DashboardCalendar;
