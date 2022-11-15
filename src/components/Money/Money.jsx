import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';

import './Money.scss';

function Money(props) {
    const dispatch = useDispatch();
    const allowance = useSelector((store) => store.allowance);
    // const bank = useSelector((store) => store.bank.bank );
    const bank = useSelector((store) => store.bank );
    const user = useSelector((store) => store.user);
    //const[showModal, setShowModal] = useState(false);

    useEffect(()=> {
        console.log('in Money useEffect');
        dispatch( { type: 'FETCH_ALLOWANCE', payload: user.id} );
        dispatch( { type: 'FETCH_LATEST_ALLOWANCE', payload: user.id });
        //dispatch( { type: 'FETCH_BANK', payload: user.id })
         dispatch( {type: "GET_BANK_REQUESTED", payload: user.id})
    },[])

    // const closeModal = () => {
    //     console.log('closing modal');
    //     setShowModal(false);
    // }

    // const openModal = () => {
    //     setShowModal(!showModal);
    // }

    return (
        <div className="money">
            {/* <button onClick={ addModal } className="btn btn-primary-m4">Open modal</button> */}
            {/* <button onClick={openModal}>Toggle modal</button> */}
            {/* <Modal title='Testing'
                   show={showModal}
                   close={() => {closeModal()}}
            />      */}
            <div className="money-allowance">
                {/* <Allowance /> */}
                <Card component={<Allowance allowance={allowance}
                                            bank={bank}
                                            // bankError={bank.error} 
                                            // depositSucess={bank.depositSucess}
                                            />} />
            </div>

            <div className="money-bank-chart">
                <Card component={<MoneyPie bank={bank.bank}/>} />
            </div>

            <div className="money-bank">
                <Card component={<MoneyBucketManager bank={bank.bank} />} />
            </div> 
        </div >
    )
}

export default Money;