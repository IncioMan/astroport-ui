
import React from 'react';
import { TailSpin } from  'react-loader-spinner'
import './SwapMetrics.css'

export default function SwapMetrics(props) {
    const {fromSymbol,toSymbol,swapRateFrom, swapRateTo,
          priceAssetTo, priceAssetFrom, loaded} = props

    return (
        <div className='swaps-metrics-container'>
            {(loaded)&&
            <>
                <div className='swaps-metrics-eq-dist'>1 {fromSymbol} = ${Math.round(priceAssetFrom*100)/100}</div>
                <div className='swaps-metrics-swap-rate'>
                <div>1 {fromSymbol} → {Math.round(swapRateFrom*10000)/10000} {toSymbol} </div>
                <div>1 {toSymbol}  → {Math.round(swapRateTo*10000)/10000} {fromSymbol} </div>
                </div>
                <div className='swaps-metrics-eq-dist'>1 {toSymbol} =  ${Math.round(priceAssetTo*100)/100}</div>
            </>
            }
            {(!loaded)&&<TailSpin className="loading" height="30" width="30" color='#ffffff'ariaLabel='loading'/>}
        </div>
    )
}