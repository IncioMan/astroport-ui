import SwapSuggestionsContainer from '../SwapSuggestionsContainer/SwapSuggestionsContainer';
import SwapContainer from '../SwapContainer/SwapContainer';
import PairDropdown from '../PairDropdown/PairDropdown';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import SwapContext from '../SwapContainer/SwapContext';
import './AstroApp.css';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import {useConnectedWallet, useLCDClient, useWallet, WalletStatus } from '@terra-money/wallet-provider';
import SwapExecutor from '../Executors/SwapExecutor.js';
import BalancePriceContext from '../BalancePriceContext/BalancePriceContext';
import NotificationsContainer from '../NotificationsContainer/NotificationsContainer';
const axios = require('axios').default;
import tokens from '../../data/tokens.js'
import Dialog from 'react-dialog'
import SimulationExecutor from '../Executors/SimulationExecutor';

const suggestions = [
    {title:'MOST POPULAR',
     url: 'https://api.flipsidecrypto.com/api/v2/queries/fccaf886-c92d-4202-bfb5-3ff804e9c383/data/latest'},
    {title:'TRENDING',
     url: 'https://api.flipsidecrypto.com/api/v2/queries/786bfe99-df83-4285-adb0-834db5101b0e/data/latest'},
]


const swapValueInit = {
    assetFrom: {asset:'uusd',amount:0,amountOwned:0},
    assetTo: {asset:'uluna', price: 1},
    pool: 'terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552',
    step : 'pair'
}


function swapValueReducer(state, value) {
    console.log(value)
    var assetFrom =  value.assetFrom
    var assetTo = value.assetTo
    var amount =  value.amount
    var pool =  value.pool
    var step =  value.step
    var price =  value.price
    var newValue = {
        assetFrom: {asset: (assetFrom ? assetFrom : state.assetFrom.asset),
                    amount: (amount? amount : state.assetFrom.amount),
                    price: (price? price : state.assetTo.price)},
        assetTo: {asset: (assetTo ? assetTo : state.assetTo.asset)},
        pool: (pool ? pool : state.pool),
        step: (step ? step : state.step)
    }
    return newValue
}

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

function setNotificationsReducer(state, value) {
  if(!value){
      return state
  }
  const newState = [...value]
  return newState
}


function AstroApp() {
  const [balancePrice, setBalancePrice] = useReducer(setBalancePriceReducer, {});
  const [swapValue, setSwapValue] = useReducer(swapValueReducer, swapValueInit);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifications, setNotifications] = useReducer(setNotificationsReducer,[]);
  const [basePrice, setBasePrice] = useState(0);
  const swapRef = useRef();
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  useEffect(()=>{
    const simulation = new SimulationExecutor(lcd)
    simulation.simulateBasePrice(swapValue, network, setBasePrice)
    if(swapValue.step === 'swap'){
        swapRef.current.focus()
    }
    setErrorMessage(null)
  },[swapValue])

  useEffect(() => {
    const tokensToFetch = [swapValue.assetFrom.asset, swapValue.assetTo.asset]
    for (let token of tokensToFetch) {
        if(!connectedWallet){
            const value = {}
            value[token] = {price: null, balance: null}
            setBalancePrice(value)
            continue
        }
        const tokenInfo = tokens[network.name][token]
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

  const {
    status,
    network,
    availableConnectTypes,
    connect,
  } = useWallet();

  useEffect(()=>{
    if(network&&network.name=='testnet'){setSwapValue({
        assetFrom: 'terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5',
        assetTo:'uusd',
        pool: 'terra1ec0fnjk2u6mms05xyyrte44jfdgdaqnx0upesr'
    })}
    else{setSwapValue({
        assetFrom:'uusd',
        assetTo:'uluna',
        pool: 'terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552'
    })}
  },[network])

  const handleClose = () => setDialogOpen(false)
  const swapExecutor = new SwapExecutor(network, connectedWallet)

  return (
    <div className='App'>
      <SwapContext.Provider value={{swapValue, setSwapValue}}>
        <BalancePriceContext.Provider value={{balancePrice, setBalancePrice}}>
        <div className='App-header'>
            <SwapSuggestionsContainer suggestions={suggestions}/>
            <ProfileContainer tokens={[{name:'uluna', native:true},
                                       {name:'uusd', native:true}]}/>
            <div className='asset-selection-container-outer'>
                <div className='asset-selection-container-inner'>
                    <PairDropdown/>
                    <SwapContainer/>
                    {status !== WalletStatus.WALLET_CONNECTED && (
                      <button ref={swapRef} tabIndex="4" 
                      className='swap-button' type="button"
                      onClick={() => {
                        if(availableConnectTypes.includes('EXTENSION')){
                            connect('EXTENSION')
                        }else{
                            setDialogOpen(true)
                        }
                      }}
                      >Connect Wallet</button>)}
                    {status === WalletStatus.WALLET_CONNECTED && (
                      <button ref={swapRef} tabIndex="4" 
                      className='swap-button' type="button"
                      onClick={() => swapExecutor.executeSwap(swapValue, basePrice, setNotifications, notifications)}>SWAP</button>)}
                    <div className='error-message-container'>
                      <div className='error-message'>{errorMessage}</div>
                    </div>
                    <NotificationsContainer notifications={notifications}
                                            setNotifications={setNotifications}/>
                </div>
            </div>
        </div>
        </BalancePriceContext.Provider>
      </SwapContext.Provider>
      {isDialogOpen &&
      <Dialog
          modal={true}
          height={224}>
          <button className='close-dialog-button'autoFocus={true} onClick={()=>handleClose()}>&#10005;</button>
          <div>
            <p>This feature will come soon.</p>
            <p> This version of the app is just a proof of concept.</p>
            <p>In the meantime, let me know what you think of it.</p>
            <p>You can also follow me for future developments.</p>
            <a target="_blank" href={'https://twitter.com/IncioMan/status/1518587159342575616?s=20&t=j1h23slr6Pli3pi32DU92Q'}>
            <img src="https://raw.githubusercontent.com/IncioMan/mars_lockdrop/master//images/twitter.png"
                className='twitter-logo'
                width={50}/>
            </a>
          </div>
      </Dialog>}
    </div>
  );
}

export default AstroApp;
