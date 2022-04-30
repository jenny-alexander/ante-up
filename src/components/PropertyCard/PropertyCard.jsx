import { React } from 'react';

function PropertyCard(props) {

    //check prop that will pass either 'allowance', 'chores', or 'settings'
    const onCardClick = () => {
        console.log('in onClick of PropertyCard!');
        console.log('cardProps as param are:', props);
    }
    return (
        <div>

            {/* <button onClick={((event) => onCardClick(event))}> */}
            <button >
                <div>
                    {props.cardProps.icon}
                </div>
                <div>
                    <p className="text-center">{props.cardProps.text}</p>
                </div>
            </button>
        </div>
    )
}

export default PropertyCard;