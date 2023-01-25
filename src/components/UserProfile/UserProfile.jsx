import React, {useEffect} from 'react';
import './UserProfile.scss';

function UserProfile(props) {

    useEffect(() => {
        console.log('!!!! my props are:', props);
    },[])


    return (
        <div className={props.className}>
            Coming Soon...I'm the UserProfile component!
        </div>
    )
}

export default UserProfile;