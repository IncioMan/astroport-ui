import SwapSuggestionsContainer from '../SwapSuggestionsContainer/SwapSuggestionsContainer';
import SwapContainer from '../SwapContainer/SwapContainer';
import PairDropdown from '../PairDropdown/PairDropdown';
import SwapContext from '../SwapContainer/SwapContext';
import './App.css';
import React, { useEffect, useReducer, useRef } from 'react';

const suggestions = [
    {title:'MOST POPULAR',
     url: 'https://api.flipsidecrypto.com/api/v2/queries/fccaf886-c92d-4202-bfb5-3ff804e9c383/data/latest'},
    {title:'TRENDING',
     url: 'https://api.flipsidecrypto.com/api/v2/queries/786bfe99-df83-4285-adb0-834db5101b0e/data/latest'},
]

const swapValueInit = {
    assetFrom: {asset:'uusd',amount:0},
    assetTo: {asset:'uluna'},
    step : 'pair'
}


function swapValueReducer(state, value) {
    var assetFrom =  value.assetFrom
    var assetTo = value.assetTo
    var amount =  value.amount
    var step =  value.step
    var newValue = {
        assetFrom: {asset: (assetFrom ? assetFrom : state.assetFrom.asset),
                    amount: (amount? amount : state.assetFrom.amount)},
        assetTo: {asset: (assetTo ? assetTo : state.assetTo.asset)},
        step: (step ? step : state.step)
    }
    return newValue
}



function App() {
  const [swapValue, setSwapValue] = useReducer(swapValueReducer, swapValueInit);
  const swapRef = useRef();

  useEffect(()=>{
    if(swapValue.step === 'swap'){
        swapRef.current.focus()
    }
  },[swapValue])

  return (
    <div className='App'>
      <SwapContext.Provider value={{swapValue, setSwapValue}}>
        <div className='App-header'>
            <SwapSuggestionsContainer suggestions={suggestions}/>
            <div className='asset-selection-container-outer'>
                <div className='asset-selection-container-inner'>
                    <PairDropdown/>
                    <SwapContainer/>
                    <button ref={swapRef} tabindex="4" className='swap-button' type="button">SWAP</button>
                </div>
            </div>
            <SwapSuggestionsContainer suggestions={suggestions}/>
        </div>
      </SwapContext.Provider>
    </div>
  );
}

export default App;
