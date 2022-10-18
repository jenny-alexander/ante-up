import { React } from 'react';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';
import '../Money/Money.scss'; //change this to './Money.scss';

function Money(props) {

    return (
        <div className="money">
            <div className="money-allowance">
                {/* <Allowance /> */}
                <Card component={<Allowance />} />
            </div>

             <div className="money-chart">
                <Card component={<MoneyPie />} />
            </div>

            <div className="money-bank">
                <Card component={<MoneyBucketManager />} />
            </div> 
        </div >
    )
}

export default Money;