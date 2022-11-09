import { React, useState, useEffect } from 'react';
import './MoneyBucketManager.scss';
import * as Constants from '../../constants/index';
import Modal from '../Common/Modal/Modal';

function MoneyBucketManager(props) {
    const[showModal, setShowModal] = useState(false);

    const closeModal = () => {
        console.log('in closeModal')
        setShowModal(false);
    }

    useEffect(() => {
        console.log('bank props are:', props.bank)
    },[props.bank]);

    return (
        <div className="bucket-container">
            <Modal title='Testing'
                   show={showModal}
                   close={closeModal}
            />  

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
                            props.bank && props.bank[0] ? `${Constants.dollarUS.format(props.bank[0].spend)}` : ''
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
                            props.bank && props.bank[0] ? `${Constants.dollarUS.format(props.bank[0].share)}` : ''
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
                            props.bank && props.bank[0] ? `${Constants.dollarUS.format(props.bank[0].save)}` : ''
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