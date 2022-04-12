import React, { useContext, useEffect, useState } from 'react';
import SwapSuggestion from '../SwapSuggestion/SwapSuggestion'
import { TailSpin } from  'react-loader-spinner'
import './SwapSuggestionList.css'
import SwapContext from '../SwapContainer/SwapContext';
import pools from '../../data/astroport.dex.js'
import tokens from '../../data/tokens.js'
const axios = require('axios').default;

export default function SwapSuggestionList(props) {
    const {title, url} = props
    const {setSwapValue} = useContext(SwapContext);
    const [loaded, setLoaded] = useState(false);
    const [pairs, setPairs] = useState([]);

    useEffect(()=>{
        axios.get(url)
        .then(function (response) {
            // handle success
            setPairs(response.data.map((p)=>p["POOL_ADDRESS"]).filter(p=>Object.keys(pools.mainnet).includes(p)).slice(0,5))
            setLoaded(true)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    })

    return (
        <div className='suggestion-category-name-outer'>
            <p className='suggestion-category-name'>{title}</p>
            {(!loaded) && <div className='suggestion-loading-container'>
                <TailSpin className="loading" height="40" width="40" color='#ffffff'ariaLabel='loading'/>
            </div>
            }
            {
                loaded && pairs.map((pair) => {
                const pool = pools.mainnet[pair]
                const assetFrom = tokens.mainnet[pool.assets[0]]
                const assetTo = tokens.mainnet[pool.assets[1]]
                return <SwapSuggestion 
                    key={pair}
                    asset1={assetFrom.symbol}
                    logo1={assetFrom.icon}
                    asset2={assetTo.symbol}
                    logo2={assetTo.icon}
                    onClick={() => {
                        setSwapValue({
                            pool: pair,
                            assetFrom: assetFrom.token,
                            assetTo: assetTo.token,
                            step: 'amount'
                        })
                    }}
                    onKeyUp = {(e) =>{
                        if (e.key === 'Enter') {
                            setSwapValue({
                                pool: pair,
                                assetFrom: assetFrom.token,
                                assetTo: assetTo.token,
                                step: 'amount'
                            })
                        }
                    }}
                    ></SwapSuggestion>
                })
            }
        </div>
    )
}