import {React, useContext, useEffect, useReducer, useState } from 'react';
import AssetToSwap from '../AssetToSwap/AssetToSwap'
import SwapContext from './SwapContext';
import tokens from '../../data/tokens.js'
import SwapMetrics from '../SwapMetrics/SwapMetrics'
import BalancePriceContext from '../BalancePriceContext/BalancePriceContext';
import SimulationExecutor from '../Executors/SimulationExecutor';
import { useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';

export default function SwapContainer() {
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const {balancePrice} = useContext(BalancePriceContext);
    const [loaded, setLoaded] = useState(true); 
    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();
    const {network} = useWallet();

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
        if(lcd){
            const prov = new SimulationExecutor(lcd)
            prov.simulate(swapValue, setSwapRates)
        }
    },[swapValue])

    return (
        <>
        <div className='swap-container-input'>
            <AssetToSwap token={swapValue.assetFrom.asset} asset={tokens[network.name][swapValue.assetFrom.asset].symbol} logo={tokens[network.name][swapValue.assetFrom.asset].icon}
                        owned={true} amount={swapValue.assetFrom.amount} onChange={(e)=>setSwapValue({amount: e.target.value, step:'amount'})}></AssetToSwap>
            <div className='arrow-container'>
                <div className='arrow-button' tabIndex={5} 
                    onClick={()=>{
                        setSwapValue({
                            assetFrom: swapValue.assetTo.asset,
                            assetTo:swapValue.assetFrom.asset,
                            step: 'amount',
                            price: swapRates.to
                        })
                    }}
                    onKeyUp = {(e) =>{
                        if (e.key === 'Enter') {
                            setSwapValue({
                                assetFrom: swapValue.assetTo.asset,
                                assetTo: swapValue.assetFrom.asset,
                                step: 'amount',
                                price: swapRates.to
                            })
                        }
                    }}>&rarr;</div>
            </div>
            <AssetToSwap token={swapValue.assetTo.asset} asset={tokens[network.name][swapValue.assetTo.asset].symbol} logo={tokens[network.name][swapValue.assetTo.asset].icon}
                        owned={false} amount={swapValue.assetFrom.amount*swapRates.from}></AssetToSwap>
            </div>
            <SwapMetrics fromSymbol={tokens[network.name][swapValue.assetFrom.asset].symbol} 
                        toSymbol={tokens[network.name][swapValue.assetTo.asset].symbol} 
                        swapRateFrom={swapRates.from} swapRateTo={swapRates.to}
                        priceAssetTo={prices.to} priceAssetFrom={prices.from} loaded={loaded} />
        </>
    )
}