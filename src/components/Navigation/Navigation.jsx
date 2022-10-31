import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navigation.scss';
import PaidOutlineIcon from '@mui/icons-material/PaidOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HistoryIcon from '@mui/icons-material/History';
//import mainLogo from 'images/ante_up.png';

function Navigation(props) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    return (
            <div className="navigation">
                {/* { Object.entries(user).length === 0 ? 
                    <>
                        <div className="main-links">
                            <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                        </div> 
                        <p className="nav-greeting">You're one click away from simplifying family chores and allowances.</p>
                    </>
                    :  */}
                    <div className="main-links">
                        <img className="logo" src="images/ante_up.png" alt="ante up logo"></img>
                        <div className="action-links">
                            <div>
                                <Link className="nav-dashboard" to="dashboard">
                                    Dashboard
                                </Link>
                            </div>
                            <div>
                            <Link className="nav-money" to="/money">
                                Money
                            </Link>
                            </div>
                            <div>
                                <Link className="nav-chore" to="/chore">
                                    Chores
                                </Link>
                            </div>
                            <div>
                            <Link className="nav-activity" to="/activity">
                                Activity Log
                            </Link>      
                            </div>                                
                        </div>
                        { Object.entries(user).length === 0 ? '' : 
                            <div className="logout">
                                <button className="nav-logout" onClick={() => dispatch( { type: 'LOGOUT' })}>Log Out </button>
                            </div>
                        }
                    </div>
{/* } */}
            </div>  

    )
}

export default Navigation;