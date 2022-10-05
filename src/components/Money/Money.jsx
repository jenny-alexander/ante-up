import { React } from 'react';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';
function Money(props) {

    return (
        <div className="flex flex-col">
            <div className="money-allowance">
                <Allowance />
            </div>

            {/* <div className="money-chart">
                <Card component={<MoneyPie />} />
            </div>

            <div className="money-bank">
                <Card component={<MoneyBucketManager />} />
            </div> */}
        </div >
    )
}

export default Money;