import React, { useEffect, useState } from 'react';
import { VictoryPie } from "victory-pie";
import { VictoryTooltip } from "victory-tooltip";
import './MoneyPie.scss';
import * as Constants from '../../../constants/index';

function MoneyPie(props) {
    const [data, setData] = useState([]);    
    useEffect(() => {      
        setPieData();
    },[props.bank])

    const setPieData = () => {        
        let array = [];
        if ( props.bank?.spend > 0) {
            const spendInfo =             { 
                x: "Spend", 
                y: ( props.bank?.spend / props.bank?.total), 
                z: Constants.dollarUS.format(props.bank?.spend) 
            }
            array.push(spendInfo);
        }
        if ( props.bank?.save > 0) {
            const saveInfo =             { 
                x: "Save", 
                y: ( props.bank?.save / props.bank?.total), 
                z: Constants.dollarUS.format(props.bank?.save) 
            }
            array.push(saveInfo);
        }
        if ( props.bank?.share > 0) {
            const shareInfo =             { 
                x: "Share", 
                y: ( props.bank?.share / props.bank?.total), 
                z: Constants.dollarUS.format(props.bank?.share) 
            }
            array.push(shareInfo);
        }
        if (array.length > 0) {            
            setData(array);
        }
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