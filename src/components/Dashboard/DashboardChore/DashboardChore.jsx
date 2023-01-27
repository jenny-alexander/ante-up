import React, {useEffect ,useState} from 'react';
import './DashboardChore.scss';

function DashboardChore(props) {
    const[userChores, setUserChores] = useState([]);

    useEffect(()=>{        
        if (props.chore.length > 0) {            
            setUserChores(props.chore)
        }
    },[props.chore]);

    return (
        <div className="dashboard-chore">
            <div className="dashboard-chore-title">This week's chores</div>
            {userChores.map((chore,i) => 
                <div className="dashboard-chore-card">
                    <div className="dashboard-chore-name">{chore.name}</div>
                    <div className="dashboard-chore-payment">Total earned: ${chore.payment}</div>
                </div>
            )

            }
        </div>
    )
}
export default DashboardChore;