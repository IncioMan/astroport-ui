import React from 'react';
import './AssetToSwap.css'

export default function AssetToSwap(props) {
    const { asset, logo, owned, amount,onChange } = props;
    const className = owned ? 'asset-outer-input':'asset-outer'
    return (
            <div className={className}>
                <p>{asset}</p>
                <div className='asset-container'>
                    {(owned &&
                    <>
                        <input onChange={onChange} tabindex="3" className='amount-input' placeholder="0" type="number" />
                        <img className='asset-logo-from' src={logo} width="40" alt="Italian Trulli"></img>
                    </>)}    
                    {(!owned && 
                    <>
                        <img className='asset-logo-to' src={logo} width="40" alt="Italian Trulli"></img>
                        <div className='amount-calculated'>{amount}</div>
                    </>)}   
                    
                </div>
            </div>
    )
}