import React, { useContext, useEffect, useState } from 'react';
import AssetToSwap from '../AssetToSwap/AssetToSwap'
import SwapContext from './SwapContext';
import tokens from '../../data/tokens.js'
import { useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';




export default function SwapContainer() {
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const [amountOwned, setAmountOwned] = useState(0);
    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();
    const {
        status,
        connect,
      } = useWallet();

    useEffect(()=>{
        const token = swapValue.assetFrom.asset
        if(connectedWallet && status===WalletStatus.WALLET_CONNECTED){
            if (['uusd','uluna'].includes(token)) {
                lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                    if(token in coins['_coins']){
                        setAmountOwned(Math.round(coins['_coins'][token].amount/1000000*100)/100)
                    }
                    else{
                        setAmountOwned(0)
                    }
                });
            } else {
                if(connectedWallet&&status===WalletStatus.WALLET_CONNECTED){
                lcd.wasm.contractQuery(token,
                            {"balance":
                                {"address":"terra12j6p3tausehd7495as98vql74p0f9t2ahnafsv"}
                            })
                            .then((res)=>{
                                setAmountOwned(Math.round(res.balance/1000000*100)/100)
                            }).catch(()=>setAmountOwned(0))
            }}
        }else{setAmountOwned(0)}
    },[connectedWallet, lcd,swapValue]);

    return (
        <div className='swap-container-input'>
        <AssetToSwap asset={tokens.mainnet[swapValue.assetFrom.asset].symbol} logo={tokens.mainnet[swapValue.assetFrom.asset].icon}
                    owned={true} amount={swapValue.assetFrom.amount} amountOwned={amountOwned} onChange={(e)=>setSwapValue({amount: e.target.value, step:'amount'})}></AssetToSwap>
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