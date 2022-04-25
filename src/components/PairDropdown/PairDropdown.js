import React, { useRef, useState  } from 'react';
import PairDropdownItem from '../PairDropdownItem/PairDropdownItem'
import './PairDropdown.css'
import SwapContext from '../SwapContainer/SwapContext';
import pools from '../../data/astroport.dex.js'
import tokens from '../../data/tokens.js'
import {useConnectedWallet, useLCDClient, useWallet, WalletStatus } from '@terra-money/wallet-provider';

export default function PairDropdown() {
    const {
        network
      } = useWallet();

    const tmpPairs = Object.keys(pools[network.name])?.map((pool)=>({
        pool: pool,
        from: tokens[network.name][pools[network.name][pool].assets[0]],
        to: tokens[network.name][pools[network.name][pool].assets[1]],
        focused:false}))
    const availablePairs = tmpPairs.concat(Object.keys(pools[network.name]).map((pool)=>({
        pool: pool,
        from: tokens[network.name][pools[network.name][pool].assets[1]],
        to: tokens[network.name][pools[network.name][pool].assets[0]],
        focused:false})))
    const [isListOpen, setListOpen] = useState(false)
    const [suggestionsShown, setSuggestionsShown] = useState(availablePairs)
    const [inputText, setInputText] = useState(null)
    const [focusedOption, setFocusedOption] = useState(-1)
    let inputRef = useRef();

    const processInput = (text) => {
        const textCleaned = text.replace(' ','')
                                .replace('->','')
        setListOpen(text.length>0)
        setInputText(text)
        setSuggestionsShown(availablePairs.filter(
            pair => {
                var filteredStrings = {search: textCleaned.toUpperCase(), select: (pair.from.symbol + pair.to.symbol).toUpperCase()}
                for(let c of filteredStrings.search) 
                if(!filteredStrings.select.includes(c)){
                    return false;
                }
            return true
            }))
    }

    const arrowHandler = (index, change) => {
            var newSuggestionsShown = [...suggestionsShown]
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
                inputRef.current.focus()
            }
            setFocusedOption(newFocusedOption)
            setSuggestionsShown(newSuggestionsShown)
    }

    const resetFocusOptions = () => {
            var newSuggestionsShown = [...suggestionsShown]
            newSuggestionsShown.forEach((s)=> s.focused = false);
            setFocusedOption(-1)
            setSuggestionsShown(newSuggestionsShown)
    }

    const closeWindow = () => {
          var newSuggestionsShown = [...suggestionsShown]
          newSuggestionsShown.forEach((s)=> s.focused = false);
          setListOpen(false)
          setInputText('')
          setFocusedOption(-1)
          setSuggestionsShown(newSuggestionsShown)
    }
    
    const escapeWindow = () => {
        closeWindow()
        inputRef.current.focus()
    }

    return (
        <div className="dd-wrapper">
        <input  tabIndex="1" placeholder="Swap Pair" type="text" ref={inputRef}
                value={inputText} 
                onChange={(e)=>{
                    processInput(e.target.value)
                    if(e.target.value===''){closeWindow()}
                }}
                onFocus={()=>resetFocusOptions()}
                autoFocus
                onKeyDown = {(e) =>{
                    if (e.key === 'ArrowDown') {
                        arrowHandler(-1,1)
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
                                        pool: pair.pool,
                                        step: 'amount'
                                    })
                                    closeWindow();
                                }}
                                onKeyUp = {(e) =>{
                                    if (e.key === 'Enter') {
                                        setSwapValue({
                                            assetFrom: pair.from.token,
                                            assetTo: pair.to.token,
                                            pool: pair.pool,
                                            step: 'amount'
                                        })
                                        closeWindow();
                                    }
                                    if (e.key === 'Escape') {
                                        escapeWindow();
                                    }
                                }}
                                onKeyDown = {(e)=>{
                                    if (e.key === 'ArrowDown') {
                                        arrowHandler(index, 1)
                                    }
                                    if (e.key === 'ArrowUp') {
                                        arrowHandler(index, -1)
                                    }
                                }}
                        ></PairDropdownItem>
                        </div>
                    ))}
                </div>
            )}
            </SwapContext.Consumer>
        )}
        </div>)
}