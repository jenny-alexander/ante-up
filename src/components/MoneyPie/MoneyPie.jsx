import React, { useEffect, useState } from 'react';
import { VictoryPie } from "victory-pie";
import { VictoryTooltip } from "victory-tooltip";
import './MoneyPie.scss' //change this to './MoneyPie.scss';
import * as Constants from '../../constants/index';

function MoneyPie(props) {

    useEffect(() => {
        setPieData();
    },[props.money])

    const [data, setData] = useState([]);

    const setPieData = () => {
        console.log('in setPieData');
        setData([           
            { x: "Spend", y: Constants.dollarUS.format(props.money[0]?.spend_total) },
            { x: "Save", y: Constants.dollarUS.format(props.money[0]?.save_total) },
            { x: "Share", y: Constants.dollarUS.format(props.money[0]?.share_total) },        
        ])
    }

    return (
        <div className="pie">
            <div className="chart-title">
                My Money At-a-Glance
            </div>
            <VictoryPie className="victory-pie"
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                //colorScale={["#006a4e","#00cc99","#a3c1ad"]}
                colorScale="qualitative"
                // radius={140}
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
                        fontSize: 24
                    }
                }}
            />
            
        </div>
    )
}

export default MoneyPie;