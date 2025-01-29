import { React } from 'react';
import './Welcome.scss';

function Welcome(props) {
    return (
        <div className="welcome">
            <div className="main">
                <img className="logo" src="images/ante_up_welcome.png" alt="ante up logo"></img>
                <div className="about-main"> 
                    <h1>JENNIFER</h1>
                    <div className="about-money">                        
                        <img className="profile-image" src="/images/lottery.png"/>
                        <div className="about-blurb">Track allowance payments!!!</div>
                    </div>
                    <div className="about-chores">                        
                        <img className="profile-image" src="/images/laundry.png"/>
                        <div className="about-blurb">Keep track of chores</div>
                    </div>
                    <div className="about-dashboard">                        
                        <img className="profile-image" src="/images/dashboard.png"/>
                        <div className="about-blurb">Display info in Dashboard</div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Welcome;