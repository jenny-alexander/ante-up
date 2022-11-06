import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyPie from '../MoneyPie/MoneyPie';
import MoneyBucketManager from '../MoneyBucketManager/MoneyBucketManager';
import Allowance from '../Allowance/Allowance';
import Card from '../Common/Card/Card';

import './Money.scss';

function Money(props) {
    const dispatch = useDispatch();
    const money = useSelector((store) => store.money);
    const user = useSelector((store) => store.user);
    //const[showModal, setShowModal] = useState(false);

    useEffect(()=> {
        console.log('in Money useEffect');
        dispatch( { type: 'FETCH_MONEY', payload: user.id} );
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
                <Card component={<Allowance money={money[0]} />} />
            </div>

            <div className="money-chart">
                <Card component={<MoneyPie money={money}/>} />
            </div>

            <div className="money-bank">
                <Card component={<MoneyBucketManager money={money} />} />
            </div> 
        </div >
    )
}

export default Money;