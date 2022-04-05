import SwapSuggestionsContainer from '../SwapSuggestionsContainer/SwapSuggestionsContainer';
import AssetToSwap from '../AssetToSwap/AssetToSwap';
import React, { useState } from 'react';
import './App.css';


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

const logos = {
  'UST':'https://assets.terra.money/icon/60/UST.png',
  'LUNA':'https://assets.terra.money/icon/60/Luna.png',
  'wAVAX':'https://app.astroport.fi/tokens/avax.png',
  'MINE':'https://assets.pylon.rocks/logo/MINE.png',
  'bLUNA':'https://whitelist.anchorprotocol.com/logo/bLUNA.png',
  'APOLLO':'https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png', 
  'ANC': 'https://whitelist.anchorprotocol.com/logo/ANC.png' 
}


function App() {
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [swapPair, setSwapPair] = useState([{asset:'UST',amount:amountToSwap},{asset:'LUNA'}]);
  return (
    <div className='App'>
      <div className='App-header'>
        <div className='asset-selection-container'>
            <input  tabindex="1" placeholder="Swap Pair" type="text" autoFocus/>
            <div className='swap-container-input'>
                <AssetToSwap asset={swapPair[0].asset} logo={logos[swapPair[0].asset]}
                            owned={true} onChange={(e)=>setAmountToSwap(e.target.value)}></AssetToSwap>
                <div className='arrow-container'>
                    <div className='arrow-button' onClick={()=>setSwapPair([swapPair[1],swapPair[0]])}>&rarr;</div>
                </div>
                <AssetToSwap asset={swapPair[1].asset} logo={logos[swapPair[1].asset]}
                            owned={false} amount={Math.round(amountToSwap*0.13*100)/100}></AssetToSwap>
            </div>
            <button tabindex="3" className='swap-button' type="button">SWAP</button>
        </div>
        <SwapSuggestionsContainer suggestions={suggestions} setSwapPair={setSwapPair}/>
      </div>
    </div>
  );
}

export default App;
