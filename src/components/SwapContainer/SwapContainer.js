import React, { useContext } from 'react';
import AssetToSwap from '../AssetToSwap/AssetToSwap'
import SwapContext from './SwapContext';
import tokens from '../../data/tokens.js'



export default function SwapContainer() {
    const {swapValue, setSwapValue} = useContext(SwapContext);
    return (
        <div className='swap-container-input'>
        <AssetToSwap asset={tokens.mainnet[swapValue.assetFrom.asset].symbol} logo={tokens.mainnet[swapValue.assetFrom.asset].icon}
                    owned={true} amount={swapValue.assetFrom.amount} onChange={(e)=>setSwapValue([null, null, e.target.value])}></AssetToSwap>
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
        <AssetToSwap asset={tokens.mainnet[swapValue.assetTo.asset].symbol} logo={tokens.mainnet[swapValue.assetTo.asset].icon}
                    owned={false} amount={Math.round(swapValue.assetFrom.amount*0.13*100)/100}></AssetToSwap>
        </div>
    )
}