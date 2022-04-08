import React, { useContext } from 'react';
import SwapSuggestion from '../SwapSuggestion/SwapSuggestion'
import './SwapSuggestionList.css'
import SwapContext from '../SwapContainer/SwapContext';

export default function SwapSuggestionList(props) {
    const {title, pairs} = props
    const {setSwapValue} = useContext(SwapContext);
    return (
        <div>
            <p className='suggestion-category-name'>{title}</p>
            {
                pairs.map((pair) => (
                <SwapSuggestion 
                    key={title+pair[0].asset+pair[1].asset}
                    asset1={pair[0].asset}
                    logo1={pair[0].image}
                    asset2={pair[1].asset}
                    logo2={pair[1].image}
                    onClick={() => setSwapValue([pair[0].asset,pair[1].asset])}
                    onKeyUp = {(e) =>{
                        if (e.key === 'Enter') {
                            setSwapValue([pair[0].asset,pair[1].asset])
                        }
                    }}
                    ></SwapSuggestion>
                ))
            }
        </div>
    )
}