import { React, useState } from 'react';
import '../MoneyBucketManager/MoneyBucketManager.scss';

function MoneyBucketManager(props) {

    // TODO: Add entry in tailwindcss config file for '+' and '-' button css.
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
                        $130.00
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
                        $70.00
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
                        $180.00
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