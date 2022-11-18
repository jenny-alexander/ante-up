import React, { useEffect, useState } from 'react';
import { VictoryPie } from "victory-pie";
import { VictoryTooltip } from "victory-tooltip";
import './MoneyPie.scss' //change this to './MoneyPie.scss';
import * as Constants from '../../constants/index';

function MoneyPie(props) {

    useEffect(() => {
        console.log('in useEffect of MoneyPie');
        setPieData();
    },[props.bank])

    const [data, setData] = useState([]);

    const setPieData = () => {
        console.log('in setPieData and props are:', props.bank);        
        setData([           
            { x: "Spend", y: ( props.bank?.spend / props.bank?.total), z: Constants.dollarUS.format(props.bank?.spend) },
            { x: "Save", y: ( props.bank?.save / props.bank?.total ), z: Constants.dollarUS.format(props.bank?.save) },
            { x: "Share", y: ( props.bank?.share / props.bank?.total ), z: Constants.dollarUS.format(props.bank?.share) },     
        ])
    }

    return (
        <div className="pie">

            <div className="chart-title">
                My Money At-a-Glance
            </div>
            <VictoryPie className="victory-pie"
                labels={({ datum }) => `${datum.x}: ${datum.z}`}
                colorScale="qualitative"
                data={data}
                labelPlacement="vertical"
                labelComponent={
                    <VictoryTooltip 
                            flyoutStyle={{ stroke: "green", strokeWidth: 2 }} 
                            active 
                            pointerLength={30}
                    />}
                    style={{
                    labels: {
                        fontSize: 26
                    }
                }}
            />
        </div>
    )
}

export default MoneyPie;