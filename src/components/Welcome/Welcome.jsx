import { React } from 'react';
import './Welcome.scss';
import PaidOutlineIcon from '@mui/icons-material/PaidOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HistoryIcon from '@mui/icons-material/History';

function Welcome(props) {

    return (
        <div className="welcome">
            <div className="main">
                <img className="logo" src="images/ante_up_welcome.png" alt="ante up logo"></img>
                {/* <div class="typewriter">
                    <div>Allowance and chores simplified!</div>
                </div> */}
                <div className="about">
                    <div className="money">
                        <PaidOutlineIcon className="icon"/>
                        <div className="about-blurb">Make allowance payments</div>
                    </div>
                    <div className="chores">
                        <CleaningServicesIcon className="icon"/>
                        <div className="about-blurb">Delegate chores</div>
                    </div>
                    <div className="history">
                        <HistoryIcon className="icon"/>
                        <div className="about-blurb">View chore & payment history</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;