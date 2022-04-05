import React from 'react';
import './AssetToSwap.css'

export default function AssetToSwap(props) {
    const { asset, logo, owned, amount,onChange } = props;
    const className = owned ? 'asset-outer-input':'asset-outer'
    return (
            <div className={className}>
                <p>{asset}</p>
                <div className='asset-container'>
                    {(owned && <input onChange={onChange} tabindex="2" className='amount-input' placeholder="0" type="number" />)}    
                    {(!owned && <div className='amount-calculated'>{amount}</div>)}   
                    <img className='asset-logo' src={logo} width="35" alt="Italian Trulli"></img>
                </div>
            </div>
    )
}