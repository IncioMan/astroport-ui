import React from 'react';
import './SwapSuggestion.css'

export default function SwapSuggestion(props) {
    const { asset1, logo1, asset2, logo2, onClick, onKeyUp} = props;
    return (
        <div onClick={onClick} onKeyUp={onKeyUp} tabIndex="6" className='suggest-container'>
            <div className='suggest-asset-container-from'>
                <p className='suggest-asset'>{asset1}</p>
                <img className='suggest-logo-from' src={logo1} width="30"></img>
            </div> 
            <div className='suggest-arrow'>&rarr;</div>
            <div className='suggest-asset-container-to'>
                <img className='suggest-logo-to' src={logo2} width="30"></img>
                <p className='suggest-asset'>{asset2}</p>
            </div> 
        </div>
    )
}