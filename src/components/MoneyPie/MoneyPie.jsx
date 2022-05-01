import { React, useState } from 'react';
import { VictoryPie } from "victory-pie";

function MoneyPie(props) {

    const [data, setData] = useState([
        { x: "Spend", y: 130 },
        { x: "Save", y: 180 },
        { x: "Share", y: 70 },
    ]);

    return (
        <div className="money-pie">
            <div className="chart-title font-bold text-xl text-center pb-4">
                My Money At-a-Glance
            </div>
            <VictoryPie
                width="700"
                labels={({ datum }) => `${datum.x}: $${datum.y}`}
                colorScale={["tomato", "gold", "cyan"]}
                data={data}
                style={{
                    labels: {
                        fontSize: 18
                    }
                }
                }
            />
        </div>
    )
}

export default MoneyPie;