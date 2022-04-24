
import React, { useContext, useEffect, useState } from 'react';
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';
import { TailSpin } from  'react-loader-spinner'
import './BalanceToken.css'
import BalancePriceContext from '../BalancePriceContext/BalancePriceContext';
import tokens from '../../data/tokens.js'

export default function BalanceToken(props) {
    const {token} = props
    const {balancePrice} = useContext(BalancePriceContext);
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const tokenInfo = tokens.mainnet[token]
    const {status} = useWallet();
    


    useEffect(()=>{
        if(tokenInfo.token in balancePrice){
            if(balancePrice[tokenInfo.token].balance=='loading'){
                setLoaded(false)
            }else{
                setLoaded(true)
            }
            setAmount(balancePrice[tokenInfo.token].balance)
            setPrice(balancePrice[tokenInfo.token].price)
        }

    }, [balancePrice])

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