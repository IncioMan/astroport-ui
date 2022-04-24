import React, { useContext, useEffect, useReducer, useState } from 'react';
import AssetToSwap from '../AssetToSwap/AssetToSwap'
import SwapContext from './SwapContext';
import tokens from '../../data/tokens.js'
import SwapMetrics from '../SwapMetrics/SwapMetrics'
import BalancePriceContext from '../BalancePriceContext/BalancePriceContext';
import { useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';

export default function SwapContainer() {
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const {balancePrice} = useContext(BalancePriceContext);
    const [loaded, setLoaded] = useState(true); 
    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();

    function swapRatesReducer(state, value) {
        if(!value){
            return state
        }
        var newValue = {
            from: value.from ? value.from : state.from,
            to: value.to ? value.to : state.to
        }
        return newValue
    }
    function setPriceReducer(state, value) {
        if(!value){
            return state
        }
        var newValue = {
            from: value.from ? value.from : state.from,
            to: value.to ? value.to : state.to
        }
        return newValue
    }

    const [swapRates, setSwapRates] = useReducer(swapRatesReducer, {from: null, to: null});
    const [prices, setPrice] = useReducer(setPriceReducer, {from: null, to: null});

    useEffect(()=>{
        const pool = swapValue.pool
        const assetFrom = swapValue.assetFrom.asset
        const assetTo= swapValue.assetTo.asset
        if(assetFrom in balancePrice && connectedWallet){
            if(balancePrice[assetFrom].balance=='loading'){
                setLoaded(false)
            }else{
                setLoaded(true)
            }
            setPrice({from:balancePrice[assetFrom].price})
        }
        else{
            setPrice({from:null})
        }
        if(assetTo in balancePrice && connectedWallet){
            if(balancePrice[assetTo].balance=='loading'){
                setLoaded(false)
            }else{
                setLoaded(true)
            }
            setPrice({to:balancePrice[assetTo].price})
        }else{
            setPrice({to:null})
        }
    }, [swapValue, balancePrice])

    useEffect(()=>{
        if(connectedWallet){
            const pool = swapValue.pool
            const assetFrom = swapValue.assetFrom.asset
            const assetTo= swapValue.assetTo.asset
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
                    setSwapRates({from:Math.round((res.return_amount/1000000)*100)/100})
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
                    setSwapRates({to:Math.round((res.return_amount/1000000)*100)/100})
                }).catch(function (error) {
                    console.log(error);
                })
        }
    },[swapValue])

    return (
        <>
        <div className='swap-container-input'>
        <AssetToSwap token={swapValue.assetFrom.asset} asset={tokens.mainnet[swapValue.assetFrom.asset].symbol} logo={tokens.mainnet[swapValue.assetFrom.asset].icon}
                    owned={true} amount={swapValue.assetFrom.amount} onChange={(e)=>setSwapValue({amount: e.target.value, step:'amount'})}></AssetToSwap>
        <div className='arrow-container'>
            <div className='arrow-button' tabIndex={5} 
                onClick={()=>{
                    setSwapValue({
                        assetFrom: swapValue.assetTo.asset,
                        assetTo:swapValue.assetFrom.asset,
                        step: 'amount'
                    })
                }}
                onKeyUp = {(e) =>{
                    if (e.key === 'Enter') {
                        setSwapValue({
                            assetFrom: swapValue.assetTo.asset,
                            assetTo: swapValue.assetFrom.asset,
                            step: 'amount'
                        })
                    }
                }}>&rarr;</div>
        </div>
        <AssetToSwap token={swapValue.assetTo.asset} asset={tokens.mainnet[swapValue.assetTo.asset].symbol} logo={tokens.mainnet[swapValue.assetTo.asset].icon}
                    owned={false} amount={Math.round(swapValue.assetFrom.amount*swapRates.from*100)/100}></AssetToSwap>
        </div>
        <SwapMetrics fromSymbol={tokens.mainnet[swapValue.assetFrom.asset].symbol} 
                     toSymbol={tokens.mainnet[swapValue.assetTo.asset].symbol} 
                     swapRateFrom={swapRates.from} swapRateTo={swapRates.to}
                     priceAssetTo={prices.to} priceAssetFrom={prices.to} loaded={loaded} />
        </>
    )
}