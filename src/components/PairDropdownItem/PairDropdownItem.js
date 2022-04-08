import React from 'react';
import './PairDropdownItem.css'

export default function PairDropdownItem(props) {
    const { asset1, logo1, asset2, logo2, onClick, onKeyUp} = props;
    return (
        <div onClick={onClick} onKeyUp={onKeyUp} tabindex="0" className='dd-suggest-container'>
            <div className='dd-item-asset-container'>
                <p className='dd-suggest-asset'>{asset1}</p>
                <img className='dd-suggest-logo' src={logo1} width="30" alt="Italian Trulli"></img>
            </div>
            <div className='dd-suggest-arrow'>&rarr;</div>
            <div className='dd-item-asset-container-to'>
                <img className='dd-suggest-logo-to' src={logo2} width="30" alt="Italian Trulli"></img>
                <p className='dd-suggest-asset'>{asset2}</p>
            </div>
        </div>
    )
}