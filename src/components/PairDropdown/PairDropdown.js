import React, { Component } from 'react';
import PairDropdownItem from '../PairDropdownItem/PairDropdownItem'
import './PairDropdown.css'
import SwapContext from '../SwapContainer/SwapContext';
export default class PairDropdown extends Component {
    constructor(props) {
        super(props)
        this.availablePairs = [
            {pair: {
                from:{
                    asset: 'wAVAX',
                    image: 'https://app.astroport.fi/tokens/avax.png' 
                },
                to:{
                    asset: 'LUNA',
                    image: 'https://assets.terra.money/icon/60/Luna.png' 
                }
            }},
            {pair: {
                from:{
                    asset: 'LUNA',
                    image: 'https://assets.terra.money/icon/60/Luna.png' 
                },
                to:{
                    asset: 'wAVAX',
                    image: 'https://app.astroport.fi/tokens/avax.png' 
                }
            }},
            {pair: {
                from:{
                    asset: 'UST',
                    image: 'https://assets.terra.money/icon/60/UST.png'
                },
                to:{
                    asset: 'MINE',
                    image: 'https://assets.pylon.rocks/logo/MINE.png' 
                }
            }},
            {pair: {
                from:{
                asset: 'ANC',
                image: 'https://whitelist.anchorprotocol.com/logo/ANC.png' 
                },
                to:{
                    asset: 'UST',
                    image: 'https://assets.terra.money/icon/60/UST.png'
                }
            }}]
        this.state = {
          isListOpen: false,
          suggestionsShown: this.availablePairs,
          inputText: null
        }
    }

    processInput = (text) => {
        this.setState(prevState => ({
          isListOpen: text.length>0,
          suggestionsShown : this.availablePairs.filter(pair => (pair.pair.from.asset + pair.pair.to.asset).toUpperCase().includes(text.toUpperCase())),
          inputText: text
       }))
    }

    closeWindow = () => {
        this.setState(prevState => ({
          isListOpen: false,
          inputText: ''
       }))
    }
    
    render() {
        const { isListOpen, suggestionsShown, inputText} = this.state;
        
      
        return (
          <div className="dd-wrapper">
            <input  tabindex="1" placeholder="Swap Pair" type="text" value={inputText} onChange={(e)=>this.processInput(e.target.value)} autoFocus/>
            {isListOpen && (
                <SwapContext.Consumer>
                {({swapValue, setSwapValue}) => (
                    <div className='dropdown-list-container' role="list">
                        {isListOpen && suggestionsShown.map((pair) => (
                        <div className="dd-list-item">
                            <PairDropdownItem 
                                    asset1={pair.pair.from.asset}
                                    logo1={pair.pair.from.image}
                                    asset2={pair.pair.to.asset}
                                    logo2={pair.pair.to.image}
                                    onClick={() => {
                                        setSwapValue([pair.pair.from.asset,pair.pair.to.asset])
                                        this.closeWindow();
                                    }}
                                    onKeyUp = {(e) =>{
                                        if (e.key === 'Enter') {
                                            setSwapValue([pair.pair.from.asset,pair.pair.to.asset])
                                            this.closeWindow();
                                        }
                                    }}
                            ></PairDropdownItem>
                            </div>
                        ))}
                    </div>
                )}
                </SwapContext.Consumer>
            )}
          </div>
        )
      }
}