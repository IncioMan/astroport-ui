import React, { useContext, useEffect, useState } from 'react';
import SwapSuggestion from '../SwapSuggestion/SwapSuggestion'
import { TailSpin } from  'react-loader-spinner'
import './SwapSuggestionList.css'
import SwapContext from '../SwapContainer/SwapContext';

export default function SwapSuggestionList(props) {
    const {title, pairs} = props
    const {setSwapValue} = useContext(SwapContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        setTimeout(()=>setLoaded(true), 5000)
    })

    return (
        <div>
            <p className='suggestion-category-name'>{title}</p>
            {(!loaded) && <div className='suggestion-loading-container'>
                <TailSpin className="loading" height="40" width="40" color='#ffffff'ariaLabel='loading'/>
            </div>
            }
            {
                loaded && pairs.map((pair) => (
                <SwapSuggestion 
                    key={title+pair[0].asset+pair[1].asset}
                    asset1={pair[0].asset}
                    logo1={pair[0].image}
                    asset2={pair[1].asset}
                    logo2={pair[1].image}
                    onClick={() => {
                        setSwapValue({
                            assetFrom: pair[0].asset,
                            assetTo: pair[1].asset,
                            step: 'amount'
                        })
                    }}
                    onKeyUp = {(e) =>{
                        if (e.key === 'Enter') {
                            setSwapValue({
                                assetFrom: pair[0].asset,
                                assetTo: pair[1].asset,
                                step: 'amount'
                            })
                        }
                    }}
                    ></SwapSuggestion>
                ))
            }
        </div>
    )
}