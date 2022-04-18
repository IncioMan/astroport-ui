
import React, { useContext, useEffect, useState } from 'react';
import { useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';
import { TailSpin } from  'react-loader-spinner'
import './BalanceToken.css'
import tokens from '../../data/tokens.js'
const axios = require('axios').default;

export default function BalanceToken(props) {
    const {token, native} = props
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const tokenInfo = tokens.mainnet[token]

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();

    const {status} = useWallet();
    
    useEffect(() => {
        if (native) {
            if(connectedWallet){
                setLoaded(false)
                lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                    if(token in coins['_coins']){
                        setAmount(coins['_coins'][token].amount/1000000)
                        setLoaded(true)
                    }
                    else{
                        setAmount(0)
                        setLoaded(true)
                    }
                });
        }} else {
            if(connectedWallet){
            lcd.wasm.contractQuery(token,
                        {"balance":
                            {"address":connectedWallet.walletAddress}
                        })
                        .then((res)=>{
                            setAmount(res.balance)
                        })
        }}
      }, [connectedWallet, lcd]);

    useEffect(()=>{
        axios.get('https://api.extraterrestrial.money/v1/api/prices?symbol='+tokenInfo.symbol)
        .then(function (response) {
            if(tokenInfo.symbol  in response.data.prices){
                setPrice(response.data.prices[tokenInfo.symbol].price)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    })

    useEffect(()=>{
        if(status!==WalletStatus.WALLET_CONNECTED){
            setAmount(null)
        }
    }, [status])


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
                {(loaded&&price&&status==WalletStatus.WALLET_CONNECTED)&&
                <>
                    <div className='balance-amount'>{Math.round(amount*100)/100}</div>
                    <div className='balance-amount'>{
                        price*amount <= 1000?Math.round(price*amount*100)/100:Math.round((price*amount/1000)*100)/100+'k'}$
                    </div>
                </>}
                {(loaded&&!price&&status==WalletStatus.WALLET_CONNECTED)&&
                <>
                    <div className='balance-amount'>{Math.round(amount*100)/100}</div>
                    <div className='balance-amount'>-</div>
                </>}
                {(status!==WalletStatus.WALLET_CONNECTED)&&
                <>
                    <div className='balance-amount'>-</div>
                    <div className='balance-amount'>-</div>
                </>}
            </div>
    )
}