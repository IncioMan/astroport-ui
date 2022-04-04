import SwapSuggestionsContainer from '../SwapSuggestionsContainer/SwapSuggestionsContainer';
import AssetToSwap from '../AssetToSwap/AssetToSwap';
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

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <div className='asset-selection-container'>
            <input  tabindex="1" placeholder="Swap Pair" type="text" />
            <div className='swap-container-input'>
                <AssetToSwap asset="UST" logo="https://assets.terra.money/icon/60/UST.png"
                            owned={true}></AssetToSwap>
                <div className='arrow-container'>
                    <div className='arrow-button'>&rarr;</div>
                </div>
                <AssetToSwap asset="LUNA" logo="https://assets.terra.money/icon/60/Luna.png"
                            owned={false} amount={1.20}></AssetToSwap>
            </div>
            <button tabindex="3" className='swap-button' type="button">SWAP</button>
        </div>
        <SwapSuggestionsContainer suggestions={suggestions}/>
      </div>
    </div>
  );
}

export default App;
