import React from 'react';
import SwapSuggestion from '../SwapSuggestion/SwapSuggestion'
import './SwapSuggestionList.css'

export default function SwapSuggestionList(props) {
    const {title, pairs, setSwapPair} = props
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
                    onClick={() => setSwapPair([{asset: pair[0].asset,
                        amount:0},{asset:pair[1].asset}])}
                    onKeyUp = {(e) =>{
                        if (e.key === 'Enter') {
                            setSwapPair([{asset:pair[0].asset,
                                amount:0},{asset:pair[1].asset}])
                        }
                    }}
                    ></SwapSuggestion>
                ))
            }
        </div>
    )
}