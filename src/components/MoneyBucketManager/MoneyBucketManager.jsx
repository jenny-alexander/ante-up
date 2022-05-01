import { React, useState } from 'react';

function MoneyBucketManager(props) {

    const [data, setData] = useState([
        { x: "Spend", y: 130 },
        { x: "Save", y: 180 },
        { x: "Share", y: 70 },
    ]);

    const [label, setLabel] = useState(false);

    return (
        <div className="money-bucket">
            <div className="bucket-title font-bold text-xl text-center pb-4">
                Money Bucket Manager
            </div>
            I'm the Money Bucket Manager Component!
        </div>
    )
}

export default MoneyBucketManager;