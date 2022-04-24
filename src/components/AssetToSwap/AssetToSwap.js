import React, { useEffect , useRef, useState, useContext} from 'react';
import './AssetToSwap.css'
import SwapContext from '../SwapContainer/SwapContext';
import BalancePriceContext from '../BalancePriceContext/BalancePriceContext';

export default function AssetToSwap(props) {
    const { token, asset, logo, owned, amount, onChange} = props;
    const className = owned ? 'asset-outer-input':'asset-outer'
    const inputRef = useRef()
    const {swapValue, setSwapValue} = useContext(SwapContext);
    const [amountInputted, setAmountInputted] = useState(0);
    const {balancePrice} = useContext(BalancePriceContext);
    const [amountOwned, setAmountOwned] = useState(null);
    const [loaded, setLoaded] = useState(true);

    useEffect(()=>{
        if(token in balancePrice){
            if(balancePrice[token].balance=='loading'){
                setLoaded(false)
            }else{
                setLoaded(true)
            }
            setAmountOwned(balancePrice[token].balance)
        }

    }, [balancePrice])

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
            amount: amountOwned
        })
        if(inputRef&&inputRef.current){
            inputRef.current.value = Math.round(amountOwned*100-1)/100
        }
    }

    const onChangeHandler = (e) => {
       onChange(e);
       setAmountInputted(e.target.value)
    }

    return (
            <div className={className}>
                <div className='current-balance'>
                {(owned && 
                    <>
                        <div onClick={()=>amountHandler()}>{Math.round(amountOwned*100)/100}</div> 
                    </>
                )}
                </div>
                <div className='asset-name'>{asset}</div>
                <div className='asset-container'>
                    {(owned &&
                    <>
                        <input  step="0.01"
                                lang="en"
                                onChange={onChangeHandler}
                                tabIndex="3" 
                                ref={inputRef} 
                                className={amountInputted<=amountOwned?'amount-input':'amount-input amount-input-too-high'} 
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