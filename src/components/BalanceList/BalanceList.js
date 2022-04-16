import React from 'react';
import BalanceToken from '../BalanceToken/BalanceToken'
import './BalanceList.css'
const axios = require('axios').default;

export default function BalanceList(props) {
    const {title, tokens} = props

    return (
        <div className='balance-list-outer'>
            <p>{title}</p>
            {
                tokens.map((token) => {
                return <BalanceToken 
                        key={token.name}
                        token={token.name}
                        native={token.native}
                        ></BalanceToken>
                })
            }
        </div>
    )
}