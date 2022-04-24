
import React, { useContext, useEffect, useState } from 'react';
import {useWallet, useLCDClient, useConnectedWallet} from '@terra-money/wallet-provider';
import { TailSpin } from  'react-loader-spinner'
import './SwapMetrics.css'
import BalancePriceContext from '../BalancePriceContext/BalancePriceContext';
import tokens from '../../data/tokens.js'
import SwapContext from '../SwapContainer/SwapContext';
import { resourceUsage } from 'process';

export default function BalanceToken(props) {
    const {token} = props
    const {balancePrice} = useContext(BalancePriceContext);
    const tokenInfo = tokens.mainnet[token]
    const {status} = useWallet();
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const [loaded, setLoaded] = useState(true);
    const [priceAssetFrom, setPriceAssetFrom] = useState(null);
    const [priceAssetTo, setPriceAssetTo] = useState(null);
    const [swapRateFrom, setSwapRateFrom] = useState(null);
    const [swapRateTo, setSwapRateTo] = useState(null);
    const connectedWallet = useConnectedWallet();
    const lcd = useLCDClient();


    useEffect(()=>{
        const pool = swapValue.pool
        const assetFrom = swapValue.assetFrom.asset
        if(assetFrom in balancePrice){
            if(balancePrice[assetFrom].balance=='loading'){
                setLoaded(false)
            }else{
                setLoaded(true)
            }
            setPriceAssetFrom(balancePrice[assetFrom].price)
        }
        else{
            setPriceAssetFrom(null)
        }
        const assetTo= swapValue.assetTo.asset
        if(assetTo in balancePrice){
            if(balancePrice[assetTo].balance=='loading'){
                setLoaded(false)
            }else{
                setLoaded(true)
            }
            setPriceAssetTo(balancePrice[assetTo].price)
        }else{
            setPriceAssetTo(null)
        }
        if(connectedWallet){
            let query = ''
            if(['uluna','uusd'].includes(assetFrom)){
                query = {
                    "simulation": {
                        "offer_asset":{
                            "info":{
                                "native_token":{
                                    "denom":assetFrom}
                            },"amount":"1000000"},
                    "max_spread":"0.005","belief_price":"90"
                    }
                }
            }
            else{
                query = {
                    "simulation":{
                        "offer_asset":{
                            "amount":"1000000",
                            "info":{
                                "token":{
                                    "contract_addr": assetFrom
                                }
                            }
                        }
                    }
                }
            }
            lcd.wasm.contractQuery(pool,
                query)
                .then((res)=>{
                    console.log(res.return_amount)
                    setSwapRateFrom(Math.round((res.return_amount/1000000)*100)/100)
                }).catch(function (error) {
                    console.log(error);
                })
            if(['uluna','uusd'].includes(assetTo)){
                query = {
                    "simulation": {
                        "offer_asset":{
                            "info":{
                                "native_token":{
                                    "denom":assetTo}
                            },"amount":"1000000"},
                    "max_spread":"0.005","belief_price":"90"
                    }
                }
            }
            else{
                query = {
                    "simulation":{
                        "offer_asset":{
                            "amount":"1000000",
                            "info":{
                                "token":{
                                    "contract_addr": assetTo
                                }
                            }
                        }
                    }
                }
            }
            console.log(pool, query)
            lcd.wasm.contractQuery(pool,
                query)
                .then((res)=>{
                    console.log(res.return_amount)
                    setSwapRateTo(Math.round((res.return_amount/1000000)*100)/100)
                }).catch(function (error) {
                    console.log(error);
                })
        }
    }, [balancePrice])

    const fromSymbol = tokens.mainnet[swapValue.assetFrom.asset].symbol
    const toSymbol = tokens.mainnet[swapValue.assetTo.asset].symbol

    return (
        <div className='swaps-metrics-container'>
            {(loaded)&&
            <>
                <div className='swaps-metrics-eq-dist'>1 {fromSymbol} = ${Math.round(priceAssetFrom*100)/100}</div>
                <div className='swaps-metrics-swap-rate'>
                <div>1 {fromSymbol} → {swapRateFrom} {toSymbol} </div>
                <div>1 {toSymbol}  → {swapRateTo} {fromSymbol} </div>
                </div>
                <div className='swaps-metrics-eq-dist'>1 {toSymbol} =  ${Math.round(priceAssetTo*100)/100}</div>
            </>
            }
            {(!loaded)&&<TailSpin className="loading" height="30" width="30" color='#ffffff'ariaLabel='loading'/>}
        </div>
    )
}