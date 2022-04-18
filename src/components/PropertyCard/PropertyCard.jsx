import reactRouterDom from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/solid';

function PropertyCard(props) {
    console.log(props)

    return (
        <div>
            <div>
                {props.cardProps.icon}
            </div>
            <div>
                <p className="text-center">{props.cardProps.text}</p>
            </div>
        </div>
    )
}

export default PropertyCard;