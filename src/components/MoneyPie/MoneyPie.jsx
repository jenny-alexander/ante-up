import { React, useState } from 'react';
import { VictoryPie } from "victory-pie";
import '../MoneyPie/MoneyPie.scss' //change this to './MoneyPie.scss';

function MoneyPie(props) {

    const [data, setData] = useState([
        { x: "Spend", y: 130 },
        { x: "Save", y: 180 },
        { x: "Share", y: 70 },
    ]);

    return (
        <div className="money-pie">
            <div className="chart-title">
                My Money At-a-Glance
            </div>
            <VictoryPie className="victory-pie"
                //width="600"
                labels={({ datum }) => `${datum.x}: $${datum.y}`}
                //colorScale={["tomato", "gold", "cyan"]}
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