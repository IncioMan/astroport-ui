import React, { useEffect , useRef, useState, useContext, useReducer} from 'react';
import BalancePriceContext from './BalancePriceContext';
import SwapContext from '../SwapContainer/SwapContext';
import { useConnectedWallet, useLCDClient, useWallet, WalletStatus} from '@terra-money/wallet-provider';
const axios = require('axios').default;
import tokens from '../../data/tokens.js'

function setBalancePriceReducer(state, value) {
    if(!value){
        return state
    }
    const newState = {};
    Object.assign(newState, state);
    for(let token of Object.keys(value)){
        if(!Object.keys(newState).includes(token)){
            newState[token] = {}
        }
        if("balance" in value[token]){
            newState[token].balance = value[token].balance
        }
        if("price" in value[token]){
            newState[token].price = value[token].price
        }
    }
    return newState
}


export default function BalancePrice(props) {
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();
    const {status} = useWallet();
    const [BalancePrice, setBalancePrice] = useReducer(setBalancePriceReducer, {});
    
    useEffect(() => {
        const tokensToFetch = [swapValue.assetFrom.asset, swapValue.assetTo.asset,
            'terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m',
            'terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn',
            'terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n']
        for (let token of tokensToFetch) {
            if(!connectedWallet){
                const value = {}
                value[token] = {price: null, balance: null}
                setBalancePrice(value)
                continue
            }
            const tokenInfo = tokens.mainnet[token]
            const value = {}
            value[token] = {price:'loading', balance:'loading'}
            setBalancePrice(value)
            axios.get('https://api.extraterrestrial.money/v1/api/prices?symbol='+tokenInfo.symbol)
            .then(function (response) {
                if(tokenInfo.symbol  in response.data.prices){
                    const value = {}
                    value[token] = {price: response.data.prices[tokenInfo.symbol].price}
                    setBalancePrice(value)
                }else{
                    const value = {}
                    value[token] = {price: null}
                    setBalancePrice(value)
                }
            })
            .catch(function (error) {
                console.log(error);
                const value = {}
                value[token] = {price: null}
                setBalancePrice(value)
            })
            .then(function () {
                // always executed
            });
            if(['uusd','uluna'].includes(token)){
                lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                    let value = {}
                    value[token] = {}
                    if(token in coins['_coins']){
                        value[token].balance = coins['_coins'][token].amount/1000000
                    }
                    else{
                        value[token].balance = 0
                    }
                    setBalancePrice(value)
                }).catch(function (error) {
                    console.log(error);
                    const value = {}
                    value[token] = {balance: null}
                    setBalancePrice(value)
                })
            }
            else{
                lcd.wasm.contractQuery(token,
                    {"balance":
                        {"address":connectedWallet.walletAddress}
                    })
                    .then((res)=>{
                        const value = {}
                        value[token] = {}
                        value[token].balance = res.balance/1000000
                        setBalancePrice(value)
                    }).catch(function (error) {
                        console.log(error);
                        const value = {}
                        value[token] = {balance: null}
                        setBalancePrice(value)
                    })
            }
        }
      }, [connectedWallet, lcd, swapValue]);

    return (
        <></>
    )
}