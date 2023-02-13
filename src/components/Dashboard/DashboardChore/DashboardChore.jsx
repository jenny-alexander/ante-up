import React, {useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardChore.scss';

function DashboardChore(props) {
    const[userChores, setUserChores] = useState([]);
    const dispatch = useDispatch();
    const chorePayments = useSelector((store) => store.dashboard.individualChorePayments);
    const [choresTotal, setChoresTotal] = useState(0)

    useEffect(() => {
        dispatch( { type: 'GET_INDIVIDUAL_CHORE_PAYMENT', payload: { userID: props.user.id, weekID: 1} }); //TODO: Make dynamic
    },[]);

    useEffect(()=>{        
        console.log('individualChorePayment is:', chorePayments);
        if (chorePayments.length > 0) {
            setUserChores(chorePayments);
            let total = 0;
            for (let i = 0; i < chorePayments.length; i++) {
                total = total + chorePayments[i].total_payment;
            }
            console.log('total of all chores is:', total);
            setChoresTotal(total);
        }
    },[chorePayments]);

    return (
        <div className="dashboard-chore">
            {/* <div>HERE THEY ARE:{JSON.stringify(individualChorePayments)}</div> */}
            <div className="dashboard-chore-title">This week's chores</div>
            {userChores.map((chore,i) => 
                <div className="dashboard-chore-card">
                    <div className="dashboard-chore-name">{chore.name}</div>
                    <div className="dashboard-chore-payment">Total earned: ${chore.total_payment}</div>
                </div>
            )

            }
        </div>
    )
}
export default DashboardChore;