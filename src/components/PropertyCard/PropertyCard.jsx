import reactRouterDom from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/solid';

function PropertyCard(props) {

    return (
        <button>
            <div>
                {props.cardProps.icon}
            </div>
            <div>
                <p className="text-center">{props.cardProps.text}</p>
            </div>
        </button>
    )
}

export default PropertyCard;