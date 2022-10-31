import { React, useState } from 'react';
import './MoneyBucketManager.scss';
import * as Constants from '../../constants/index';

function MoneyBucketManager(props) {

    return (
        <div className="bucket-container">
            <div className="bucket-title">
                Money Bucket Manager
            </div>
            <div className="small-bucket">
                <div className="bucket spend">
                    <div className="spend-title">
                        Spend
                    </div>
                    <div className="spend-total">
                        {
                            props.money && props.money[0] ? `${Constants.dollarUS.format(props.money[0].spend_total)}` : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button">+</button>
                        <button className="deposit-button">-</button>
                    </div>
                </div>
                <div className="bucket share">
                    <div className="spend-title">
                        Share
                    </div>
                    <div className="spend-total">
                    {
                            props.money && props.money[0] ? `${Constants.dollarUS.format(props.money[0].share_total)}` : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button">+</button>
                        <button className="deposit-button">-</button>
                    </div>
                </div>
                <div className="bucket share">
                    <div className="spend-title">
                        Save
                    </div>
                    <div className="spend-total">
                    {
                            props.money && props.money[0] ? `${Constants.dollarUS.format(props.money[0].save_total)}` : ''
                        }
                    </div>
                    <div className="buttons">
                        <button className="deposit-button">+</button>
                        <button className="deposit-button">-</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MoneyBucketManager;