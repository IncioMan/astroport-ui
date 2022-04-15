
import React, { useContext, useEffect, useState } from 'react';
import { TailSpin } from  'react-loader-spinner'
import './BalanceToken.css'
import tokens from '../../data/tokens.js'
const axios = require('axios').default;

export default function BalanceToken(props) {
    const {token} = props
    const [price, setPrice] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const tokenInfo = tokens.mainnet[token]

    useEffect(()=>{
        axios.get('https://api.extraterrestrial.money/v1/api/prices?symbol='+tokenInfo.symbol)
        .then(function (response) {
            if(tokenInfo.symbol  in response.data.prices){
                setPrice(response.data.prices[tokenInfo.symbol].price)
            }
            // handle success
            //setPairs(response.data.map((p)=>p["POOL_ADDRESS"]).filter(p=>Object.keys(pools.mainnet).includes(p)).slice(0,5))
            setTimeout(()=>setLoaded(true),5000)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    })

    const amount = Math.floor(Math.random() * 1000)

    return (
            <div className='balance-container'>
                <div className='balance-asset-container'>
                    <img className='balance-logo' src={tokenInfo.icon} width="30" height="30" alt="Italian Trulli"></img>
                    <div className='balance-asset'>{tokenInfo.symbol}</div>
                </div>
                {(!loaded) && <div className='balance-loading-container'>
                    <TailSpin className="loading" height="20" width="20" color='#ffffff'ariaLabel='loading'/>
                </div>
                }
                {(loaded)&&
                <>
                    <div className='balance-amount'>{amount}</div>
                    <div className='balance-amount'>{Math.round(price*amount*100)/100}$</div>
                </>}
            </div>
    )
}