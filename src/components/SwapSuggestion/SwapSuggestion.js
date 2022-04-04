import React from 'react';
import './SwapSuggestion.css'

export default function SwapSuggestion(props) {
    const { asset1, logo1, asset2, logo2, onClick, onKeyUp} = props;
    return (
        <div onClick={onClick} onKeyUp={onKeyUp} tabindex="0" className='suggest-container'>
            <p className='suggest-asset'>{asset1}</p>
            <img className='suggest-logo' src={logo1} width="30" alt="Italian Trulli"></img>
            <div className='suggest-arrow'>&rarr;</div>
            <p className='suggest-asset'>{asset2}</p>
            <img className='suggest-logo' src={logo2} width="30" alt="Italian Trulli"></img>
        </div>
    )
}