import { React, useState } from 'react';
import AllowanceButton from '../Common/Button/AllowanceButton';
import './Allowance.scss';

function Allowance(props) {

    return (
        <div className="money">
            <div className='allowance-title'>This Week's Allowance</div>
                <table  className="allowance-table">
                    <thead className="allowance-head">
                        <tr>
                            <th>
                                Money Bucket
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Spend
                            </td>
                            <td>
                                50.00
                            </td>
                            <td>
                                <AllowanceButton/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Save
                            </td>
                            <td>
                                25.00
                            </td>
                            <td>
                            <AllowanceButton/>
                            </td>
                        </tr>
                    </tbody>
                </table>
         </div>
    )
}

export default Allowance;