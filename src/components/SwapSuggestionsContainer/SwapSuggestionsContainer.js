import React from 'react';
import './SwapSuggestionsContainer.css'
import SwapSuggestionList from '../SwapSuggestionList/SwapSuggestionList'

export default function SwapSuggestionsContainer(props) {
    return (
        <div className='suggestions-container'>
        {
            props.suggestions.map((sugg) => (
                <SwapSuggestionList 
                title={sugg.title} 
                pairs={sugg.data} 
                setSwapPair={props.setSwapPair}/>
            ))
        }
        </div>
    )
}