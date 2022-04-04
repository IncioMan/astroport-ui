import React from 'react';
import './AssetToSwap.css'

export default function AssetToSwap(props) {
    const { asset, logo, owned, amount } = props;
    const className = owned ? 'asset-outer-input':'asset-outer'
    return (
            <div className={className}>
                <p>{asset}</p>
                <div className='asset-container'>
                    {(owned && <input  tabindex="2" className='amount-input' placeholder="0" type="text" />)}    
                    {(!owned && <div className='amount-calculated'>{amount}</div>)}   
                    <img className='asset-logo' src={logo} width="35" alt="Italian Trulli"></img>
                </div>
            </div>
    )
}