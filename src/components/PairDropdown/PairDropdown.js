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
            }, focused: false},
            {pair: {
                from:{
                    asset: 'LUNA',
                    image: 'https://assets.terra.money/icon/60/Luna.png' 
                },
                to:{
                    asset: 'wAVAX',
                    image: 'https://app.astroport.fi/tokens/avax.png' 
                }
            }, focused: false},
            {pair: {
                from:{
                    asset: 'UST',
                    image: 'https://assets.terra.money/icon/60/UST.png'
                },
                to:{
                    asset: 'MINE',
                    image: 'https://assets.pylon.rocks/logo/MINE.png' 
                }
            }, focused: false},
            {pair: {
                from:{
                asset: 'ANC',
                image: 'https://whitelist.anchorprotocol.com/logo/ANC.png' 
                },
                to:{
                    asset: 'UST',
                    image: 'https://assets.terra.money/icon/60/UST.png'
                }
            }, focused: false}]
        this.state = {
          isListOpen: false,
          suggestionsShown: this.availablePairs,
          inputText: null,
          focusedOption: -1
        }
        this.inputRef = React.createRef();
    }

    processInput = (text) => {
        this.setState(prevState => ({
          isListOpen: text.length>0,
          suggestionsShown : this.availablePairs.filter(pair => {
              var filteredStrings = {search: text.toUpperCase(), select: (pair.pair.from.asset + pair.pair.to.asset).toUpperCase()}
              var intersection = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
              return intersection.length >= text.length
          }),
          inputText: text
       }))
    }

    arrowHandler = (index, change) => {
        this.setState(prevState => {
            var newSuggestionsShown = [...prevState.suggestionsShown]
            var newFocusedOption = index
            if(index+change < newSuggestionsShown.length){
                newFocusedOption = index + change
            }
            if(newFocusedOption>=0){
                newSuggestionsShown[newFocusedOption].focused = true;
            }
            if(index>=0){
                newSuggestionsShown[index].focused = false;
            }
            if(newFocusedOption<0){
                newSuggestionsShown.forEach((s)=> s.focused = false);
                this.inputRef.current.focus()
            }
            return {
                focusedOption: newFocusedOption,
                suggestionsShown: newSuggestionsShown
            }
        })
    }

    resetFocusOptions = () => {
        this.setState(prevState => {
            var newSuggestionsShown = [...prevState.suggestionsShown]
            newSuggestionsShown.forEach((s)=> s.focused = false);
            return {
                focusedOption: -1,
                suggestionsShown: newSuggestionsShown
            }
        })
    }

    closeWindow = () => {
        this.setState(prevState => {
          var newSuggestionsShown = [...prevState.suggestionsShown]
          newSuggestionsShown.forEach((s)=> s.focused = false);
        return {
          isListOpen: false,
          inputText: '',
          focusedOption: -1,
          suggestionsShown: newSuggestionsShown
       }})
    }
    
    escapeWindow = () => {
        this.closeWindow()
        this.inputRef.current.focus()
    }

    render() {
        const { isListOpen, suggestionsShown, inputText} = this.state;
        return (
          <div className="dd-wrapper">
            <input  tabindex="1" placeholder="Swap Pair" type="text" ref={this.inputRef}
                    value={inputText} 
                    onChange={(e)=>{
                        this.processInput(e.target.value)
                        if(e.target.value===''){this.closeWindow()}
                    }}
                    onFocus={()=>this.resetFocusOptions()}
                    autoFocus
                    onKeyDown = {(e) =>{
                        if (e.key === 'ArrowDown') {
                            this.arrowHandler(-1,1)
                    }}}/>
            {isListOpen && (
                <SwapContext.Consumer>
                {({swapValue, setSwapValue}) => (
                    <div className='dropdown-list-container' role="list"
                    >
                        {isListOpen && suggestionsShown.map((pair, index) => (
                        <div className="dd-list-item">
                            <PairDropdownItem 
                                    asset1={pair.pair.from.asset}
                                    logo1={pair.pair.from.image}
                                    asset2={pair.pair.to.asset}
                                    logo2={pair.pair.to.image}
                                    focused={pair.focused}
                                    onClick={() => {
                                        setSwapValue({
                                            assetFrom: pair.pair.from.asset,
                                            assetTo: pair.pair.to.asset,
                                            step: 'amount'
                                        })
                                        this.closeWindow();
                                    }}
                                    onKeyUp = {(e) =>{
                                        if (e.key === 'Enter') {
                                            setSwapValue({
                                                assetFrom: pair.pair.from.asset,
                                                assetTo: pair.pair.to.asset,
                                                step: 'amount'
                                            })
                                            this.closeWindow();
                                        }
                                        if (e.key === 'Escape') {
                                            this.escapeWindow();
                                        }
                                    }}
                                    onKeyDown = {(e)=>{
                                        if (e.key === 'ArrowDown') {
                                            this.arrowHandler(index, 1)
                                        }
                                        if (e.key === 'ArrowUp') {
                                            this.arrowHandler(index, -1)
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