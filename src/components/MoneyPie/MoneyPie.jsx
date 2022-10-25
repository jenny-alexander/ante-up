import React, { useEffect, useState } from 'react';
import { VictoryPie } from "victory-pie";
import './MoneyPie.scss' //change this to './MoneyPie.scss';

function MoneyPie(props) {

    // useEffect(() => {
    //     console.log('MoneyPie useEffect!!!');
    // },[props.money])

    const [data, setData] = useState([
        { x: "Spend", y: props.money.spend_total },
        { x: "Save", y: props.money.save_total },
        { x: "Share", y: props.money.share_total },        
    ]);

    return (
        <div className="money-pie">
            <div className="chart-title">
                My Money At-a-Glance
            </div>
            <VictoryPie className="victory-pie"
                //width="600"
                labels={({ datum }) => `${datum.x}: $${datum.y}`}
                colorScale={["#006a4e","#00cc99","#a3c1ad"]}
                data={data}
                style={{
                    labels: {
                        fontSize: 20
                    }
                }}
            />
        </div>
    )
}

export default MoneyPie;