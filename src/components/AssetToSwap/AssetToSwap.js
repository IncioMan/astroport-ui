import React, { useEffect , useRef, useContext} from 'react';
import './AssetToSwap.css'
import SwapContext from '../SwapContainer/SwapContext';

export default function AssetToSwap(props) {
    const { asset, logo, owned, amount,onChange } = props;
    const className = owned ? 'asset-outer-input':'asset-outer'
    const inputRef = useRef()
    const {swapValue, setSwapValue} = useContext(SwapContext);

    useEffect(()=>{
        console.log('now step amount')
        if(swapValue.step==='amount'){
            if(inputRef&&inputRef.current){
                inputRef.current.focus()
            }  
        }
    }, [swapValue])

    const enterHandler = () => {
        console.log('next swap')
        setSwapValue({
            step: 'swap'
        })
    }

    const amountHandler = () => {
        console.log('next swap') 
        setSwapValue({
            amount: 900
        })
        if(inputRef&&inputRef.current){
            inputRef.current.value = 900
        }
    }

    return (
            <div className={className}>
                <div className='current-balance'>
                {(owned && 
                    <>
                        <div onClick={()=>amountHandler()}>900</div> 
                    </>
                )}
                </div>
                <div className='asset-name'>{asset}</div>
                <div className='asset-container'>
                    {(owned &&
                    <>
                        <input  onChange={onChange}
                                tabIndex="3" 
                                ref={inputRef} className='amount-input' 
                                placeholder="0" type="number"
                                onKeyUp = {(e) =>{
                                    if (e.key === 'Enter') {
                                        enterHandler();
                                    }
                                }}/>
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