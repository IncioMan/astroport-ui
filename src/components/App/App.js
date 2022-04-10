import SwapSuggestionsContainer from '../SwapSuggestionsContainer/SwapSuggestionsContainer';
import SwapContainer from '../SwapContainer/SwapContainer';
import PairDropdown from '../PairDropdown/PairDropdown';
import SwapContext from '../SwapContainer/SwapContext';
import './App.css';
import React, { useEffect, useReducer, useRef } from 'react';

const mostPopularsSwaps = [
    [{
        asset: 'APOLLO',
        image: 'https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png' 
    },{
        asset: 'LUNA',
        image: 'https://assets.terra.money/icon/60/Luna.png' 
    }],
    [{
        asset: 'LUNA',
        image: 'https://assets.terra.money/icon/60/Luna.png'  
    },{
        asset: 'UST',
        image: 'https://assets.terra.money/icon/60/UST.png' 
    }],
    [{
        asset: 'ANC',
        image: 'https://whitelist.anchorprotocol.com/logo/ANC.png'  
    },{
        asset: 'UST',
        image: 'https://assets.terra.money/icon/60/UST.png' 
    }],
]

const recentSwaps = [
    [{
        asset: 'APOLLO',
        image: 'https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png' 
    },{
        asset: 'LUNA',
        image: 'https://assets.terra.money/icon/60/Luna.png' 
    }],
    [{
        asset: 'LUNA',
        image: 'https://assets.terra.money/icon/60/Luna.png'  
    },{
        asset: 'bLUNA',
        image: 'https://whitelist.anchorprotocol.com/logo/bLUNA.png' 
    }],
    [{
        asset: 'MINE',
        image: 'https://assets.pylon.rocks/logo/MINE.png'  
    },{
        asset: 'UST',
        image: 'https://assets.terra.money/icon/60/UST.png' 
    }],
]

const suggestedSwaps= [
    [{
        asset: 'wAVAX',
        image: 'https://app.astroport.fi/tokens/avax.png' 
    },{
        asset: 'LUNA',
        image: 'https://assets.terra.money/icon/60/Luna.png' 
    }],
    [{
        asset: 'LUNA',
        image: 'https://assets.terra.money/icon/60/Luna.png' 
    },{
        asset: 'wAVAX',
        image: 'https://app.astroport.fi/tokens/avax.png' 
    }],
    [{
        asset: 'UST',
        image: 'https://assets.terra.money/icon/60/UST.png' 
    },{
        asset: 'MINE',
        image: 'https://assets.pylon.rocks/logo/MINE.png'  
    }],
]

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
