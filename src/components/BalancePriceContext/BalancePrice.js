import React, { useEffect , useRef, useState, useContext, useReducer} from 'react';
import BalancePriceContext from './BalancePriceContext';
import SwapContext from '../SwapContainer/SwapContext';
import { useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';
const axios = require('axios').default;
import tokens from '../../data/tokens.js'

function setBalancesReducer(state, value) {
    if(!value){
        return state
    }
    const newState = {};
    Object.assign(newState, state);
    for(let token of Object.keys(value)){
        newState[token] = value[token]
    }
    return newState
}

function setPricesReducer(state, value) {
    if(!value){
        return state
    }
    const newState = {};
    Object.assign(newState, state);
    for(let token of Object.keys(value)){
        newState[token] = value[token]
    }
    return newState
}

export default function BalancePrice(props) {
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();
    const {status} = useWallet();
    const [balances, setBalances] = useReducer(setBalancesReducer, {});
    const [prices, setPrices] = useReducer(setPricesReducer, {});
    
    useEffect(() => {
        if(!connectedWallet){
            return []
        }
        const tokensToFetch = [swapValue.assetFrom.asset, swapValue.assetTo.asset,
            'terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m',
            'terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn',
            'terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n']
        for (let token of tokensToFetch) {
            const tokenInfo = tokens.mainnet[token]
            axios.get('https://api.extraterrestrial.money/v1/api/prices?symbol='+tokenInfo.symbol)
            .then(function (response) {
                if(tokenInfo.symbol  in response.data.prices){
                    const value = {}
                    value[token] = response.data.prices[tokenInfo.symbol].price
                    setPrices(value)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
            if(['uusd','uluna'].includes(token)){
                lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                    let value = {}
                    if(token in coins['_coins']){
                        value[token]= coins['_coins'][token].amount/1000000
                    }
                    else{
                        value[token] = 0
                    }
                    setBalances(value)
                })
            }
            else{
                lcd.wasm.contractQuery(token,
                    {"balance":
                        {"address":connectedWallet.walletAddress}
                    })
                    .then((res)=>{
                        const value = {}
                        value[token] = res.balance/1000000
                        setBalances(value)
                    })
            }
        }
      }, [connectedWallet, lcd, swapValue]);

    return (
        <></>
    )
}