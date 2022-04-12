import SwapSuggestionsContainer from '../SwapSuggestionsContainer/SwapSuggestionsContainer';
import SwapContainer from '../SwapContainer/SwapContainer';
import PairDropdown from '../PairDropdown/PairDropdown';
import SwapContext from '../SwapContainer/SwapContext';
import './App.css';
import React, { useEffect, useReducer, useRef } from 'react';

const mostPopularsSwaps = [
    'terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552',
    'terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w',
    'terra1qr2k6yjjd5p2kaewqvg93ag74k6gyjr7re37fs',
'terra170x0m3vmc7s5pdvpt5lh9n6wfmsz6wcykcr0vg']
const recentSwaps = [
    'terra143xxfw5xf62d5m32k3t4eu9s82ccw80lcprzl9',
    'terra1mxyp5z27xxgmv70xpqjk7jvfq54as9dfzug74m',
    'terra1m95udvvdame93kl6j2mk8d03kc982wqgr75jsr']
const suggestedSwaps= [
    'terra1v5ct2tuhfqd0tf8z0wwengh4fg77kaczgf6gtx',
    'terra134m8n2epp0n40qr08qsvvrzycn2zq4zcpmue48',
    'terra15s2wgdeqhuc4gfg7sfjyaep5cch38mwtzmwqrx']

const suggestions = [
    {title:'MOST POPULAR',
     data: mostPopularsSwaps},
    {title:'RECENT',
    data: recentSwaps},
    {title:'SUGGESTED',
    data: suggestedSwaps}
]

const swapValueInit = {
    assetFrom: {asset:'UST',amount:0},
    assetTo: {asset:'LUNA'},
    step : 'pair'
}


function swapValueReducer(state, value) {
    var assetFrom =  value.assetFrom
    var assetTo = value.assetTo
    var amount =  value.amount
    var step =  value.step
    return {
        assetFrom: {asset: (assetFrom ? assetFrom : state.assetFrom.asset),
                    amount: (amount? amount : state.assetFrom.amount)},
        assetTo: {asset: (assetTo ? assetTo : state.assetTo.asset)},
        step: (step ? step : state.step)
    }
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
            <div className='asset-selection-container'>
                <PairDropdown/>
                <SwapContainer/>
                <button ref={swapRef} tabindex="4" className='swap-button' type="button">SWAP</button>
            </div>
            <SwapSuggestionsContainer suggestions={suggestions}/>
        </div>
      </SwapContext.Provider>
    </div>
  );
}

export default App;
