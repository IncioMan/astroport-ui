import React, { Component } from 'react';
import PairDropdownItem from '../PairDropdownItem/PairDropdownItem'
import './PairDropdown.css'
import SwapContext from '../SwapContainer/SwapContext';
import pools from '../../data/astroport.dex.js'
import tokens from '../../data/tokens.js'
export default class PairDropdown extends Component {
    constructor(props) {
        super(props)
        this.availablePairs = Object.keys(pools.mainnet).map((pool)=>({
            pool: pool,
            from: tokens.mainnet[pools.mainnet[pool].assets[0]],
            to: tokens.mainnet[pools.mainnet[pool].assets[1]],
            focused:false}))
        this.availablePairs = this.availablePairs.concat(Object.keys(pools.mainnet).map((pool)=>({
            pool: pool,
            from: tokens.mainnet[pools.mainnet[pool].assets[1]],
            to: tokens.mainnet[pools.mainnet[pool].assets[0]],
            focused:false})))
        this.state = {
          isListOpen: false,
          suggestionsShown: this.availablePairs,
          inputText: null,
          focusedOption: -1
        }
        this.inputRef = React.createRef();
    }

    processInput = (text) => {
        const textCleaned = text.replace(' ','')
                                .replace('->','')
        this.setState(prevState => ({
          isListOpen: text.length>0,
          suggestionsShown : this.availablePairs.filter(pair => {
              var filteredStrings = {search: textCleaned.toUpperCase(), select: (pair.from.symbol + pair.to.symbol).toUpperCase()}
              for(let c of filteredStrings.search) 
                if(!filteredStrings.select.includes(c)){
                    return false;
                }
            return true
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
            <input  tabIndex="1" placeholder="Swap Pair" type="text" ref={this.inputRef}
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
                                    asset1={pair.from.symbol}
                                    logo1={pair.from.icon}
                                    asset2={pair.to.symbol}
                                    logo2={pair.to.icon}
                                    focused={pair.focused}
                                    onClick={() => {
                                        setSwapValue({
                                            assetFrom: pair.from.token,
                                            assetTo: pair.to.asset,
                                            step: 'amount'
                                        })
                                        this.closeWindow();
                                    }}
                                    onKeyUp = {(e) =>{
                                        if (e.key === 'Enter') {
                                            setSwapValue({
                                                assetFrom: pair.from.token,
                                                assetTo: pair.to.token,
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